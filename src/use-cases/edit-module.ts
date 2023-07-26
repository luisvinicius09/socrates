import { ModulesRepository } from '@/repositories/interfaces/modules-repository';
import { Module } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface EditModuleUseCaseRequest {
	moduleId: string;
	name: string;
}

interface EditModuleUseCaseResponse {
	module: Module;
}

export class EditModuleUseCase {
	constructor(private modulesRepository: ModulesRepository) {}

	async execute({
		moduleId,
		name,
	}: EditModuleUseCaseRequest): Promise<EditModuleUseCaseResponse> {
		const module = await this.modulesRepository.findById(moduleId);

		if (!module) {
			throw new ResourceNotFoundError();
		}

		const updatedModule = await this.modulesRepository.update(moduleId, {
			name: name,
		});

		return { module: updatedModule };
	}
}
