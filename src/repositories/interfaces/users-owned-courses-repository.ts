import { UsersOwnedCourses } from '@prisma/client';

export interface UsersOwnedCoursesRepository {
	handleUserAcquireCourse(courseId: string, userId: string): Promise<void>;
	findOwnedCoursesByUserId(userId: string): Promise<UsersOwnedCourses[]>;
}
