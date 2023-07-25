import { InMemoryCoursesRepository } from '@/repositories/in-memory/courses-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { CreateCourseUseCase } from './create-course';
import { CoursesRepository } from '@/repositories/interfaces/courses-repository';
import { UsersRepository } from '@/repositories/interfaces/users-repository';
import { RegisterUseCase } from './register';
import { InMemoryUsersRepository } from '@/repositories/in-memory/users-repository';

let coursesRepository: CoursesRepository;
let usersRepository: UsersRepository;

let registerUseCase: RegisterUseCase;
let sut: CreateCourseUseCase;

beforeEach(() => {
	usersRepository = new InMemoryUsersRepository();
	registerUseCase = new RegisterUseCase(usersRepository);

	coursesRepository = new InMemoryCoursesRepository();
	sut = new CreateCourseUseCase(coursesRepository);
});

describe('Create Course UseCase', () => {
	it('should create a new course', async () => {
		const { user } = await registerUseCase.execute({
			email: 'joe@doe.com',
			name: 'Joe Doe',
			password: 'joe-doe-pw'
		});

		const { course } = await sut.execute({
			name: 'Course 1',
			description: 'Course description',
			userId: user.id
		});

		expect(course.id).toEqual(expect.any(String));
	});

	it.todo('should not allow to create courses if the user already have 10 courses', () => { });
});
