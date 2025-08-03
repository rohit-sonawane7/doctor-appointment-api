import { Controller, Get, Param, Query } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { GetAvailableSlotsQueryDto, GetDoctorParamDto, GetDoctorSlotsRequestDto, GetDoctorsQueryDto } from './dto/get-doctors-query.dto';

@Controller('doctors')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) { }

  @Get()
  getAll(@Query() query: GetDoctorsQueryDto) {
    return this.doctorService.findAll(query);
  }

  @Get(':id/available-slots')
  getAvailableSlots(
    @Param() params: GetDoctorParamDto,
    @Query() query: GetAvailableSlotsQueryDto,
  ) {
    const input: GetDoctorSlotsRequestDto = {
      doctorId: params.id,
      date: query.date,
    };
    return this.doctorService.getAvailableSlots(input);
  }
}
