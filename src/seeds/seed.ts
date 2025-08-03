import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { AppModule } from '../app.module';
import { Doctor } from '../doctor/doctor.entity';
import { DoctorSpecialization } from '../doctor/enums/doctor-specialization.enum';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);

  const doctorRepo = dataSource.getRepository(Doctor);

  const doctors = [
    { name: 'Dr. Rohit S.', specialization: DoctorSpecialization.CARDIOLOGIST },
    { name: 'Dr. Asha P.', specialization: DoctorSpecialization.DERMATOLOGIST },
    { name: 'Dr. Anil K.', specialization: DoctorSpecialization.ORTHOPEDIC },
    { name: 'Dr. Neha B.', specialization: DoctorSpecialization.GENERAL },
    { name: 'Dr. Rajesh M.', specialization: DoctorSpecialization.NEUROLOGIST },
    { name: 'Dr. Priya T.', specialization: DoctorSpecialization.PEDIATRICIAN },
    { name: 'Dr. Sameer R.', specialization: DoctorSpecialization.PSYCHIATRIST },
    { name: 'Dr. Leena W.', specialization: DoctorSpecialization.ENT },
    { name: 'Dr. Meera N.', specialization: DoctorSpecialization.GYNECOLOGIST },
  ];


  await doctorRepo.save(doctors);
  console.log('Seeded doctors');
  await app.close();
}

bootstrap();
