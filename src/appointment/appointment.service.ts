import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Appointment } from './appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { Doctor } from '../doctor/doctor.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepo: Repository<Appointment>,
    @InjectRepository(Doctor)
    private doctorRepo: Repository<Doctor>,
  ) { }

  private isInDoctorWorkingHoursUTC(start: Date, end: Date): boolean {
    const toDecimal = (date: Date) =>
      date.getUTCHours() + date.getUTCMinutes() / 60;

    const startHour = toDecimal(start);
    const endHour = toDecimal(end);

    // 3.5 = 9:00 IST, 11.5 = 17:00 IST
    return startHour >= 3.5 && endHour <= 11.5;
  }


  async create(dto: CreateAppointmentDto): Promise<Appointment> {
    const doctor = await this.doctorRepo.findOne({ where: { id: dto.doctorId } });
    if (!doctor) throw new NotFoundException('Doctor not found');

    const start = new Date(dto.startTime);
    const end = new Date(dto.endTime);

    // Validate UTC working hours (maps to 9 AM – 5 PM IST)
    if (!this.isInDoctorWorkingHoursUTC(start, end)) {
      throw new BadRequestException(
        'Appointment must be between 9 AM and 5 PM IST',
      );
    }

    // Check for overlapping appointments
    const overlap = await this. appointmentRepo.findOne({
      where: {
        doctor: { id: dto.doctorId },
        startTime: Between(start, end),
      },
    });

    if (overlap) {
      throw new BadRequestException(
        'Doctor already has an appointment in this time slot',
      );
    }

    const appointment = this.appointmentRepo.create({
      doctor,
      patientName: dto.patientName,
      startTime: start,
      endTime: end,
    });

    return this.appointmentRepo.save(appointment);
  }

  async findAll(): Promise<Appointment[]> {
    return this.appointmentRepo.find();
  }
}
