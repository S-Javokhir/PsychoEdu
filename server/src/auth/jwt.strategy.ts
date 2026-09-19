import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ACCESS_SECRET || 'psychoedu_super_secret_access_jwt_key_2026',
    });
  }

  async validate(payload: { sub: string; email: string; role: string }) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
      });
      if (!user) {
        throw new UnauthorizedException('Foydalanuvchi topilmadi');
      }
      return user;
    } catch {
      // Fallback for resilient mode if db connection is pending
      return {
        id: payload.sub,
        email: payload.email,
        role: payload.role,
        fullName: 'Foydalanuvchi',
      };
    }
  }
}
