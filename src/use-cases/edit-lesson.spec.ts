import { InMemoryLessonsRepository } from '@/repositories/in-memory/lessons-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { EditLessonUseCase } from './edit-lesson';
import { InMemoryUsersRepository } from '@/repositories/in-memory/users-repository';
import { RegisterUseCase } from './register';
import { CreateLessonUseCase } from './create-lesson';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

let usersRepository: InMemoryUsersRepository;
let lessonsRepository: InMemoryLessonsRepository;

let registerUseCase: RegisterUseCase;
let createLessonUseCase: CreateLessonUseCase;
let sut: EditLessonUseCase;

describe('Edit Lesson Use Case', () => {
	beforeEach(() => {
		lessonsRepository = new InMemoryLessonsRepository();
		usersRepository = new InMemoryUsersRepository();

		registerUseCase = new RegisterUseCase(usersRepository);
		createLessonUseCase = new CreateLessonUseCase(lessonsRepository);
		sut = new EditLessonUseCase(lessonsRepository);
	});

	it('should edit a lesson', async () => {
		const { user } = await registerUseCase.execute({
			email: 'joe-doe@email.com',
			name: 'Joe Doe',
			password: 'joe-doe-pw',
		});

		const { lesson } = await createLessonUseCase.execute({
			name: 'Lesson 1',
			userId: user.id,
		});

		await expect(
			sut.execute({
				lessonId: lesson.id,
				name: 'Updated Lesson Name',
			}),
		).resolves.toEqual({
			lesson: {
				id: lesson.id,
				name: 'Updated Lesson Name',
				createdAt: lesson.createdAt,
				moduleId: lesson.moduleId,
				userId: user.id,
			},
		});
	});

	it('should throw an error if the lesson is not found', async () => {
		await expect(
			sut.execute({
				lessonId: 'invalid-lesson-id',
				name: 'Random Lesson Name',
			}),
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
