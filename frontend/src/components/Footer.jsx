import React from 'react'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faPlus, faGear } from '@fortawesome/free-solid-svg-icons'

import { NavLink } from "react-router-dom";

export const Footer = () => {
    return (
        <footer className="footer z-40 dark:bg-def_dark_2 dark:text-white">
            <ul className="flex justify-evenly text-2xl">
                <li><NavLink to="/" activeclassname="active"><FontAwesomeIcon icon={faHome} title="Hem" /></NavLink></li>
                <li><NavLink to="/create_item" activeclassname="active"><FontAwesomeIcon icon={faPlus} title="Lägg till" /></NavLink></li>
                <li><NavLink to="/user_settings" activeclassname="active"><FontAwesomeIcon icon={faGear} title="Inställningar" /></NavLink></li >
            </ul >
        </footer >
    )
}

{/* <footer className="footer z-40">
    <ul className="flex justify-evenly text-2xl">
        <li><a href="/"><i className="fas fa-home {% if request.path == "/" %}active{% endif %}"></i></a></li>
        <li><a href="/new_item"><i className="fas fa-plus-circle {% if "/new_item" in request.path %}active{% endif %}"></i></a></li>
        <li><a href="/user_settings"><i className="fas fa-user {% if "/user_settings" in request.path %}active{% endif %}"></i></a></li >
    </ul >
</footer > */}
