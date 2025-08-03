import { Body, Controller, Get, Post } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) { }

  @Get()
  getAll() {
    return this.appointmentService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/create')
  book(@Body() dto: CreateAppointmentDto) {
    return this.appointmentService.create(dto);
  }
}
