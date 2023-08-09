import { PrismaCoursesRepository } from '@/repositories/prisma/courses-repository';
import { PrismaModulesOnCoursesRepository } from '@/repositories/prisma/modules-on-courses-repository';
import { EditCourseUseCase } from '../edit-course';

export function makeEditCourseUseCase() {
	const coursesRepository = new PrismaCoursesRepository();
	const modulesOnCoursesRepository = new PrismaModulesOnCoursesRepository();
	const editCourseUseCase = new EditCourseUseCase(
		coursesRepository,
		modulesOnCoursesRepository,
	);

	return editCourseUseCase;
}
