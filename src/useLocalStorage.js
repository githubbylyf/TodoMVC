import { useEffect, useState } from "react";

function useLocalStorage(key) {
    const [store, setStore] = useState([]);

    useEffect(() => {
        const todos = JSON.parse(localStorage.getItem(key));
            
        if(todos === null) {
            localStorage.setItem(key, JSON.stringify([]));
        } else {
            setStore(todos);
        }
    },[]);

    let refreshLocalStore = (value) => localStorage.setItem(key,JSON.stringify(value));

    return [store, setStore, refreshLocalStore];
}

export default useLocalStorage;