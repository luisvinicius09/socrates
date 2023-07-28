import { beforeEach, describe, expect, it } from 'vitest';
import { CreateLessonUseCase } from './create-lesson';
import { InMemoryLessonsRepository } from '@/repositories/in-memory/lessons-repository';
import { InMemoryUsersRepository } from '@/repositories/in-memory/users-repository';
import { UsersRepository } from '@/repositories/interfaces/users-repository';
import { LessonsRepository } from '@/repositories/interfaces/lessons-repository';
import { ModulesRepository } from '@/repositories/interfaces/modules-repository';
import { InMemoryModulesRepository } from '@/repositories/in-memory/modules-repository';

let usersRepository: UsersRepository;
let lessonsRepository: LessonsRepository;
let modulesRepository: ModulesRepository;

let sut: CreateLessonUseCase;

beforeEach(() => {
	lessonsRepository = new InMemoryLessonsRepository();
	usersRepository = new InMemoryUsersRepository();
	modulesRepository = new InMemoryModulesRepository();

	sut = new CreateLessonUseCase(lessonsRepository);
});

describe('Create Lesson Use Case', () => {
	it('should create lesson without belonging to a module', async () => {
		const user = await usersRepository.create({
			email: 'joe@doe.com',
			name: 'Joe Doe',
			password: 'joe-doe-pw',
		});

		const { lesson } = await sut.execute({
			name: 'Lesson 1',
			userId: user.id,
			moduleId: null,
		});

		expect(lesson.id).toEqual(expect.any(String));
	});

	it('should create a lesson that belongs to a module', async () => {
		const user = await usersRepository.create({
			email: 'joe@doe.com',
			name: 'Joe Doe',
			password: 'joe-doe-pw',
		});

		const module = await modulesRepository.create({
			name: 'Module 1',
			userId: user.id,
		});

		const { lesson } = await sut.execute({
			name: 'Lesson 1',
			userId: user.id,
			moduleId: module.id,
		});

		const lessonModule = await modulesRepository.findById(lesson.moduleId!);

		expect(lesson.moduleId).toEqual(module.id);
		expect(lessonModule?.name).toEqual('Module 1');
	});
});
