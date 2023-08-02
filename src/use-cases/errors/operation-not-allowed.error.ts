export class OperatioNotAllowedError extends Error {
	constructor() {
		super('Operation not allowed.');
	}
}
