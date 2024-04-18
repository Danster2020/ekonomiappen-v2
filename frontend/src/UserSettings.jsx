import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Footer } from './components/Footer'
import { useNavigate, useLocation } from 'react-router-dom'

import { googleLogout } from '@react-oauth/google';
import { Authcontext } from './context/authContext';

export const UserSettings = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const state = useLocation().state

    const [user, setUser] = useState({
        income: "",
    })

    const { logout } = useContext(Authcontext)

    // fetch user items
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get("/users/" + 1) // TODO change to real id
                setUser(res.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchUser()
    }, [])

    // used to prevent default form behaviour
    const handleFormSubmit = (e) => {
        e.preventDefault()
    }

    const handleUpdate = async () => {
        try {
            await axios.put("/users/" + user.id, user)
            navigate("/")
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (e) => (setUser((prev) => ({ ...prev, [e.target.name]: e.target.value })))

    console.log(user);

    const handleLogOut = () => {
        googleLogout()
        logout()
        // navigate("/login")
    }


    return (
        <>
            <div className="flex justify-center mt-8">
                <div className="custom_form px-4 py-8 max-w-md w-full rounded-lg shadow-xl">
                    <h1 className="text-3xl mb-4">Profil</h1>
                    <p className="mb-5">Inloggad som: {user.name}</p>
                    <form className="grid grid-cols-1 gap-6" id="item_form" onSubmit={handleFormSubmit}>

                        {/* {{ render_field(form.income, className_="input_w_full form-input", placeholder="T.ex. lön") } */}

                        <input name='income' className="input_w_full form-input" type='text' placeholder="T.ex. lön" value={user.income} onChange={handleChange} />

                        <button className="button_1 flex-grow bg-blue-700" value="Spara" onClick={handleUpdate}>Spara</button>

                        {/* {{ form.csrf_token }} */}

                        {/* {{ render_field(form.income, className_="input_w_full form-input", placeholder="T.ex. lön") }} */}

                        {/* <input className="button_1 flex-grow bg-blue-700" type="submit" value="Spara"> */}
                    </form>
                    <button className="button_1 mt-4 bg-gray-500" href="/logout" onClick={handleLogOut}>Logga ut</button>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}
