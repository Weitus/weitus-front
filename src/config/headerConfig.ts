import {PATHS} from "./paths";

export enum headerVariant {
	default = 'default',
	defaultWithBack = 'defaultWithBack',
	chat = 'chat',
}

export const headerConfig = (path: string): headerVariant => {
	const {home, login, signup, chat} = PATHS;
	switch (path) {
		case home:
			return headerVariant.default;
		case login:
			return headerVariant.defaultWithBack;
		case signup:
			return headerVariant.defaultWithBack;
		case chat:
			return headerVariant.chat;
		default:
			return headerVariant.default;

	}
}