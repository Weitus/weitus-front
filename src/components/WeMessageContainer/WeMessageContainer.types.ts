type message = {
	text: string;
	time: string;
	isFromBot: boolean;
	link?: {
		href: string;
		text: string;
	};
}

export type WeMessageContainerProps = {
	message: message;
};


