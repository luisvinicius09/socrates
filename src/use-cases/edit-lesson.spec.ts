import { InMemoryLessonsRepository } from '@/repositories/in-memory/lessons-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { EditLessonUseCase } from './edit-lesson';
import { InMemoryUsersRepository } from '@/repositories/in-memory/users-repository';
import { CreateLessonUseCase } from './create-lesson';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { UsersRepository } from '@/repositories/interfaces/users-repository';
import { LessonsRepository } from '@/repositories/interfaces/lessons-repository';
import { ModulesRepository } from '@/repositories/interfaces/modules-repository';
import { InMemoryModulesRepository } from '@/repositories/in-memory/modules-repository';

let usersRepository: UsersRepository;
let lessonsRepository: LessonsRepository;
let modulesRepository: ModulesRepository;

let createLessonUseCase: CreateLessonUseCase;
let sut: EditLessonUseCase;

describe('Edit Lesson Use Case', () => {
	beforeEach(() => {
		lessonsRepository = new InMemoryLessonsRepository();
		usersRepository = new InMemoryUsersRepository();
		modulesRepository = new InMemoryModulesRepository();

		createLessonUseCase = new CreateLessonUseCase(lessonsRepository);
		sut = new EditLessonUseCase(lessonsRepository);
	});

	it('should edit a lesson', async () => {
		const user = await usersRepository.create({
			email: 'joe-doe@email.com',
			name: 'Joe Doe',
			password: 'joe-doe-pw',
		});

		const { lesson } = await createLessonUseCase.execute({
			name: 'Lesson 1',
			userId: user.id,
			moduleId: null,
		});

		await expect(
			sut.execute({
				lessonId: lesson.id,
				name: 'Updated Lesson Name',
				moduleId: null,
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
				moduleId: null,
			}),
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it('should add the lesson to a module', async () => {
		const user = await usersRepository.create({
			email: 'joe-doe@email.com',
			password: 'joe-doe-pw',
		});

		const module = await modulesRepository.create({
			name: 'Module 1',
			userId: user.id,
		});

		const { lesson } = await createLessonUseCase.execute({
			name: 'Lesson 1',
			userId: user.id,
			moduleId: module.id,
		});

		expect(lesson.moduleId).toEqual(module.id);
	});

	it('should remove the lesson from a lesson module', async () => {
		const user = await usersRepository.create({
			email: 'joe-doe@email.com',
			password: 'joe-doe-pw',
		});

		const module = await modulesRepository.create({
			name: 'Module 1',
			userId: user.id,
		});

		const { lesson } = await createLessonUseCase.execute({
			name: 'Lesson 1',
			userId: user.id,
			moduleId: module.id,
		});

		expect(lesson.moduleId).toEqual(module.id);

		const updatedLesson = await sut.execute({
			lessonId: lesson.id,
			name: 'Lesson 1',
			moduleId: null,
		});

		expect(updatedLesson.lesson.moduleId).toEqual(null);

		await expect(
			modulesRepository.findById(updatedLesson.lesson.moduleId!),
		).resolves.toEqual(null);
	});
});
