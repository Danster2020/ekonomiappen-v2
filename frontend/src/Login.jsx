import React, { useContext, useEffect, useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { Authcontext } from './context/authContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

export const Login = () => {
    const { login, currentUser, loading } = useContext(Authcontext);
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser && !loading) {
            navigate("/");
        }
    }, [currentUser, loading, navigate]);

    const googleLogin = useGoogleLogin({
        onSuccess: response => {
            login(response);
        },
        flow: 'auth-code',
    });

    const handleLoginUser = async () => {
        try {
            googleLogin();
        } catch (error) {
            console.error('Error during login', error);
        }
    };

    return (
        <div className="flex justify-center mt-8">
            <div className="custom_form px-4 py-8 max-w-md w-full rounded-lg shadow-xl dark:bg-def_dark_2">
                <h1 className="text-3xl mb-4">Logga in</h1>
                <div className="flex gap-4">
                    <button className='text-lg bg-blue-700 hover:bg-blue-800 text-white px-4 py-5 rounded-xl mb-2' onClick={handleLoginUser}>
                        <FontAwesomeIcon icon={faGoogle} className='mr-2 text-white' />
                        Logga in med Google
                    </button>
                </div>
                <p>Du loggar in på denna webbplatsen med ditt Google-konto. Webbplatsen kan se ditt namn, din e-postadress och din profilbild.
                    <a className='text-blue-700' href="https://support.google.com/accounts/answer/3466521?p=app_full_access&hl=sv&visit_id=637775093561024322-2424480303&rd=1"> Läs mer.</a>
                </p>
            </div>
        </div>
    );
};
