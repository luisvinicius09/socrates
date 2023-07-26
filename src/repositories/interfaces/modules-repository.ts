import { Module, Prisma } from '@prisma/client';

export interface ModulesRepository {
	create(data: Prisma.ModuleCreateManyInput): Promise<Module>;
	findById(id: string): Promise<Module | null>;
	update(moduleId: string, data: Prisma.ModuleUncheckedUpdateInput): Promise<Module>;
}
