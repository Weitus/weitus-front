import React from "react";

export type WeButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	className?: string;
	variant?: "default" | "small";
};


