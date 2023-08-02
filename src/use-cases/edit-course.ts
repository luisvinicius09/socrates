import { CoursesRepository } from '@/repositories/interfaces/courses-repository';
import { Course } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { ModulesOnCoursesRepository } from '@/repositories/interfaces/modules-on-courses-repository';

interface EditCourseUseCaseRequest {
	courseId: string;
	name: string;
	description: string;
	modulesIds: string[];
}

interface EditCourseUseCaseResponse {
	course: Course;
}

export class EditCourseUseCase {
	constructor(
		private coursesRepository: CoursesRepository,
		private modulesOnCoursesRepository: ModulesOnCoursesRepository,
	) {}

	async execute({
		courseId,
		name,
		description,
		modulesIds,
	}: EditCourseUseCaseRequest): Promise<EditCourseUseCaseResponse> {
		const course = await this.coursesRepository.findById(courseId);

		if (!course) {
			throw new ResourceNotFoundError();
		}

		await this.modulesOnCoursesRepository.handleModulesOnCourses(courseId, modulesIds);

		const updatedCourse = await this.coursesRepository.update(courseId, {
			name,
			description,
		});

		return { course: updatedCourse };
	}
}
