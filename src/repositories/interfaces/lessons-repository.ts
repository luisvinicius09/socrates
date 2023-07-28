import { Lesson, Prisma } from '@prisma/client';

export interface LessonsRepository {
	create(data: Prisma.LessonUncheckedCreateInput): Promise<Lesson>;
	findById(id: string): Promise<Lesson | null>;
	update(
		lessonId: string,
		data: Prisma.LessonUncheckedUpdateWithoutUserInput,
	): Promise<Lesson>;
}
