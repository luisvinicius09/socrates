import { PrismaLessonsRepository } from '@/repositories/prisma/lessons-repository';
import { EditLessonUseCase } from '../edit-lesson';

export function makeEditLessonUseCase() {
	const lessonsRepository = new PrismaLessonsRepository();

	const createLessonUseCase = new EditLessonUseCase(lessonsRepository);

	return createLessonUseCase;
}
