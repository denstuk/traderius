export interface IHashSaltPair {
	hash: string;
	salt: string;
}

export interface ITokenPair {
	access: string;
	refresh: string;
}
