import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Loading from './components/Loading';
import {LoadingProvider} from 'react-hook-loading'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <LoadingProvider loading={<Loading />}>
            <App />
        </LoadingProvider>
    </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
