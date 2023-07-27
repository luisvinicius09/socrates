import { InMemoryModulesRepository } from '@/repositories/in-memory/modules-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { EditModuleUseCase } from './edit-module';
import { InMemoryUsersRepository } from '@/repositories/in-memory/users-repository';
import { CreateModuleUseCase } from './create-module';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { UsersRepository } from '@/repositories/interfaces/users-repository';
import { ModulesRepository } from '@/repositories/interfaces/modules-repository';

let usersRepository: UsersRepository;
let modulesRepository: ModulesRepository;

let createModuleUseCase: CreateModuleUseCase;
let sut: EditModuleUseCase;

describe('Edit Module Use Case', () => {
	beforeEach(() => {
		modulesRepository = new InMemoryModulesRepository();
		usersRepository = new InMemoryUsersRepository();

		createModuleUseCase = new CreateModuleUseCase(modulesRepository);
		sut = new EditModuleUseCase(modulesRepository);
	});

	it('should edit a module', async () => {
		const user = await usersRepository.create({
			email: 'joe-doe@email.com',
			name: 'Joe Doe',
			password: 'joe-doe-pw',
		});

		const { module } = await createModuleUseCase.execute({
			name: 'Module 1',
			userId: user.id,
		});

		await expect(
			sut.execute({
				moduleId: module.id,
				name: 'Updated Module Name',
			}),
		).resolves.toEqual({
			module: {
				id: module.id,
				name: 'Updated Module Name',
				createdAt: module.createdAt,
				userId: user.id,
			},
		});
	});

	it('should throw an error if the module is not found', async () => {
		await expect(
			sut.execute({
				moduleId: 'invalid-module-id',
				name: 'Random Module Name',
			}),
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
