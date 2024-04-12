import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Footer } from './components/Footer'
import { Link } from 'react-router-dom'

export const Home = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await axios.get("/items")
                setData(res.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchItems()
    }, [])

    const calcTotalExpenses = () => {
        let sum = 0;
        data.forEach(item => {
            sum += item.price;
        });
        return sum;
    }

    return (
        <>
            <div className="py-4 shadow-md">
                <div className="flex flex-col items-center">
                    <h1 className="text-6xl md:text-8xl"> {calcTotalExpenses()} </h1>
                    <p>Utgifter / mån</p>
                </div>
                <div className="flex justify-evenly pt-4">
                    <div className="text-center">
                        <h2 className="text-3xl md:text-4xl"> income </h2>
                        <p>Inkomst</p>
                    </div>
                    <div className="text-center">
                        {/* {% if capital_is_positive %} */}
                        <h2 className="text-3xl md:text-4xl text-green-700">+ capital </h2>
                        {/* {% else %} */}
                        <h2 className="text-3xl md:text-4xl text-red-700"> capital </h2>
                        {/* {% endif %} */}
                        <p>Saldo</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center px-4">
                {/* <form action="/" METHOD="POST">

        <details className="relative mt-4 w-screen max-w-md">
            <summary className="pl-4 text-lg pr-4 text-right appearance-none hover:cursor-pointer hover:text-gray-500 font-light">Sortera</summary>
            <ul className="absolute max-w-xs z-10 bg-white top-10 text-left right-0 py-2 rounded-xl shadow-lg">
                <li className=""><button className="p-2  text-blue-800 hover:text-gray-200" name="sort_by_button" value="price_dec" type="submit">{% if sort_items_by == 'price' and sort_items_reverse == true %} &#x2713; {% else %} &nbsp;&nbsp;&nbsp; {% endif %} Pris sjunkande</button></li>
                <li className=""><button className="p-2 text-blue-800 hover:text-gray-200" name="sort_by_button" value="price_asc" type="submit">{% if sort_items_by == 'price' and sort_items_reverse == false %} &#x2713; {% else %} &nbsp;&nbsp;&nbsp; {% endif %} Pris stigande</button></li>
            </ul>

        </details>
    </form> */}

                {/* {% for item in items | sort(attribute=sort_items_by, reverse=sort_items_reverse) %} */}


                {data.length > 0 && data.map((item, i) => (
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


            </div>
            <Footer></Footer>
        </>
    )
}
