// GlobalContext.js
import { createContext, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

export const GlobalContext = createContext();

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_ProjectID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
  };

const app = initializeApp(firebaseConfig);

export const GlobalProvider = ({ children }) => {
    let initialValue = {
        config: firebaseConfig,
        app: app,
        storage: getStorage(app),
        url: "",
        signUrl: ""
    }

    const [fireb, setFireb] = useState(initialValue);

    return (
        <GlobalContext.Provider value={{ fireb, setFireb }}>
            {children}
        </GlobalContext.Provider>
    );
};