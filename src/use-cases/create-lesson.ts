import { LessonsRepository } from '@/repositories/interfaces/lessons-repository';
import { Lesson } from '@prisma/client';

interface CreateLessonUseCaseRequest {
	userId: string;
	name: string;
	moduleId: string | null;
}

interface CreateLessonUseCaseResponse {
	lesson: Lesson;
}

export class CreateLessonUseCase {
	constructor(private lessonsRepository: LessonsRepository) {}

	async execute({
		userId,
		name,
		moduleId,
	}: CreateLessonUseCaseRequest): Promise<CreateLessonUseCaseResponse> {
		const lesson = await this.lessonsRepository.create({
			userId,
			name,
			moduleId,
		});

		return { lesson };
	}
}
