import { UsersRepository } from '@/repositories/interfaces/users-repository';
import { User } from '@prisma/client';

interface GetUserProfileUseCaseRequest {
	userId: string;
}

interface GetUserProfileUseCaseResponse {
	user: User;
}

export class GetUserProfileUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({
		userId,
	}: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
		const user = await this.usersRepository.findByUserId(userId);

		if (!user) {
			throw new Error('User not found');
		}

		return { user };
	}
}
