import { PrismaModulesRepository } from '@/repositories/prisma/modules-repository';
import { EditModuleUseCase } from '../edit-module';

export function makeEditModuleUseCase() {
	const modulesRepository = new PrismaModulesRepository();
	const editModuleUseCase = new EditModuleUseCase(modulesRepository);

	return editModuleUseCase;
}
