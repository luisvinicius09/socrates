import { PrismaCoursesRepository } from '@/repositories/prisma/courses-repository';
import { CreateCourseUseCase } from '../create-course';

export function makeCreateCourseUseCase() {
	const prismaCoursesRepository = new PrismaCoursesRepository();
	const createCourseUseCase = new CreateCourseUseCase(prismaCoursesRepository);

	return createCourseUseCase;
}
