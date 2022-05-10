export enum UserStrategy {
	None = 1,
	Automated,
}

export interface IFindUsersParams {
	ids?: string[];
	strategies?: UserStrategy[];
	email?: string;
	login?: string;
	credential?: string;
}
