import { IsDateString, IsISO8601, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsEndTimeAfterStartTime } from '../validators/is-valid-appointment-time';

export class CreateAppointmentDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  doctorId: number;

  @ApiProperty({ example: 'John Doe' })
  @IsNotEmpty()
  patientName: string;

  @IsDateString()
  @ApiProperty({
    example: '2025-08-03T09:00:00Z',
    description: 'Start time of appointment in UTC',
  })
  startTime: string;

  @IsDateString()
  @IsEndTimeAfterStartTime({ message: 'endTime must not be same as startTime' })
  @ApiProperty({
    example: '2025-08-03T09:30:00Z',
    description: 'End time of appointment in UTC',
  })
  endTime: string;
}


// import { IsDateString, IsISO8601, IsNotEmpty, IsNumber } from 'class-validator';
// import { ApiProperty } from '@nestjs/swagger';
// import { IsEndTimeAfterStartTime } from '../validators/is-valid-appointment-time';

// export class CreateAppointmentDto {
//   @ApiProperty({ example: 1 })
//   @IsNumber()
//   doctorId: number;

//   @ApiProperty({ example: 'John Doe' })
//   @IsNotEmpty()
//   patientName: string;

//   @IsDateString()
//   @ApiProperty({ example: '2025-08-03T05:00:00.000Z', description: 'Start time of appointment in UTC' })
//   startTime: string;

//   @IsDateString()
//   @IsEndTimeAfterStartTime({ message: 'endTime must not be same as startTime' })
//   @ApiProperty({ example: '2025-08-03T05:30:00.000Z' })
//   endTime: string;
// }
