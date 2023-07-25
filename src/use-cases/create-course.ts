import { CoursesRepository } from '@/repositories/interfaces/courses-repository';
import { Course } from '@prisma/client';

interface CreateCourseRequest {
	name: string;
	description: string;
	userId: string;
}

interface CreateCourseResponse {
	course: Course;
}

export class CreateCourseUseCase {
	constructor(private coursesRepository: CoursesRepository) { }

	async execute({ name, description, userId }: CreateCourseRequest): Promise<CreateCourseResponse> {
		const course = await this.coursesRepository.create({
			name,
			description,
			userId
		});

		return { course };
	}
}
