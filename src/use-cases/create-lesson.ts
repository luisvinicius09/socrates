import { LessonsRepository } from '@/repositories/interfaces/lessons-repository';
import { Lesson } from '@prisma/client';

interface CreateLessonUseCaseRequest {
	userId: string;
	name: string;
}

interface CreateLessonUseCaseResponse {
	lesson: Lesson;
}

export class CreateLessonUseCase {
	constructor(private lessonsRepository: LessonsRepository) {}

	async execute({
		userId,
		name,
	}: CreateLessonUseCaseRequest): Promise<CreateLessonUseCaseResponse> {
		const lesson = await this.lessonsRepository.create({
			userId,
			name,
		});

		return { lesson };
	}
}
