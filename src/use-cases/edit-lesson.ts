import { LessonsRepository } from '@/repositories/interfaces/lessons-repository';
import { Lesson } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface EditLessonUseCaseRequest {
	lessonId: string;
	name: string;
}

interface EditLessonUseCaseResponse {
	lesson: Lesson;
}

export class EditLessonUseCase {
	constructor(private lessonsRepository: LessonsRepository) {}

	async execute({
		lessonId,
		name,
	}: EditLessonUseCaseRequest): Promise<EditLessonUseCaseResponse> {
		const lesson = await this.lessonsRepository.findById(lessonId);

		if (!lesson) {
			throw new ResourceNotFoundError();
		}

		const updatedLesson = await this.lessonsRepository.update(lessonId, {
			name: name,
		});

		return { lesson: updatedLesson };
	}
}
