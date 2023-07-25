import { Course, Prisma } from '@prisma/client';

export interface CoursesRepository {
  create(data: Prisma.CourseUncheckedCreateInput): Promise<Course>

  findCourseById(id: string): Promise<Course | null>
}
