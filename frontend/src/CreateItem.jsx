import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import { Footer } from './components/Footer'
import ItemForm from './components/ItemForm'

export const CreateItem = () => {

    return (
        <>
            <ItemForm title={"Lägg till"}></ItemForm>
            <Footer></Footer>
        </>
    )
}
