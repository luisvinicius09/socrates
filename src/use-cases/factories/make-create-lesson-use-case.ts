import { PrismaLessonsRepository } from '@/repositories/prisma/lessons-repository';
import { CreateLessonUseCase } from '../create-lesson';

export function makeCreateLessonUseCase() {
	const lessonsRepository = new PrismaLessonsRepository();

	const createLessonUseCase = new CreateLessonUseCase(lessonsRepository);

	return createLessonUseCase;
}
