import React, { useState } from 'react'
import { useNavigate, useLocation, Link } from "react-router-dom"
import axios from 'axios'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

// used for dynamic icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

export default function ItemForm({ title }) {

    const navigate = useNavigate()
    const location = useLocation()

    const item_id = location.pathname.split("/")[2]

    const state = useLocation().state

    const [item, setItem] = useState({
        title: state?.title || "",
        price: state?.price || "",
        description: state?.description || "",
        icon: state?.icon || "dollar-sign"
    })

    const [iconMenu, setIconMenu] = useState(false)

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

    const iconNames = [
        "dollar-sign", "house-chimney", "building", "bolt", "lightbulb", "bath", "faucet-drip",
        "piggy-bank", "wallet", "receipt", "dumbbell", "tower-cell",
        "sim-card", "star", "cloud", "tv", "car", "train-subway",
        "bus", "plane", "cart-shopping", "shirt", "gas-pump", "utensils",
        "martini-glass", "music", "shield-halved", "gamepad",
        "newspaper", "dog", "cat", "paw", "heart-pulse", "pills",
        "tooth", "chart-line", "umbrella-beach", "anchor", "globe"
    ]

    const iconPicker = () => (
        <div className='flex flex-wrap gap-3 text-2xl bg-neutral-200 dark:bg-neutral-700 p-4 mt-2 rounded-md'>
            {iconNames.map((iconName) => (
                <button key={iconName} onClick={() => handleIconChange(iconName)} className=''>
                    <FontAwesomeIcon icon={iconName} className={`w-7 h-7 p-2 rounded-md ${item.icon === iconName && "bg-blue-300 dark:bg-blue-500"}`} />
                </button>
            ))}
        </div>
    )

    const handleIconChange = (iconName) => {
        setItem((prev) => ({ ...prev, icon: iconName }))
        setIconMenu(false)
    }

    const handleIconMenu = () => {
        setIconMenu(!iconMenu)
        console.log("iconMenu", iconMenu);
    }

    console.log("State: " + state?.title);

    const handleChange = (e) => (setItem((prev) => ({ ...prev, [e.target.name]: e.target.value })))


    return (
        <div className="flex justify-center mt-16 mb-16">
            <div className="custom_form px-4 py-8 max-w-md w-full rounded-lg shadow-xl dark:bg-def_dark_2">
                <h1 className="text-3xl mb-10">{title}</h1>
                <form className="grid grid-cols-1 gap-6 " id="item_form" onSubmit={handleFormSubmit}>
                    <div>
                        <label className='input_label' htmlFor="title">Titel</label>
                        <input name='title' id='title' type="text" value={state && item.title} className="input_w_full form-input" placeholder="T.ex. Hyra" onChange={handleChange} autoFocus />
                    </div>
                    <div>
                        <label className='input_label' htmlFor="price">Kostnad</label>
                        <input name='price' id='price' type="number" inputMode='decimal' value={state && item.price} className="input_w_small form-input" placeholder="T.ex. 200" onChange={handleChange} autoComplete='off' />
                    </div>
                    <div>
                        <label className='input_label' htmlFor="description">Beskrivning</label>
                        <textarea name='description' id='description' type="textarea" value={state && item.description} rows="10" cols="30" className="textarea form-textarea" placeholder="Skriv här..." onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <label className='input_label' htmlFor="icon">Ikon</label>
                        <button onClick={handleIconMenu} name='icon' className='flex items-center justify-center w-14 h-14 border-2 border-gray-400 dark:border-neutral-700 rounded-md'>
                            <FontAwesomeIcon icon={item.icon} className='text-2xl' />
                        </button>
                        {iconMenu && iconPicker()}
                    </div>

                    <div className="flex gap-4 mt-10">
                        {!state && <Link className="button_1 bg-gray-500" to="/">
                            Avbryt
                        </Link>}
                        {state && <button className="button_1 bg-red-700 dark:bg-red-900 hover:dark:bg-red-950" onClick={() => handleDelete()}><FontAwesomeIcon icon={faTrash} title="Radera" className='pr-2' />Radera</button>}
                        {!state && <button className="button_1 flex-grow bg-blue-700" onClick={handleCreate}>Lägg till</button>}
                        {state && <button className="button_1 flex-grow bg-blue-700" onClick={handleUpdate}>Spara</button>}
                    </div>
                </form>

            </div>
        </div>
    )
}
