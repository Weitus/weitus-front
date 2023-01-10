import React from 'react'
import s from "./TemplatePage.module.scss"
import {WeHeader} from "../../components/WeHeader";
import {WeAuthGate} from "../../components/WeAuthGate";

export const TemplatePage: React.FC<React.PropsWithChildren> = ({children}) => {

  return (
    <>
      <WeAuthGate>
        <WeHeader/>
        <div className={s.container}>
          {children}
        </div>
      </WeAuthGate>
    </>
  )
}
