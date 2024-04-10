import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import { Footer } from './components/Footer'
import ItemForm from './components/ItemForm'

export const CreateItem = () => {

    const [item, setItem] = useState({
        name: "",
        user_id: 1, // TODO change to correct user
        price: null,
        description: ""
    })

    const navigate = useNavigate()

    const handleChange = (e) => (setItem((prev) => ({ ...prev, [e.target.name]: e.target.value })))

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            await axios.post("http://localhost:8081/items", item)
            navigate("/")
        } catch (error) {
            console.log(error);
        }
    }
    console.log(item)

    return (
        <>
            <ItemForm title={"Lägg till"} handleChange={handleChange} handleSubmit={handleSubmit}></ItemForm>
            <Footer></Footer>
        </>
    )
}

{/* <div className="flex justify-center mt-8">
    <div className="custom_form px-4 py-8 max-w-md w-full rounded-lg shadow-xl">
        <h1 className="text-3xl mb-4">Lägg till</h1>
        <form className="grid grid-cols-1 gap-6" id="item_form" action="{{ url_for('new_item') }}" method="POST">
            <input name='name' type="text" className="input_w_full form-input" placeholder="T.ex. Hyra" onChange={handleChange} />
            <input name='price' type="number" className="input_w_small form-input" placeholder="T.ex. 200" onChange={handleChange} />
            <input name='description' type="textarea" rows="10" cols="30" className="textarea form-textarea" placeholder="Skriv här..." onChange={handleChange} />

            <div className="flex gap-4">
                <a className="button_1 bg-gray-500" href="/">
                    Avbryt
                </a>
                <button className="button_1 flex-grow bg-blue-700" onClick={handleSubmit}>Lägg till</button>
            </div>
        </form>
    </div>
</div> */}