import { Lesson, Prisma } from '@prisma/client';
import { LessonsRepository } from '../interfaces/lessons-repository';
import { randomUUID } from 'crypto';

export class InMemoryLessonsRepository implements LessonsRepository {
	public lessons: Lesson[] = [];

	async create(data: Prisma.LessonUncheckedCreateWithoutModuleInput) {
		const lesson = {
			id: data.id ?? randomUUID(),
			name: data.name,
			createdAt: new Date(),
			userId: data.userId,
			moduleId: null,
		};

		this.lessons.push(lesson);

		return lesson;
	}

	async findById(id: string) {
		const lesson = this.lessons.find((item) => item.id === id) ?? null;

		return lesson;
	}

	async update(lessonId: string, data: Prisma.LessonUpdateWithoutModuleInput) {
		const lesson = await this.findById(lessonId);

		this.lessons = this.lessons.map((item) => {
			if (item.id === lessonId) {
				return { ...item, ...data };
			}
		}) as Lesson[];

		return { ...lesson, ...data } as Lesson;
	}
}
