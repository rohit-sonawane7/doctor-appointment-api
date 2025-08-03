import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from './doctor.entity';
import { Between, FindOptionsWhere, ILike, Repository } from 'typeorm';
import { Appointment } from '../appointment/appointment.entity';
import { GetDoctorSlotsRequestDto, GetDoctorsQueryDto } from './dto/get-doctors-query.dto';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private doctorRepo: Repository<Doctor>,

    @InjectRepository(Appointment)
    private appointmentRepo: Repository<Appointment>,
  ) { }

  async findAll(query: GetDoctorsQueryDto) {
    const { specialization, name, sort, page, limit } = query;

    const where: FindOptionsWhere<Doctor> = {};

    if (specialization) {
      where.specialization = specialization;
    }

    if (name) {
      where.name = ILike(`%${name}%`);
    }

    const [data, total] = await this.doctorRepo.findAndCount({
      where,
      order: {
        name: sort.toUpperCase() as 'ASC' | 'DESC',
      },
      skip: (parseInt(page) - 1) * parseInt(limit),
      take: parseInt(limit),
    });

    return {
      data,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
    };
  }


  async getAvailableSlots(input: GetDoctorSlotsRequestDto) {
    const { doctorId, date } = input;

    const doctor = await this.doctorRepo.findOne({ where: { id: doctorId } });
    if (!doctor) throw new NotFoundException('Doctor not found');

    const slotDuration = 30; // in minutes
    const workStartUTC = 3.5; // 9:00 AM IST
    const workEndUTC = 11.5;  // 5:00 PM IST

    const baseDate = new Date(`${date}T00:00:00Z`);
    const slots: Date[] = [];

    for (let h = workStartUTC; h < workEndUTC; h += slotDuration / 60) {
      const hours = Math.floor(h);
      const minutes = (h - hours) * 60;

      const slot = new Date(baseDate);
      slot.setUTCHours(hours, minutes, 0, 0);
      slots.push(slot);
    }

    const startDateUTC = slots[0];
    const endDateUTC = new Date(slots[slots.length - 1].getTime() + slotDuration * 60 * 1000);

    const appointments = await this.appointmentRepo.find({
      where: {
        doctor: { id: doctorId },
        startTime: Between(startDateUTC, endDateUTC),
      },
    });

    const booked = appointments.map((a) => a.startTime.toISOString());

    // return slots
    //   .filter((s) => !booked.includes(s.toISOString()))
    //   .map((start) => ({
    //     startTime: start.toISOString(),
    //     endTime: new Date(start.getTime() + slotDuration * 60 * 1000).toISOString(),
    //   }));
    const filtered = slots.filter((s) => {
      console.log(s.toISOString());
      return !booked.includes(s.toISOString())
    })

    const data = filtered.map((start) => ({
      startTime: start.toISOString(),
      endTime: new Date(start.getTime() + slotDuration * 60 * 1000).toISOString(),
    }));

    return data;
  }

}
