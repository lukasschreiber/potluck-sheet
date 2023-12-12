import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom";
import './index.css'
import {AuthProvider} from "./hooks/useAuth.tsx";
import {ConfigProvider} from "./hooks/useConfig.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <ConfigProvider>
                <AuthProvider>
                    <App/>
                </AuthProvider>
            </ConfigProvider>
        </BrowserRouter>
    </React.StrictMode>,
)
