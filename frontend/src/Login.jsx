import React, { useContext, useEffect, useState } from 'react'

import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Authcontext } from './context/authContext';
// import { hasGrantedAllScopesGoogle } from '@react-oauth/google';


export const Login = () => {

    const navigate = useNavigate()

    const sendUserToHomeScreen = () => {
        navigate("/")
    }

    const [userToken, setUserToken] = useState("")

    const { login } = useContext(Authcontext)

    useEffect(() => {
        console.log(userToken);
        if (userToken.length != 0) {
            login(userToken)
            sendUserToHomeScreen()
        }
    }, [userToken])

    return (
        <>
            <div className="flex justify-center mt-8">
                <div className="custom_form px-4 py-8 max-w-md w-full rounded-lg shadow-xl">
                    <h1 className="text-3xl mb-4">Logga in</h1>
                    <div className="flex gap-4">
                        <GoogleLogin
                            onSuccess={credentialResponse => {
                                setUserToken(credentialResponse)
                            }}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                        />
                    </div>
                    <p>Du loggar in på denna webbplatsen med ditt Google-konto. Webbplatsen kan se ditt namn, din e-postadress och din profilbild.
                        <a href="https://support.google.com/accounts/answer/3466521?p=app_full_access&hl=sv&visit_id=637775093561024322-2424480303&rd=1">Läs mer.</a></p>
                </div>
            </div>
        </>

    )
}
