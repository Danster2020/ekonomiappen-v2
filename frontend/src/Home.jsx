import React, { useContext, useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { Footer } from './components/Footer'
import { Link } from 'react-router-dom'
import { Authcontext } from './context/authContext'
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'

export const Home = () => {

    const navigate = useNavigate()

    const [items, setData] = useState([]);
    const [sortingOrder, setSortingOrder] = useState("");
    const [user, setUser] = useState({
        income: "",
    });
    const { currentUser } = useContext(Authcontext);

    // Fetch user items and preferences after successful login
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userResponse = await axios.get("/users/" + null); // TODO: Change to real user ID
                setUser(userResponse.data);

                const itemResponse = await axios.get("/items");
                setData(itemResponse.data);

                const prefResponse = await axios.get("/item_pref/" + 1); // TODO: Change to real user ID
                setSortingOrder(prefResponse.data.sort_by);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        // Check if currentUser is not null (user is logged in)
        if (currentUser) {
            fetchUserData();
        } else {
            navigate("/login")
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
            await axios.put("/item_pref/" + 1, { sort_by: newSortingOrder }); // TODO: Change to real user ID
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
        const balance = calcBalance().toFixed(2);
        return (
            <div className="text-center">
                <h2 className={`text-3xl md:text-4xl ${balance > 0 ? "text-green-700" : "text-red-700"}`}>{balance > 0 ? `+${balance}` : balance}</h2>
                <p>Saldo</p>
            </div>
        );
    };

    return (
        <>
            <div className="py-4 shadow-md">
                <div className="flex flex-col items-center">
                    <h1 className="text-6xl md:text-8xl"> {calcTotalExpenses()} </h1>
                    <p>Utgifter / mån</p>
                </div>
                <div className="flex justify-evenly pt-4">
                    <div className="text-center">
                        <h2 className="text-3xl md:text-4xl">{user.income}</h2>
                        <p>Inkomst</p>
                    </div>
                    {incomeContent()}
                </div>
            </div>

            <motion.div className="flex flex-col items-center px-4" initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 160,
                    damping: 50
                }}>

                <div className='mt-4 w-screen max-w-md flex'>
                    <div>
                        <FontAwesomeIcon icon={faFilter} className='mr-2 text-gray-700' />
                        <select name="sorting" className="px-4 py-2 rounded-xl bg-blue-50 border-2 border-blue-100" value={sortingOrder} onChange={handleSortingChange}>
                            <option value="price_desc">Pris sjunkande</option>
                            <option value="price_asc">Pris stigande</option>
                        </select>
                    </div>
                </div>

                {items.length > 0 && sortedItems?.map((item, i) => (
                    <Link key={i} to={`/edit_item/${item.id}`} state={item}
                        className="flex justify-between items-center w-full max-w-md p-4 mt-8 bg-blue-900 rounded-2xl shadow-sm animate__animated animate__zoomIn hover:bg-gray-800">
                        <div className="text-white truncate">
                            <h3 className="inline text-3xl">{item.title}</h3>
                            <p className="mt-3 text-4xl">{item.price} kr</p>
                        </div>
                        <div>
                            <div className="h-20 w-20 bg-white rounded-2xl"></div>
                        </div>


                    </Link>
                ))}


            </motion.div>

            <Footer></Footer>

        </>
    );
};
