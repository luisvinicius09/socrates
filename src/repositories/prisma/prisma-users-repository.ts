import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { UsersRepository } from '@/repositories/interfaces/users-repository';

export class PrismaUsersRepository implements UsersRepository {
	async create(data: Prisma.UserCreateInput) {
		const user = await prisma.user.create({
			data: data,
		});

		return user;
	}

	async findUserByEmail(email: string) {
		const user = await prisma.user.findUnique({
			where: {
				email: email,
			}
		});

		return user;
	}
}