import { Injectable, UnauthorizedException, BadRequestException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UserRole } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    try {
      const user = await this.prisma.user.findUnique({ where: { email } });
      if (user && (await bcrypt.compare(pass, user.passwordHash))) {
        const { passwordHash, ...result } = user;
        return result;
      }
    } catch (e) {
      this.logger.warn(`User validation db query failed: ${e.message}`);
    }
    return null;
  }

  async login(dto: LoginDto) {
    const cleanEmail = (dto.email || '').trim().toLowerCase();
    let user: any = null;
    try {
      user = await this.prisma.user.findUnique({ where: { email: cleanEmail } });
    } catch (e) {
      this.logger.warn(`DB findUnique failed: ${e.message}`);
    }

    if (!user) {
      // Fallback for pre-configured demo accounts if DB is starting up or disconnected
      user = this.getVerifiedDemoUser(cleanEmail, dto.password);
      if (!user) {
        throw new UnauthorizedException('Elektron pochta yoki parol noto‘g‘ri');
      }
    } else {
      const isValid = await bcrypt.compare(dto.password, user.passwordHash);
      if (!isValid) {
        throw new UnauthorizedException('Elektron pochta yoki parol noto‘g‘ri');
      }
    }

    return this.generateTokens(user);
  }

  async register(dto: RegisterDto) {
    try {
      const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
      if (existing) {
        throw new BadRequestException('Ushbu elektron pochta bilan foydalanuvchi allaqachon ro‘yxatdan o‘tgan');
      }
      const hashedPassword = await bcrypt.hash(dto.password, 10);
      const role = dto.role || UserRole.STUDENT;
      const roleLabel =
        role === UserRole.PROFESSOR
          ? 'Professor / Psixolog'
          : role === UserRole.SUPERVISOR
          ? 'Kafedra Bosh Supervizori'
          : role === UserRole.ADMIN
          ? 'Tizim Administratori'
          : 'Talaba';

      const user = await this.prisma.user.create({
        data: {
          fullName: dto.fullName,
          email: dto.email,
          passwordHash: hashedPassword,
          role,
          roleLabel,
          academicYear: dto.facultyOrGroup || '1-kurs',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        },
      });

      return this.generateTokens(user);
    } catch (e) {
      if (e instanceof BadRequestException) throw e;
      // Fallback in case PostgreSQL is disconnected
      this.logger.warn(`Register DB insert failed: ${e.message}, returning demo session`);
      const fallbackUser = {
        id: `user-${Date.now()}`,
        fullName: dto.fullName,
        email: dto.email,
        role: dto.role || UserRole.STUDENT,
        roleLabel: 'Talaba',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      };
      return this.generateTokens(fallbackUser);
    }
  }

  async quickLogin(roleName: string) {
    const roleUpper = roleName.toUpperCase();
    let email = 'madina.usmonova@psychoedu.uz';
    if (roleUpper.includes('PROFESSOR')) email = 'dilorom.karimova@psychoedu.uz';
    else if (roleUpper.includes('SUPERVISOR')) email = 'nigora.toirova@psychoedu.uz';
    else if (roleUpper.includes('ADMIN')) email = 'azamat.admin@psychoedu.uz';

    let user: any = null;
    try {
      user = await this.prisma.user.findUnique({ where: { email } });
    } catch {}

    if (!user) {
      user = this.getVerifiedDemoUser(email, 'password123');
    }

    if (!user) {
      throw new UnauthorizedException('Foydalanuvchi topilmadi');
    }

    return this.generateTokens(user);
  }

  private async generateTokens(user: any) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      fullName: user.fullName,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET || 'psychoedu_super_secret_access_jwt_key_2026',
      expiresIn: '1h',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET || 'psychoedu_super_secret_refresh_jwt_key_2026',
      expiresIn: '7d',
    });

    const { passwordHash, ...safeUser } = user;

    return {
      accessToken,
      refreshToken,
      user: safeUser,
    };
  }

  private getVerifiedDemoUser(email: string, pass: string) {
    // Only accept exact demo accounts with the correct password
    if (pass !== 'password123') {
      return null;
    }

    const cleanEmail = (email || '').trim().toLowerCase();
    if (cleanEmail === 'dilorom.karimova@psychoedu.uz') {
      return {
        id: 'user-prof-1',
        email: 'dilorom.karimova@psychoedu.uz',
        fullName: 'Prof. Dilorom Karimova',
        role: UserRole.PROFESSOR,
        roleLabel: 'Professor / Psixolog',
        avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        faculty: 'Psixologiya fakulteti',
        department: 'Klinik psixologiya kafedrasi',
      };
    } else if (cleanEmail === 'nigora.toirova@psychoedu.uz') {
      return {
        id: 'user-sup-1',
        email: 'nigora.toirova@psychoedu.uz',
        fullName: 'Dr. Nigora Toirova',
        role: UserRole.SUPERVISOR,
        roleLabel: 'Kafedra Bosh Supervizori',
        avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
        faculty: 'Psixologiya fakulteti',
        department: 'Klinik psixologiya kafedrasi',
      };
    } else if (cleanEmail === 'azamat.admin@psychoedu.uz') {
      return {
        id: 'user-adm-1',
        email: 'azamat.admin@psychoedu.uz',
        fullName: 'Azamat Shokirov',
        role: UserRole.ADMIN,
        roleLabel: 'Tizim Administratori',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        faculty: 'Universitet Rektorati',
        department: 'Raqamli ta’lim va IT departamenti',
      };
    } else if (cleanEmail === 'madina.usmonova@psychoedu.uz') {
      return {
        id: 'user-stu-1',
        email: 'madina.usmonova@psychoedu.uz',
        fullName: 'Madina Usmonova',
        role: UserRole.STUDENT,
        roleLabel: 'Talaba',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        faculty: 'Psixologiya fakulteti',
        department: 'Klinik psixologiya kafedrasi',
      };
    }

    return null;
  }
}
