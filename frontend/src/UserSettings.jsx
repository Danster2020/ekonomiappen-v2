import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Footer } from './components/Footer'
import { useNavigate, useLocation } from 'react-router-dom'
import { Authcontext } from './context/authContext';
import Modal from './components/Modal'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserSlash } from '@fortawesome/free-solid-svg-icons'

export const UserSettings = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const state = useLocation().state
    const [modal, setModal] = useState(false);

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

    const handleDeleteUser = async () => {
        try {
            await axios.delete("/users/")
            handleLogOut()
        } catch (error) {
            console.log(error);
        }
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
                    <button className="button_1 w-full mt-4 bg-gray-500" onClick={handleLogOut}>Logga ut</button>
                    <button className="mt-20 text-red-500" onClick={() => setModal(true)}><FontAwesomeIcon icon={faUserSlash} className='mr-2' />Radera konto</button>
                    <Modal
                        openModal={modal}
                        closeModal={() => setModal(false)}
                        actionButton={handleDeleteUser}
                    >
                        Är du säker på att du vill avsluta ditt konto? Allt innehåll relaterat till ditt konto kommer raderas och kommer inte kunna återställas.
                    </Modal>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}
