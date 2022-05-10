export enum UserRole {
	Simple = 1,
	Admin = 2,
}

export type FindUserParams = {
	ids?: string[];
	logins?: string[];
	emails?: string[];
	phones?: string[];
	roles?: UserRole[];
};
