import { UsersOwnedCourses } from '@prisma/client';
import { UsersOwnedCoursesRepository } from '../interfaces/users-owned-courses-repository';

export class InMemoryUserOwnedCoursesRepository implements UsersOwnedCoursesRepository {
	public usersOwnedCourses: UsersOwnedCourses[] = [];

	async handleUserAcquireCourse(courseId: string, userId: string) {
		this.usersOwnedCourses.push({
			courseId: courseId,
			userId: userId,
			createdAt: new Date(1111, 1, 1, 1, 1, 1, 1),
		});
	}

	async findOwnedCoursesByUserId(userId: string) {
		const ownedCourses = this.usersOwnedCourses.filter((u) => u.userId === userId);

		return ownedCourses;
	}
}
