import {PATHS} from "./paths";

export enum HEADER_VARIANT {
	default = 'default',
	defaultWithBack = 'defaultWithBack',
	chat = 'chat',
}

export type HeaderConfig = {
	variant: HEADER_VARIANT,
	backPath?: string,
}

export const headerConfig = (path: string): HeaderConfig => {
	const {home, login, signup, chat} = PATHS;
	switch (path) {
		case home:
			return {
				variant: HEADER_VARIANT.default,
			}
		case login:
			return {
				variant: HEADER_VARIANT.defaultWithBack,
				backPath: PATHS.home
			}
		case signup:
			return {
				variant: HEADER_VARIANT.defaultWithBack,
				backPath: PATHS.login
			}
		case chat:
			return {
				variant: HEADER_VARIANT.chat,
			}
		default:
			return {
				variant: HEADER_VARIANT.default
			};

	}
}