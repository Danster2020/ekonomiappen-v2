import React, { useContext, useEffect, useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { Authcontext } from './context/authContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Footer } from './components/Footer';
import ItemForm from './components/ItemForm';

export const ExamplePage = () => {

    const expenses = 10000
    const income = 33000
    const balance = income - expenses
    const balance_text = balance.toLocaleString()

    return (
        <>
            {/* <h1>Exempelsida</h1> */}
            <div className="py-4 shadow-md dark:bg-def_dark_2 dark:text-white">
                <div className="flex flex-col items-center">
                    <h1 className="text-6xl md:text-8xl"> {expenses.toLocaleString()} </h1>
                    <p>Utgifter / mån</p>
                </div>
                <div className="flex justify-evenly pt-4">
                    <div className="text-center">
                        <h2 className="text-3xl md:text-4xl">{income}</h2>
                        <p>Inkomst</p>
                    </div>
                    <div className="text-center">
                        <h2 className={`text-3xl md:text-4xl ${balance >= 0 ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-400"}`}>{balance > 0 ? `+${balance_text}` : balance_text}</h2>
                        <p>Saldo</p>
                    </div>
                </div>
            </div>
            <ItemForm></ItemForm>
            <ItemForm></ItemForm>
            <Footer></Footer>
        </>
    );
};
