import { Prisma } from '@prisma/client';
import { ModulesRepository } from '../interfaces/modules-repository';
import { prisma } from '@/lib/prisma';

export class PrismaModulesRepository implements ModulesRepository {
	async create(data: Prisma.ModuleCreateManyInput) {
		const module = await prisma.module.create({
			data: data,
		});

		return module;
	}

	async findById(id: string) {
		const module = await prisma.module.findUnique({
			where: { id: id },
		});

		return module;
	}

	async update(moduleId: string, data: Prisma.ModuleUncheckedUpdateInput) {
		const module = await prisma.module.update({
			where: { id: moduleId },
			data: data,
		});

		return module;
	}
}
