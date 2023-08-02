import { CoursesRepository } from '@/repositories/interfaces/courses-repository';
import { UsersOwnedCoursesRepository } from '@/repositories/interfaces/users-owned-courses-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { UserOwnsCourseError } from './errors/user-owns-course-error';

interface AcquireCourseUseCaseRequest {
	userId: string;
	courseId: string;
}

interface AcquireCourseUseCaseResponse {}

export class AcquireCourseUseCase {
	constructor(
		private usersOwnedCoursesRepository: UsersOwnedCoursesRepository,
		private coursesRepository: CoursesRepository,
	) {}

	async execute({
		userId,
		courseId,
	}: AcquireCourseUseCaseRequest): Promise<AcquireCourseUseCaseResponse> {
		const course = await this.coursesRepository.findById(courseId);

		if (!course) {
			throw new ResourceNotFoundError();
		}

		if (course.userId === userId) {
			throw new UserOwnsCourseError();
		}

		await this.usersOwnedCoursesRepository.handleUserAcquireCourse(courseId, userId);

		return {};
	}
}
