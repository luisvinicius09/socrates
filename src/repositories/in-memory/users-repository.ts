import { UsersRepository } from '@/repositories/interfaces/users-repository';
import { Prisma, User } from '@prisma/client';
import { randomUUID } from 'crypto';

export class InMemoryUsersRepository implements UsersRepository {
	public users: User[] = [];

	async create(data: Prisma.UserCreateInput) {
		const user = {
			id: data.id ? 'user-1' : randomUUID(),
			name: data.name ?? null,
			email: data.email,
			password: data.password,
			createdAt: new Date(),
		};

		this.users.push(user);

		return user;
	}

	async findByEmail(email: string) {
		const user = this.users.find((user) => user.email === email) ?? null;

		return user;
	}
}
