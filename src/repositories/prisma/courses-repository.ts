import { Prisma } from '@prisma/client';
import { CoursesRepository } from '../interfaces/courses-repository';
import { prisma } from '@/lib/prisma';

export class PrismaCoursesRepository implements CoursesRepository {
	async create(data: Prisma.CourseUncheckedCreateInput) {
		const course = await prisma.course.create({
			data: data
		});

		return course;
	}

	async findCourseById(id: string) {
		const course = await prisma.course.findUnique({
			where: { id: id },
		});

		return course;
	}

}
