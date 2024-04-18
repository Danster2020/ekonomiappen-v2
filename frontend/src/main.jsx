import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./index.css"

import { GoogleOAuthProvider } from '@react-oauth/google';

import axios from 'axios';
import { AuthcontextProvider } from './context/authContext.jsx';

axios.defaults.baseURL = 'http://localhost:8081/api';
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthcontextProvider>
      <GoogleOAuthProvider clientId="56915195244-vbr9li03tvp93javsac6tvshuirm7p9f.apps.googleusercontent.com"> {/* TODO change to .env in production */}
        <App />
      </GoogleOAuthProvider>;
    </AuthcontextProvider>
  </React.StrictMode>,
)
