import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Appointment } from '../appointment/appointment.entity';
import { DoctorSpecialization } from './enums/doctor-specialization.enum';

@Entity()
export class Doctor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        type: 'enum',
        enum: DoctorSpecialization,
    })
    specialization: DoctorSpecialization;
    
    @OneToMany(() => Appointment, appointment => appointment.doctor)
    appointments: Appointment[];
}
