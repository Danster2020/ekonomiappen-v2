import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from "react-router-dom"
import axios from 'axios'
import { Footer } from './components/Footer'
import ItemForm from './components/ItemForm'

export const EditItem = () => {


    return (
        <>
            <ItemForm
                title={"Redigera"}
            />
            <Footer></Footer>
        </>
    )
}