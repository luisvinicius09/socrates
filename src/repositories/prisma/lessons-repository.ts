import { Prisma } from '@prisma/client';
import { LessonsRepository } from '../interfaces/lessons-repository';
import { prisma } from '@/lib/prisma';

export class PrismaLessonsRepository implements LessonsRepository {
	async create(data: Prisma.LessonUncheckedCreateWithoutModuleInput) {
		const lesson = await prisma.lesson.create({
			data: data,
		});

		return lesson;
	}

	async findById(id: string) {
		const lesson = await prisma.lesson.findUnique({
			where: { id: id },
		});

		return lesson;
	}

	async update(lessonId: string, data: Prisma.LessonUpdateWithoutModuleInput) {
		const lesson = await prisma.lesson.update({
			where: { id: lessonId },
			data: data,
		});

		return lesson;
	}
}
