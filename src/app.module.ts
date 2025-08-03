import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorModule } from './doctor/doctor.module';
import { AppointmentModule } from './appointment/appointment.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('POSTGRES_URL'),
        synchronize: true,
        useUnifiedTopology: true,
        autoLoadEntities: true,
        migrations: ['src/migration'],
      }),
      inject: [ConfigService],
    }),
    DoctorModule,
    AppointmentModule,
    AuthModule,
  ],
})
export class AppModule { }
