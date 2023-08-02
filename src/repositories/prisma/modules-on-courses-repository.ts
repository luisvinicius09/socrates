import { prisma } from '@/lib/prisma';
import { ModulesOnCoursesRepository } from '../interfaces/modules-on-courses-repository';

export class PrismaModulesOnCoursesRepository implements ModulesOnCoursesRepository {
	async addModulesToCourse(courseId: string, modulesIds: string[]) {
		await prisma.modulesOnCourses.createMany({
			data: modulesIds.map((item) => {
				return {
					courseId: courseId,
					moduleId: item,
				};
			}),
			skipDuplicates: true,
		});
	}

	async removeModulesFromCourse(courseId: string, modulesIds: string[]) {
		await prisma.modulesOnCourses.deleteMany({
			where: {
				courseId: courseId,
				moduleId: {
					in: modulesIds,
				},
			},
		});
	}

	async handleModulesOnCourses(courseId: string, modulesIds: string[]) {
		await prisma.modulesOnCourses.deleteMany({
			where: {
				courseId: courseId,
				moduleId: {
					notIn: modulesIds,
				},
			},
		});

		await prisma.modulesOnCourses.createMany({
			data: modulesIds.map((item) => {
				return {
					courseId: courseId,
					moduleId: item,
				};
			}),
			skipDuplicates: true,
		});
	}

	async findModulesByCourseId(courseId: string) {
		return await prisma.modulesOnCourses.findMany({
			where: {
				courseId: courseId,
			},
		});
	}
}
