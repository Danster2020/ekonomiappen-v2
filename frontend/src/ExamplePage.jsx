import React, { useContext, useEffect, useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { Authcontext } from './context/authContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Footer } from './components/Footer';
import ItemForm from './components/ItemForm';

export const ExamplePage = () => {


    return (
        <>
            <h1>Exempelsida</h1>
            <ItemForm></ItemForm>
            <Footer></Footer>
        </>
    );
};
