// GlobalContext.js
import { createContext, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

export const GlobalContext = createContext();

const firebaseConfig = {
    apiKey: "AIzaSyCxd16GSMLEsatk40BYd8_kr67Ac57fick",
    authDomain: "mb-software-a20dc.firebaseapp.com",
    projectId: "mb-software-a20dc",
    storageBucket: "mb-software-a20dc.appspot.com",
    messagingSenderId: "903723238924",
    appId: "1:903723238924:web:1bbbfb6103fa376b6a9029",
    measurementId: "G-8JYXGN8FD3"
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