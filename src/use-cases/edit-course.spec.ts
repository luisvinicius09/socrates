import { beforeEach, describe, expect, it } from 'vitest';
import { EditCourseUseCase } from './edit-course';
import { InMemoryCoursesRepository } from '@/repositories/in-memory/courses-repository';
import { InMemoryUsersRepository } from '@/repositories/in-memory/users-repository';
import { RegisterUseCase } from './register';
import { UsersRepository } from '@/repositories/interfaces/users-repository';
import { CreateCourseUseCase } from './create-course';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

let coursesRepository: InMemoryCoursesRepository;
let usersRepository: UsersRepository;

let registerUseCase: RegisterUseCase;
let createCourseUseCase: CreateCourseUseCase;
let sut: EditCourseUseCase;

beforeEach(() => {
	usersRepository = new InMemoryUsersRepository();
	coursesRepository = new InMemoryCoursesRepository();

	registerUseCase = new RegisterUseCase(usersRepository);
	createCourseUseCase = new CreateCourseUseCase(coursesRepository);
	sut = new EditCourseUseCase(coursesRepository);
});

describe('Edit Course Use Case', () => {
	it('should edit the course', async () => {
		const { user } = await registerUseCase.execute({
			email: 'joe@doe.com',
			name: 'Joe Doe',
			password: 'joe-doe-pw',
		});

		const userId = user.id;

		const { course } = await createCourseUseCase.execute({
			name: 'Course 1',
			description: 'Course description',
			userId: userId,
		});

		const courseId = course.id;

		const newCourseDescription = 'New course description';
		const newCourseName = 'New course name';

		await expect(
			sut.execute({
				courseId: courseId,
				description: newCourseDescription,
				name: newCourseName,
			}),
		).resolves.toEqual({
			course: {
				id: courseId,
				name: newCourseName,
				description: newCourseDescription,
				createdAt: course.createdAt,
				userId: userId,
			},
		});
	});

	it('should not find the course and throw error', async () => {
		await expect(
			sut.execute({
				courseId: 'it-will-not-find-me',
				description: 'Beatiful Description',
				name: 'A new name for the course',
			}),
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
