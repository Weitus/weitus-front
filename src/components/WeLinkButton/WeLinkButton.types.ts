import {WeButtonProps} from "../WeButton";
import {LinkProps} from "react-router-dom";

export type WeLinkButtonProps = WeButtonProps & {
	linkProps: LinkProps
	buttonClassName?: string;
};


