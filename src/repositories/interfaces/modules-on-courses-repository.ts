import { ModulesOnCourses } from '@prisma/client';

export interface ModulesOnCoursesRepository {
	addModulesToCourse(courseId: string, modulesIds: string[]): Promise<void>;
	removeModulesFromCourse(courseId: string, modulesIds: string[]): Promise<void>;
	handleModulesOnCourses(courseId: string, modulesIds: string[]): Promise<void>;
	findModulesByCourseId(courseId: string): Promise<ModulesOnCourses[]>;
}
