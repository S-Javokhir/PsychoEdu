import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CamerasModule } from './cameras/cameras.module';
import { SessionsModule } from './sessions/sessions.module';
import { VideosModule } from './videos/videos.module';
import { MaterialsModule } from './materials/materials.module';
import { CasesModule } from './cases/cases.module';
import { ReviewsModule } from './reviews/reviews.module';
import { AdminModule } from './admin/admin.module';
import { StorageModule } from './storage/storage.module';
import { RealtimeModule } from './realtime/realtime.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    CamerasModule,
    SessionsModule,
    VideosModule,
    MaterialsModule,
    CasesModule,
    ReviewsModule,
    AdminModule,
    StorageModule,
    RealtimeModule,
  ],
})
export class AppModule {}
