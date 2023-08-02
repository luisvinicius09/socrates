import { beforeEach, describe, expect, it } from 'vitest';
import { AcquireCourseUseCase } from './acquire-course';
import { CoursesRepository } from '@/repositories/interfaces/courses-repository';
import { UsersOwnedCoursesRepository } from '@/repositories/interfaces/users-owned-courses-repository';
import { InMemoryCoursesRepository } from '@/repositories/in-memory/courses-repository';
import { InMemoryUserOwnedCoursesRepository } from '@/repositories/in-memory/users-owned-courses-repository';
import { UsersRepository } from '@/repositories/interfaces/users-repository';
import { InMemoryUsersRepository } from '@/repositories/in-memory/users-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { UserOwnsCourseError } from './errors/user-owns-course-error';

let coursesRepository: CoursesRepository;
let usersOwnedCoursesRepository: UsersOwnedCoursesRepository;
let usersRepository: UsersRepository;

let sut: AcquireCourseUseCase;

describe('Acquire Course Use Case', () => {
	beforeEach(() => {
		coursesRepository = new InMemoryCoursesRepository();
		usersOwnedCoursesRepository = new InMemoryUserOwnedCoursesRepository();
		usersRepository = new InMemoryUsersRepository();

		sut = new AcquireCourseUseCase(usersOwnedCoursesRepository, coursesRepository);
	});

	it('should let the user acquire a new course', async () => {
		const courseUser = await usersRepository.create({
			email: 'joe@doe.com',
			name: 'Joe Doe',
			password: 'joe-doe-pw',
		});

		const user = await usersRepository.create({
			email: 'joe2@doe.com',
			name: 'Joe Doe',
			password: 'joe-doe-pw',
		});

		const course = await coursesRepository.create({
			name: 'Course 1',
			description: 'Course description',
			userId: courseUser.id,
		});

		await sut.execute({
			courseId: course.id,
			userId: user.id,
		});

		await expect(
			usersOwnedCoursesRepository.findOwnedCoursesByUserId(user.id),
		).resolves.toEqual([
			{
				courseId: course.id,
				userId: user.id,
				createdAt: new Date(1111, 1, 1, 1, 1, 1, 1),
			},
		]);
	});

	it('should not let the user acquire a course that does not exist', async () => {
		const user = await usersRepository.create({
			email: 'joe@doe.com',
			name: 'Joe Doe',
			password: 'joe-doe-pw',
		});

		await expect(
			sut.execute({
				courseId: 'random-course-id',
				userId: user.id,
			}),
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it('should not let the user acquire a course created by himself', async () => {
		const user = await usersRepository.create({
			email: 'joe@doe.com',
			name: 'Joe Doe',
			password: 'joe-doe-pw',
		});

		const course = await coursesRepository.create({
			name: 'Course 1',
			description: 'Course description',
			userId: user.id,
		});

		await expect(
			sut.execute({
				courseId: course.id,
				userId: user.id,
			}),
		).rejects.toBeInstanceOf(UserOwnsCourseError);
	});
});
