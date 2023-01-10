import React from 'react'
import s from "./HomePage.module.scss"
import {WeLinkButton} from "../../components/WeLinkButton";
import {PATHS} from "../../config/paths";
import {TemplatePage} from "../../templates/TemplatePage";
import {ReactComponent as Logo} from "assets/icons/favicon.svg";

export const HomePage: React.FC = () => {

    return (
        <TemplatePage>
            <Logo/>
            <div className={s.buttonContainer}>
                <WeLinkButton linkProps={{to: PATHS.login}}>Login</WeLinkButton>
                <WeLinkButton linkProps={{to: PATHS.chat}}>Chat without login in</WeLinkButton>
            </div>
        </TemplatePage>
    )
}
