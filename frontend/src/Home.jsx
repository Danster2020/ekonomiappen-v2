import React, { useContext, useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { Footer } from './components/Footer'
import { Link } from 'react-router-dom'
import { Authcontext } from './context/authContext'
import { Spinner } from './components/Spinner'
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faArrowDown } from '@fortawesome/free-solid-svg-icons'

import toast, { Toaster } from 'react-hot-toast';

export const Home = () => {

    const [items, setData] = useState([]);
    const [sortingOrder, setSortingOrder] = useState("");
    const [user, setUser] = useState({
        income: "",
    });
    const { currentUser } = useContext(Authcontext);
    const [loading, setLoading] = useState(true); // Add loading state

    // Fetch user items and preferences after successful login
    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            try {
                const userResponse = await axios.get("/users/");
                setUser(userResponse.data);

                const itemResponse = await axios.get("/items");
                setData(itemResponse.data);

                const prefResponse = await axios.get("/item_pref/");
                setSortingOrder(prefResponse.data.sort_by);

                setLoading(false);
            } catch (error) {
                const err_msg = "Error fetching user data"
                console.error(err_msg, error);
                toast.error("Något gick fel")
            }
        };

        // Check if currentUser is not null (user is logged in)
        if (currentUser) {
            fetchUserData();
        }
    }, [currentUser]);

    // Function to sort items based on sorting order
    const sortItems = (items) => {
        return items.slice().sort((a, b) => {
            switch (sortingOrder) {
                case "price_desc":
                    return b.price - a.price;
                case "price_asc":
                    return a.price - b.price;
                default:
                    return 0;
            }
        });
    };

    // Memoize sorted items to avoid unnecessary re-rendering
    const sortedItems = useMemo(() => sortItems(items), [items, sortingOrder]);

    // Handle sorting order change
    const handleSortingChange = async (e) => {
        const newSortingOrder = e.target.value;
        setSortingOrder(newSortingOrder);
        try {
            await axios.put("/item_pref/", { sort_by: newSortingOrder });
        } catch (error) {
            console.error("Error updating sorting order:", error);
        }
    };

    // Calculate total expenses
    const calcTotalExpenses = () => {
        return items.reduce((total, item) => total + item.price, 0);
    };

    // Calculate balance
    const calcBalance = () => {
        return user.income - calcTotalExpenses();
    };

    // Render income content
    const incomeContent = () => {
        const balance = parseInt(calcBalance().toFixed(2));
        const balance_text = balance.toLocaleString();
        return (
            <div className="text-center">
                <h2 className={`text-3xl md:text-4xl ${balance >= 0 ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-400"}`}>{balance > 0 ? `+${balance_text}` : balance_text}</h2>
                <p>Saldo</p>
            </div>
        );
    };

    return (
        <>
            <Toaster position="top-right" />
            <div className="py-4 shadow-md dark:bg-def_dark_2 dark:text-white">
                <div className="flex flex-col items-center">
                    <h1 className="text-6xl md:text-8xl"> {calcTotalExpenses().toLocaleString()} </h1>
                    <p>Utgifter / mån</p>
                </div>
                <div className="flex justify-evenly pt-4">
                    <div className="text-center">
                        <h2 className="text-3xl md:text-4xl">{user.income.toLocaleString()}</h2>
                        <p>Inkomst</p>
                    </div>
                    {incomeContent()}
                </div>
            </div>

            {loading ? (
                <div className='flex flex-col items-center px-4 pb-20'>
                    <div className='mt-32'>
                        <Spinner></Spinner>

                    </div>
                </div>
            ) : (
                <motion.div className="flex flex-col items-center px-4 pb-20 " initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 160,
                        damping: 50
                    }}>

                    <div className='mt-4 w-screen max-w-md flex'>
                        <div className='mx-4'>
                            <FontAwesomeIcon icon={faFilter} className='mr-2 text-gray-700' />
                            <select name="sorting" className="px-4 py-2 rounded-xl bg-blue-50 border-2 border-blue-100 dark:border-neutral-700 dark:bg-def_dark_1 dark:text-white" value={sortingOrder} onChange={handleSortingChange}>
                                <option value="price_desc">Pris sjunkande</option>
                                <option value="price_asc">Pris stigande</option>
                            </select>
                        </div>
                    </div>

                    {items.length > 0 ? sortedItems?.map((item, i) => (
                        <Link key={i} to={`/edit_item/${item.id}`} state={item}
                            className="flex justify-between items-center w-full max-w-md p-4 mt-8 bg-blue-900 rounded-2xl shadow-sm animate__animated animate__zoomIn hover:bg-gray-800">
                            <div className="text-white truncate">
                                <h3 className="inline text-3xl">{item.title}</h3>
                                <p className="mt-3 text-4xl">{item.price.toLocaleString()} kr</p>
                            </div>
                            <div>
                                <div className="h-20 w-20 bg-white dark:bg-def_dark_2 rounded-2xl"></div>
                            </div>
                        </Link>
                    )) :
                        <div className='flex flex-col mt-40'>
                            <h2 className='text-2xl text-center text-def_blue_2'>Inga utgifter skapade</h2>
                            <p className='text-gray-600'>Tryck på pluset nedan för att lägga till en utgift.</p>
                            <FontAwesomeIcon icon={faArrowDown} className='text-7xl mt-10 text-def_blue_2' />
                        </div>}


                </motion.div>
            )}


            <Footer></Footer>
        </>
    );
};
