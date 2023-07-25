import { Course, Prisma } from '@prisma/client';

export interface CoursesRepository {
  create(data: Prisma.CourseUncheckedCreateInput): Promise<Course>

  findById(courseId: string): Promise<Course | null>

	update(courseId: string, data: Prisma.CourseUpdateWithoutUserInput): Promise<Course>
}
