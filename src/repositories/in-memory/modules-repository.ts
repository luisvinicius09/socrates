import { Module, Prisma } from '@prisma/client';
import { ModulesRepository } from '../interfaces/modules-repository';
import { randomUUID } from 'crypto';

export class InMemoryModulesRepository implements ModulesRepository {
	public modules: Module[] = [];

	async create(data: Prisma.ModuleCreateManyInput) {
		const module = {
			id: data.id ?? randomUUID(),
			name: data.name,
			createdAt: new Date(),
			userId: data.userId,
		};

		this.modules.push(module);

		return module;
	}

	async findById(id: string) {
		const module = this.modules.find((item) => item.id === id) ?? null;

		return module;
	}

	async update(moduleId: string, data: Prisma.ModuleUncheckedUpdateInput) {
		const module = await this.findById(moduleId);

		this.modules = this.modules.map((item) => {
			if (item.id === moduleId) {
				return { ...item, ...data };
			}
		}) as Module[];

		return { ...module, ...data } as Module;
	}
}
