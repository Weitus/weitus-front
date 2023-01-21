import React from 'react'
import s from "./WeTypingIndicator.module.scss"
import {WeTypingIndicatorProps} from "./WeTypingIndicator.types";

export const WeTypingIndicator: React.FC<WeTypingIndicatorProps> = () => {
    return (
        <div className={s.messageBox}>
            <div className={s.ticontainer}>
                <div className={s.tiblock}>
                    <div className={s.tidot}></div>
                    <div className={s.tidot}></div>
                    <div className={s.tidot}></div>
                </div>
            </div>
        </div>
    )
}
