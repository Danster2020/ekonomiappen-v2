import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./index.css"

import { GoogleOAuthProvider } from '@react-oauth/google';

import axios from 'axios';
import { AuthcontextProvider } from './context/authContext.jsx';

const g_client_id = process.env.VITE_GOOGLE_CLIENT_ID
const axios_base_url = process.env.VITE_AXIOS_BASE_URL
const host_port_backend = process.env.VITE_HOST_PORT_BACKEND

axios.defaults.baseURL = "http://localhost" + ":" + host_port_backend + "/api"; // without docker http://localhost:8081/api
axios.defaults.withCredentials = true;

console.log("Debug g_client_id:", g_client_id);
console.log("Debug axios_base_url:", axios_base_url);
console.log("Debug host_port_backend:", host_port_backend);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthcontextProvider>
      <GoogleOAuthProvider clientId={g_client_id}>
        <App />
      </GoogleOAuthProvider>;
    </AuthcontextProvider>
  </React.StrictMode>,
)
