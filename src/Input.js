import React, { useContext } from 'react';
import { todoContext } from './context-manager';

function Input() {
    const {todo, refreshLocalTodo} = useContext(todoContext);

    function deleteBlank(value) {
        value = value.replace(/\s{2,}/g,' ');
        value = value.replace(/(^\s)|(\s$)/g,'');
        return value;
    }
    
    function inputContent(e) {
        if(e.code === 'Enter' && deleteBlank(e.target.value)) {
            let todoItem = {
                content: deleteBlank(e.target.value),
                completed: false,
                timeid: Date.now()
            }
            
            todo.push(todoItem);

            refreshLocalTodo(todo);
            
            e.target.value = '';
        }
    }

    function allChoose(e) {
        if(todo.some(x => x.completed == false)){
            for(let i=0; i<todo.length; ++i){
                if(!todo[i].completed){
                    todo[i].completed = !todo[i].completed;
                }
                e.target.setAttribute('class','allchoose');
            }
        }else{
            for(let i=0; i<todo.length; ++i){
                todo[i].completed = !todo[i].completed;
            }
            e.target.setAttribute('class','allunchoose');
        }

        refreshLocalTodo(todo);
    }

    function initialButton() {
        if(todo.length == 0) {
            return 'hidden';
        } else {
            if (todo.some(x => x.completed == false)) {
                return 'allunchoose';
            } else {
                return 'allchoose';
            }
        }
    }

    return (
        <div id='top'>
            <button className={initialButton()} onClick={allChoose}></button>
            <input
                id='todo'
                type='text'
                placeholder='What needs to be done?'
                onKeyDown={inputContent}
                autoComplete='off'
            ></input>
        </div>
    );
}

export default Input;