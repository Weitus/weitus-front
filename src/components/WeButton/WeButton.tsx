import React from 'react'
import s from "./WeButton.module.scss"
import {WeButtonProps} from "./WeButton.types";
import clsx from "clsx";

export const WeButton: React.FC<WeButtonProps> = (
    {
        children,
        className,
        variant = "default",
        ...props
    }
) => {
    return (
        <button className={clsx(
            className,
            s.container,
            s["variant-" + variant],
        )}>
            {children}
        </button>
    )
}
