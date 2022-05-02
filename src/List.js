import React, { useContext, useState } from 'react';
import { todoContext } from './context-manager';

function List() {
    const {todo, refreshLocalTodo, hash} = useContext(todoContext);

    const [editingId, setEdtingId] = useState('');

    function checkTodo(id) {
        let checkindex = todo.findIndex(item => item.timeid === id);
        todo[checkindex].completed = !todo[checkindex].completed;
        refreshLocalTodo(todo);
    }

    function deleteTodo(id) {
        let arr = todo.filter(item => item.timeid !== id);
        refreshLocalTodo(arr);
    }

    function deleteBlank(value) {
        value = value.replace(/\s{2,}/g,' ');
        value = value.replace(/(^\s)|(\s$)/g,'');
        return value;
    }

    function modify(e, id) {
        setEdtingId(id);

        setTimeout(() => {
            e.target.focus();
        },0);

        let selection = window.getSelection();
        selection.selectAllChildren(e.target);
        selection.collapseToEnd();
    }

    function blur(e, id){
        let index = todo.findIndex(item => item.timeid === id);

        if(deleteBlank(e.target.textContent)){
            todo[index].content = deleteBlank(e.target.textContent);
        } else {
            todo.splice(index, 1);
        }

        refreshLocalTodo(todo);
        setEdtingId('');
    }

    function keyDown(e, id) {
        if(e.code ==='Enter'){
            e.target.blur(e, id);
        }
    }

    let newTodo = () => {
        if(todo) {
            var newTodo;
            switch(hash) {
                case '#1':
                    newTodo = todo;
                    break;
                case '#2':
                    newTodo = todo.filter(item => item.completed === false);
                    break;
                case '#3':
                    newTodo = todo.filter(item => item.completed === true);
                    break;
                default:
                    break;
            }
            return newTodo;
        }
    }

    let todos = newTodo().map((item) => 
            <div key={item.timeid}>
                <input type='checkbox' checked={item.completed} onChange={()=>checkTodo(item.timeid)}></input>
                <label contentEditable={editingId === item.timeid ? true : false} suppressContentEditableWarning onDoubleClick={(e)=>modify(e, item.timeid)} onBlur={(e)=>blur(e, item.timeid)} onKeyDown={(e)=>keyDown(e, item.timeid)}>{item.content}</label>
                <button onClick={()=>deleteTodo(item.timeid)}></button>
            </div>
        );

        return (<div id='todoall'>{todos}</div>);
}

export default List;