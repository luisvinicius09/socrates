import { ModulesRepository } from '@/repositories/interfaces/modules-repository';
import { Module } from '@prisma/client';

interface CreateModuleUseCaseRequest {
	userId: string;
	name: string;
}

interface CreateModuleUseCaseResponse {
	module: Module;
}

export class CreateModuleUseCase {
	constructor(private modulesRepository: ModulesRepository) {}

	async execute({
		userId,
		name,
	}: CreateModuleUseCaseRequest): Promise<CreateModuleUseCaseResponse> {
		const module = await this.modulesRepository.create({
			userId,
			name,
		});

		return { module };
	}
}
