import React from "react";

export type WeIconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	className?: string;
	theme?: "primary" | "transparent";
	icon: React.ReactNode;
};


