import { PrismaModulesRepository } from '@/repositories/prisma/modules-repository';
import { CreateModuleUseCase } from '../create-module';

export function makeCreateModuleUseCase() {
	const modulesRepository = new PrismaModulesRepository();
	const createModuleUseCase = new CreateModuleUseCase(modulesRepository);

	return createModuleUseCase;
}
