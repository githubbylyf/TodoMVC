import React, { useState, useEffect } from 'react';
import Input from './Input';
import List from './List';
import Filter from './Filter';
import useLocalStorage from './useLocalStorage';
import { todoContext } from './context-manager';

function App() {
  const [todo, setTodo, refreshLocalTodo] = useLocalStorage('todoStore');

  let initial = window.location.hash ? window.location.hash : "#1";
    
  const [hash, setHash] = useState(initial);

  useEffect(() => {
    let originalSetItem = localStorage.setItem;
            
    localStorage.setItem = function(key,newValue) {
      let setEvent = new Event('setItem');
      setEvent.setKey = key;
      setEvent.setValue = newValue;
      window.dispatchEvent(setEvent);
      originalSetItem.apply(this,arguments);
    }
            
    window.addEventListener('setItem',setTodoItem);

    function setTodoItem() {
      setTimeout(() => {
        let newTodo = JSON.parse(localStorage.getItem('todoStore'));
        setTodo(newTodo);
      }, 0);
    }

    window.addEventListener('setItem',setTodoItem);

    return () => {
      window.removeEventListener('setItem',setTodoItem);
    }
  },[]);

  return (
    <todoContext.Provider value={{todo, refreshLocalTodo, hash, setHash}}>
      <Input />
      <List />
      <Filter />
    </todoContext.Provider>
  );
}

export default App;