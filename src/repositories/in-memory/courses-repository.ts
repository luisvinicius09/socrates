import { Course, Prisma } from '@prisma/client';
import { CoursesRepository } from '../interfaces/courses-repository';
import { randomUUID } from 'crypto';

export class InMemoryCoursesRepository implements CoursesRepository {
	public courses: Course[] = [];

	async create(data: Prisma.CourseUncheckedCreateInput) {
		const course = {
			id: randomUUID(),
			name: data.name,
			description: data.description,
			createdAt: new Date(),
			userId: data.userId,
		};

		this.courses.push(course);

		return course;
	}

	async findCourseById(id: string) {
		const course = this.courses.find(c => c.id === id) ?? null;

		return course;
	}
}
