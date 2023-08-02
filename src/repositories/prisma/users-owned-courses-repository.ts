import { prisma } from '@/lib/prisma';
import { UsersOwnedCoursesRepository } from '../interfaces/users-owned-courses-repository';

export class PrismaUserOwnedCoursesRepository implements UsersOwnedCoursesRepository {
	async handleUserAcquireCourse(courseId: string, userId: string) {
		await prisma.usersOwnedCourses.create({
			data: {
				courseId: courseId,
				userId: userId,
			},
		});
	}

	async findOwnedCoursesByUserId(userId: string) {
		const ownedCourses = await prisma.usersOwnedCourses.findMany({
			where: {
				userId: userId,
			},
		});

		return ownedCourses;
	}
}
