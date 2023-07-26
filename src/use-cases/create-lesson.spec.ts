import { beforeEach, describe, expect, it } from 'vitest';
import { CreateLessonUseCase } from './create-lesson';
import { InMemoryLessonsRepository } from '@/repositories/in-memory/lessons-repository';
import { InMemoryUsersRepository } from '@/repositories/in-memory/users-repository';
import { RegisterUseCase } from './register';

let usersRepository: InMemoryUsersRepository;
let lessonsRepository: InMemoryLessonsRepository;

let registerUseCase: RegisterUseCase;
let sut: CreateLessonUseCase;

beforeEach(() => {
	lessonsRepository = new InMemoryLessonsRepository();
	usersRepository = new InMemoryUsersRepository();

	registerUseCase = new RegisterUseCase(usersRepository);
	sut = new CreateLessonUseCase(lessonsRepository);
});

describe('Create Lesson Use Case', () => {
	it('should create lesson', async () => {
		const { user } = await registerUseCase.execute({
			email: 'joe@doe.com',
			name: 'Joe Doe',
			password: 'joe-doe-pw',
		});

		const { lesson } = await sut.execute({
			name: 'Lesson 1',
			userId: user.id,
		});

		expect(lesson.id).toEqual(expect.any(String));
	});

	it.todo('', () => {});
});
