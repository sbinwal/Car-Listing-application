'use client'
import { Provider } from "react-redux"
import React from "react"
import appStore from "./utils/appStore"



export default function Providers({children}){

    return (
        <Provider store={appStore}>
            {children}
        </Provider>
    )
}