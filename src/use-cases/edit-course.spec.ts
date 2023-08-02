import { beforeEach, describe, expect, it } from 'vitest';
import { EditCourseUseCase } from './edit-course';
import { InMemoryCoursesRepository } from '@/repositories/in-memory/courses-repository';
import { InMemoryUsersRepository } from '@/repositories/in-memory/users-repository';
import { UsersRepository } from '@/repositories/interfaces/users-repository';
import { CreateCourseUseCase } from './create-course';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { CoursesRepository } from '@/repositories/interfaces/courses-repository';
import { ModulesOnCoursesRepository } from '@/repositories/interfaces/modules-on-courses-repository';
import { InMemoryModulesOnCoursesRepository } from '@/repositories/in-memory/modules-on-courses-repository';
import { ModulesRepository } from '@/repositories/interfaces/modules-repository';
import { InMemoryModulesRepository } from '@/repositories/in-memory/modules-repository';

let coursesRepository: CoursesRepository;
let usersRepository: UsersRepository;
let modulesRepository: ModulesRepository;
let modulesOnCoursesRepository: ModulesOnCoursesRepository;

let createCourseUseCase: CreateCourseUseCase;
let sut: EditCourseUseCase;

beforeEach(() => {
	usersRepository = new InMemoryUsersRepository();
	coursesRepository = new InMemoryCoursesRepository();
	modulesRepository = new InMemoryModulesRepository();
	modulesOnCoursesRepository = new InMemoryModulesOnCoursesRepository();

	createCourseUseCase = new CreateCourseUseCase(coursesRepository);
	sut = new EditCourseUseCase(coursesRepository, modulesOnCoursesRepository);
});

describe('Edit Course Use Case', () => {
	it('should edit simple information on a course', async () => {
		const user = await usersRepository.create({
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
				modulesIds: [],
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
				modulesIds: [],
			}),
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it('should add modules to a course', async () => {
		const user = await usersRepository.create({
			email: 'joe@doe.com',
			name: 'Joe Doe',
			password: 'joe-doe-pw',
		});

		const { course } = await createCourseUseCase.execute({
			name: 'Course 1',
			description: 'Course description',
			userId: user.id,
		});

		const [module1, module2, module3] = await Promise.all([
			modulesRepository.create({
				name: 'Module 1',
				userId: user.id,
			}),
			modulesRepository.create({
				name: 'Module 2',
				userId: user.id,
			}),
			modulesRepository.create({
				name: 'Module 3',
				userId: user.id,
			}),
		]);

		await sut.execute({
			courseId: course.id,
			description: course.description,
			name: course.name,
			modulesIds: [module1.id, module2.id, module3.id],
		});

		await expect(
			modulesOnCoursesRepository.findModulesByCourseId(course.id),
		).resolves.toEqual([
			{
				courseId: course.id,
				createdAt: new Date(1111, 1, 1, 1, 1, 1, 1),
				moduleId: module1.id,
			},
			{
				courseId: course.id,
				createdAt: new Date(1111, 1, 1, 1, 1, 1, 1),
				moduleId: module2.id,
			},
			{
				courseId: course.id,
				createdAt: new Date(1111, 1, 1, 1, 1, 1, 1),
				moduleId: module3.id,
			},
		]);
	});

	it('should remove modules to a course', async () => {
		const user = await usersRepository.create({
			email: 'joe@doe.com',
			name: 'Joe Doe',
			password: 'joe-doe-pw',
		});

		const { course } = await createCourseUseCase.execute({
			name: 'Course 1',
			description: 'Course description',
			userId: user.id,
		});

		const [module1, module2, module3] = await Promise.all([
			modulesRepository.create({
				name: 'Module 1',
				userId: user.id,
			}),
			modulesRepository.create({
				name: 'Module 2',
				userId: user.id,
			}),
			modulesRepository.create({
				name: 'Module 3',
				userId: user.id,
			}),
		]);

		await sut.execute({
			courseId: course.id,
			description: course.description,
			name: course.name,
			modulesIds: [module1.id, module2.id, module3.id],
		});

		await expect(
			modulesOnCoursesRepository.findModulesByCourseId(course.id),
		).resolves.toEqual([
			{
				courseId: course.id,
				createdAt: new Date(1111, 1, 1, 1, 1, 1, 1),
				moduleId: module1.id,
			},
			{
				courseId: course.id,
				createdAt: new Date(1111, 1, 1, 1, 1, 1, 1),
				moduleId: module2.id,
			},
			{
				courseId: course.id,
				createdAt: new Date(1111, 1, 1, 1, 1, 1, 1),
				moduleId: module3.id,
			},
		]);

		await sut.execute({
			courseId: course.id,
			description: course.description,
			name: course.name,
			modulesIds: [module3.id],
		});

		await expect(
			modulesOnCoursesRepository.findModulesByCourseId(course.id),
		).resolves.toEqual([
			{
				courseId: course.id,
				createdAt: new Date(1111, 1, 1, 1, 1, 1, 1),
				moduleId: module3.id,
			},
		]);
	});

	it('should not add duplicate modules to a course when editing', async () => {
		const user = await usersRepository.create({
			email: 'joe@doe.com',
			name: 'Joe Doe',
			password: 'joe-doe-pw',
		});

		const { course } = await createCourseUseCase.execute({
			name: 'Course 1',
			description: 'Course description',
			userId: user.id,
		});

		const [module1, module2] = await Promise.all([
			modulesRepository.create({
				name: 'Module 1',
				userId: user.id,
			}),
			modulesRepository.create({
				name: 'Module 2',
				userId: user.id,
			}),
		]);

		await sut.execute({
			courseId: course.id,
			description: course.description,
			name: course.name,
			modulesIds: [module1.id, module2.id, module2.id],
		});

		await expect(
			modulesOnCoursesRepository.findModulesByCourseId(course.id),
		).resolves.toEqual([
			{
				courseId: course.id,
				createdAt: new Date(1111, 1, 1, 1, 1, 1, 1),
				moduleId: module1.id,
			},
			{
				courseId: course.id,
				createdAt: new Date(1111, 1, 1, 1, 1, 1, 1),
				moduleId: module2.id,
			},
		]);
	});
});
