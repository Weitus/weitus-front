import React from "react";

export type WeInputProps = React.HTMLProps<HTMLInputElement> & {
	className?: string;
	variant?: "primary" | "chat";
};


