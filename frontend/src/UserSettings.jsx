import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Footer } from './components/Footer'
import { useNavigate, useLocation } from 'react-router-dom'
import { Authcontext } from './context/authContext';

export const UserSettings = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const state = useLocation().state

    const [user, setUser] = useState({
        income: "",
    })

    const { logout, currentUser } = useContext(Authcontext)

    // fetch user items
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get("/users/")
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
            await axios.put("/users/", user)
            navigate("/")
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (e) => (setUser((prev) => ({ ...prev, [e.target.name]: e.target.value })))

    console.log(user);

    const handleLogOut = () => {
        logout()
        navigate("/login")
    }


    return (
        <>
            <div className="flex justify-center mt-8">
                <div className="custom_form px-4 py-8 max-w-md w-full rounded-lg shadow-xl">
                    <h1 className="text-3xl mb-4">Profil</h1>
                    <div className='flex flex-col items-center'>
                        <img className='w-32 border-4 border-blue-300 rounded-full' src={currentUser.picture} alt="user profile" />
                        <p className="text-lg font-semibold mt-4">{user.name}</p>
                    </div>
                    <form className="grid grid-cols-1 gap-6" id="item_form" onSubmit={handleFormSubmit}>
                        <div>
                            <label className='input_label' htmlFor="income">Inkomst</label>
                            <input name='income' id='income' className="input_w_full form-input" type='text' placeholder="T.ex. lön" value={user.income} onChange={handleChange} />
                        </div>
                        <button className="button_1 flex-grow bg-blue-700" value="Spara" onClick={handleUpdate}>Spara</button>
                    </form>
                    <button className="button_1 mt-4 bg-gray-500" href="/logout" onClick={handleLogOut}>Logga ut</button>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}
