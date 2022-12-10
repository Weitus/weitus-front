import {PATHS} from "./paths";

export enum headerVariant {
	default = 'default',
	defaultWithBack = 'defaultWithBack',
	chat = 'chat',
	chatLoggedIn = 'chatLoggedIn',
}

export const headerConfig = (path: string): headerVariant => {
	const {home, login, signup} = PATHS;
	switch (path) {
		case home:
			return headerVariant.default;
		case login:
			return headerVariant.defaultWithBack;
		case signup:
			return headerVariant.defaultWithBack;
		default:
			return headerVariant.default;

	}
}