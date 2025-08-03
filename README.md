Doctor Appointment Booking API
A backend system with NestJS + PostgreSQL for managing doctor and booking appointments with validation, availability checks, and clean REST APIs.

Tech Stack
Framework: NestJS (TypeScript)
Database: PostgreSQL + TypeORM
Validation: class-validator + DTOs
Documentation: Swagger (OpenAPI)
Auth: JWT (basic)
Scheduling Logic: UTC-based time slots


Features
List all doctors with pagination, search, and filters
Get available time slots for a doctor
Book appointments (with validation against overlap & working hours)
Input validation using DTOs
JWT-protected endpoints (optional auth)
Swagger API docs (/api)
Seed script for sample data
All times handled in UTC (FE must convert if needed)


Setup Instructions:

1. Clone the repo: git clone https://github.com/rohit-sonawane7/doctor-appointment-api.git
2. cd doctor-appointment-api
3. Install dependencies: npm install
4.  Configure .env : copy .env.example
5. Seed sample data: npx ts-node src/seeds/seed.ts
6. Start the app: npm run start:dev

API Documentation
Once app running, visit: http://localhost:3000/api


Working Hours & Slot Logic
Doctor working hours: 9 AM – 5 PM IST, we stored internally as 3:30 AM – 11:30 AM UTC (in UTC timings).
All times stored and returned in UTC.
Appointments are 30-minute slots.
Appointments cannot overlap.


Authentication
Basic JWT-based auth (Authorization: Bearer <token>)
Only needed for booking endpoints (optional for this test)


Validation Rules
endTime must not be same as startTime
Appointments must not overlap with others for the same doctor
Appointment time must fall within doctor’s working hours (UTC)
