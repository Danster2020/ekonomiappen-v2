import React, { useState } from 'react'
import { useNavigate, useLocation } from "react-router-dom"
import axios from 'axios'
import { Footer } from './components/Footer'
import ItemForm from './components/ItemForm'

export const EditItem = () => {

    const [item, setItem] = useState({
        name: "",
        user_id: 1, // TODO change to correct user
        price: null,
        description: ""
    })

    const navigate = useNavigate()
    const location = useLocation()

    const itemIdAndName = location.pathname.split("/")[2] + "/" + location.pathname.split("/")[3]

    console.log(itemIdAndName);

    const handleChange = (e) => (setItem((prev) => ({ ...prev, [e.target.name]: e.target.value })))


    const handleDelete = async (user_id, name) => {
        try {
            await axios.delete("http://localhost:8081/item/" + itemIdAndName)
            navigate("/")
        } catch (error) {
            console.log(error);
        }
    }


    const handleSubmit = async e => {
        e.preventDefault()
        try {
            await axios.put("http://localhost:8081/items", item)
            navigate("/")
        } catch (error) {
            console.log(error);
        }
    }
    console.log(item)

    return (
        <>
            <ItemForm title={"Redigera"} handleChange={handleChange} handleSubmit={handleSubmit}></ItemForm>
            <button onClick={handleDelete}>Delete</button>
            <Footer></Footer>
        </>
    )
}