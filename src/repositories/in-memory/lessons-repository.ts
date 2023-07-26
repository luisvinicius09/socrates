import { Lesson, Prisma } from '@prisma/client';
import { LessonsRepository } from '../interfaces/lessons-repository';
import { randomUUID } from 'crypto';

export class InMemoryLessonsRepository implements LessonsRepository {
	public lessons: Lesson[] = [];

	async create(data: Prisma.LessonUncheckedCreateWithoutModuleInput) {
		const lesson = {
			id: data.id ?? randomUUID(),
			name: 'Lesson-1',
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

	async update(lessonId: string, data: Prisma.LessonUncheckedUpdateWithoutModuleInput) {
		const course = await this.findById(lessonId);

		if (!course) {
			const newLesson = await this.create(data as Prisma.CourseUncheckedCreateInput);

			this.lessons.push(newLesson);

			return newLesson;
		}

		this.lessons = this.lessons.map((item) => {
			if (item.id === lessonId) {
				return { ...item, ...data };
			}
		}) as Lesson[];

		return { ...course, ...data } as Lesson;
	}
}
