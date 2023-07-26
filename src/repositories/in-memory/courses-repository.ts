import { Course, Prisma } from '@prisma/client';
import { CoursesRepository } from '../interfaces/courses-repository';
import { randomUUID } from 'crypto';

export class InMemoryCoursesRepository implements CoursesRepository {
	public courses: Course[] = [];

	async create(data: Prisma.CourseUncheckedCreateInput) {
		const course = {
			id: data.id ?? randomUUID(),
			name: data.name,
			description: data.description,
			createdAt: new Date(),
			userId: data.userId,
		};

		this.courses.push(course);

		return course;
	}

	async findById(id: string) {
		const course = this.courses.find((item) => item.id === id) ?? null;

		return course;
	}

	async update(courseId: string, data: Prisma.CourseUpdateWithoutUserInput) {
		const course = await this.findById(courseId);

		// if (!course) {
		// 	const newCourse = await this.create(data as Prisma.CourseUncheckedCreateInput);

		// 	this.courses.push(newCourse);

		// 	return newCourse;
		// }

		this.courses = this.courses.map((item) => {
			if (item.id === courseId) {
				return { ...item, ...data };
			}
		}) as Course[];

		return { ...course, ...data } as Course;
	}
}
