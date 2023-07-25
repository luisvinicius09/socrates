import { CoursesRepository } from '@/repositories/interfaces/courses-repository';
import { Course } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface EditCourseUseCaseRequest {
	courseId: string;
	name: string;
	description: string;
}

interface EditCourseUseCaseResponse {
	course: Course;
}

export class EditCourseUseCase {
	constructor(private coursesRepository: CoursesRepository) {}

	async execute({
		courseId,
		name,
		description,
	}: EditCourseUseCaseRequest): Promise<EditCourseUseCaseResponse> {
		const course = await this.coursesRepository.findById(courseId);

		if (!course) {
			throw new ResourceNotFoundError();
		}

		const updatedCourse = await this.coursesRepository.update(courseId, {
			name,
			description,
		});

		return { course: updatedCourse };
	}
}
