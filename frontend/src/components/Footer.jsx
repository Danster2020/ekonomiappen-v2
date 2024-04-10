import React from 'react'
import { Link } from 'react-router-dom'

export const Footer = () => {
    return (
        <footer className="footer z-40">
            <ul className="flex justify-evenly text-2xl">
                <li><Link to="/">Home<i className="fas fa-home "></i></Link></li>
                <li><Link to="/create_item" >Add<i className="fas fa-plus-circle "></i></Link></li>
                <li><Link to="/user_settings" >Settings<i className="fas fa-user "></i></Link></li >
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
