import React, { useState } from 'react'
import { useNavigate, useLocation, Link } from "react-router-dom"
import axios from 'axios'

export default function ItemForm({ title, handleChange, handleSubmit }) {

    const navigate = useNavigate()
    const location = useLocation()

    const item_id = location.pathname.split("/")[2]

    const handleFormSubmit = (e) => {
        e.preventDefault()
    }

    const handleDelete = async () => {
        try {
            await axios.delete("/items/" + item_id)
            navigate("/")
        } catch (error) {
            console.log(error);
            console.log("testID " + id);
        }
    }

    const handleUpdate = async () => {
        try {
            await axios.put("/items/" + item_id, item)
            navigate("/")
        } catch (error) {
            console.log(error);
        }
    }

    const state = useLocation().state

    const [item, setItem] = useState({
        name: state?.name || "",
        user_id: 1, // TODO change to correct user
        price: state?.price || null,
        description: state?.description || ""
    })

    console.log("State: " + state?.name);

    const handleChange2 = (e) => (setItem((prev) => ({ ...prev, [e.target.name]: e.target.value })))


    return (
        <div className="flex justify-center mt-8">
            <div className="custom_form px-4 py-8 max-w-md w-full rounded-lg shadow-xl">
                <h1 className="text-3xl mb-4">{title}</h1>
                <form className="grid grid-cols-1 gap-6" id="item_form" onSubmit={handleFormSubmit}>

                    <input name='name' type="text" value={item.name} className="input_w_full form-input" placeholder="T.ex. Hyra" onChange={handleChange2} />
                    <input name='price' type="number" value={item.price} className="input_w_small form-input" placeholder="T.ex. 200" onChange={handleChange2} />
                    <input name='description' type="textarea" value={item.description} rows="10" cols="30" className="textarea form-textarea" placeholder="Skriv här..." onChange={handleChange2} />

                    <div className="flex gap-4">
                        <Link className="button_1 bg-gray-500" to="/">
                            Avbryt
                        </Link>
                        {/* <input className="button_1 flex-grow bg-blue-700" type="submit" value="Lägg till" /> */}
                        {handleSubmit != null && <button className="button_1 flex-grow bg-blue-700" onClick={handleSubmit}>Lägg till</button>}
                        <button className="button_1 flex-grow bg-blue-700" onClick={handleUpdate}>Spara</button>
                        <button onClick={() => handleDelete()}>Delete</button>

                    </div>
                </form>

            </div>
        </div>
    )
}
