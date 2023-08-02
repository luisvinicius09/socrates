import { ModulesOnCourses } from '@prisma/client';
import { ModulesOnCoursesRepository } from '../interfaces/modules-on-courses-repository';

export class InMemoryModulesOnCoursesRepository implements ModulesOnCoursesRepository {
	public modulesOnCourses: ModulesOnCourses[] = [];

	async addModulesToCourse(courseId: string, modulesIds: string[]) {
		modulesIds.forEach((item) => {
			if (
				!this.modulesOnCourses.some((i) => i.moduleId === item && i.courseId === courseId)
			) {
				const newModule = {
					courseId: courseId,
					moduleId: item,
					createdAt: new Date(1111, 1, 1, 1, 1, 1, 1),
				};

				this.modulesOnCourses.push(newModule);
			}
		});
	}

	async removeModulesFromCourse(courseId: string, modulesIds: string[]) {
		this.modulesOnCourses = this.modulesOnCourses.filter(
			(item) => !modulesIds.includes(item.moduleId),
		);
	}

	async handleModulesOnCourses(courseId: string, modulesIds: string[]) {
		this.modulesOnCourses = this.modulesOnCourses.filter((item) =>
			modulesIds.includes(item.moduleId),
		);

		modulesIds.forEach((item) => {
			if (
				!this.modulesOnCourses.some((i) => i.moduleId === item && i.courseId === courseId)
			) {
				const newModule = {
					courseId: courseId,
					moduleId: item,
					createdAt: new Date(1111, 1, 1, 1, 1, 1, 1),
				};

				this.modulesOnCourses.push(newModule);
			}
		});
	}

	async findModulesByCourseId(courseId: string) {
		return this.modulesOnCourses.filter((item) => item.courseId === courseId);
	}
}
