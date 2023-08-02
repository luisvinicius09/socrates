export class UserOwnsCourseError extends Error {
	constructor() {
		super('Not allowed to acquire course, because user owns course.');
	}
}
