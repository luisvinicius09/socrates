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

	async findById(courseId: string) {
		const course = await prisma.course.findUnique({
			where: { id: courseId },
		});

		return course;
	}

	async update(courseId: string, data: Prisma.CourseUpdateWithoutUserInput) {
		const updatedCourse = await prisma.course.update({
			where: { id: courseId },
			data: data
		});

		return updatedCourse;
	}

}
