import React, { useState } from 'react'
import { useNavigate, useLocation, Link } from "react-router-dom"
import axios from 'axios'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export default function ItemForm({ title }) {

    const navigate = useNavigate()
    const location = useLocation()

    const item_id = location.pathname.split("/")[2]

    const state = useLocation().state

    const [item, setItem] = useState({
        title: state?.title || "",
        price: state?.price || "",
        description: state?.description || ""
    })

    // used to prevent default form behaviour
    const handleFormSubmit = (e) => {
        e.preventDefault()
    }

    const handleCreate = async e => {
        e.preventDefault()
        try {
            await axios.post("/items/add", item)
            navigate("/")
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async () => {
        try {
            await axios.delete("/items/" + item_id, {
                withCredentials: true // Include cookies in the request
            });
            navigate("/")
        } catch (error) {
            console.log(error);
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


    console.log("State: " + state?.title);

    const handleChange = (e) => (setItem((prev) => ({ ...prev, [e.target.name]: e.target.value })))


    return (
        <div className="flex justify-center mt-8">
            <div className="custom_form px-4 py-8 max-w-md w-full rounded-lg shadow-xl">
                <h1 className="text-3xl mb-4">{title}</h1>
                <form className="grid grid-cols-1 gap-6" id="item_form" onSubmit={handleFormSubmit}>
                    <div>
                        <label className='input_label' htmlFor="title">Inkomst</label>
                        <input name='title' id='title' type="text" value={state && item.title} className="input_w_full form-input" placeholder="T.ex. Hyra" onChange={handleChange} />
                    </div>
                    <div>
                        <label className='input_label' htmlFor="price">Kostnad</label>
                        <input name='price' id='price' type="number" value={state && item.price} className="input_w_small form-input" placeholder="T.ex. 200" onChange={handleChange} autoComplete='off' />
                    </div>
                    <div>
                        <label className='input_label' htmlFor="description">Beskrivning</label>
                        <textarea name='description' id='description' type="textarea" value={state && item.description} rows="10" cols="30" className="textarea form-textarea" placeholder="Skriv här..." onChange={handleChange}></textarea>
                    </div>


                    <div className="flex gap-4">
                        {!state && <Link className="button_1 bg-gray-500" to="/">
                            Avbryt
                        </Link>}
                        {state && <button className='button_1 bg-red-600' onClick={() => handleDelete()}><FontAwesomeIcon icon={faTrash} title="Radera" className='pr-2' />Radera</button>}
                        {!state && <button className="button_1 flex-grow bg-blue-700" onClick={handleCreate}>Lägg till</button>}
                        {state && <button className="button_1 flex-grow bg-blue-700" onClick={handleUpdate}>Spara</button>}

                    </div>
                </form>

            </div>
        </div>
    )
}
