import { Type, Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsIn, IsNumberString, IsInt, IsDateString, isEnum, IsEnum } from 'class-validator';
import { DoctorSpecialization } from '../enums/doctor-specialization.enum';

export class GetDoctorsQueryDto {
    @IsOptional()
    @IsString()
    @IsEnum(DoctorSpecialization)
    @ApiProperty({ enum: DoctorSpecialization })
    @ApiPropertyOptional({ example: 'cardiologist', description: 'Filter by specialization' })
    specialization?: DoctorSpecialization;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({ example: 'rohit', description: 'Filter by name (partial)' })
    name?: string;

    @IsOptional()
    @IsIn(['asc', 'desc'])
    @Transform(({ value }) => value?.toLowerCase() || 'asc')
    @ApiPropertyOptional({ example: 'asc', description: 'Sort by doctor name (asc or desc)' })
    sort: 'asc' | 'desc' = 'asc';

    @IsOptional()
    @IsNumberString()
    @Transform(({ value }) => value || '1')
    @ApiPropertyOptional({ example: '1', description: 'Page number for pagination' })
    page: string = '1';

    @IsOptional()
    @IsNumberString()
    @Transform(({ value }) => value || '10')
    @ApiPropertyOptional({ example: '10', description: 'Items per page' })
    limit: string = '10';
}


export class GetDoctorParamDto {
    @Type(() => Number)
    @IsInt()
    @ApiProperty({ example: 1 })
    id: number;
}

export class GetAvailableSlotsQueryDto {
    @IsDateString()
    @ApiProperty({ example: '2025-08-03' })
    date: string;
}


export class GetDoctorSlotsRequestDto {
    @Type(() => Number)
    @IsInt()
    doctorId: number;

    @IsDateString()
    date: string;
}
