import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./index.css"

import { GoogleOAuthProvider } from '@react-oauth/google';

import axios from 'axios';
import { AuthcontextProvider } from './context/authContext.jsx';

axios.defaults.baseURL = 'http://localhost:8081/api';
axios.defaults.withCredentials = true;

console.log("Debug g_client_id:", import.meta.env.VITE_GOOGLE_CLIENT_ID);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthcontextProvider>
      <GoogleOAuthProvider clientId={process.env.VITE_GOOGLE_CLIENT_ID}>
        {/* <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}> */}
        <App />
      </GoogleOAuthProvider>;
    </AuthcontextProvider>
  </React.StrictMode>,
)
