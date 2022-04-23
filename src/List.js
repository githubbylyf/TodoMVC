import React, { useContext } from 'react';
import { todoContext } from './context-manager';

function List() {
    const {todo, refreshLocalTodo, hash} = useContext(todoContext);

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
        e.target.setAttribute('contenteditable','true');
        e.target.focus();
        let index = todo.findIndex(item => item.timeid === id);

        function blur(){
            if(deleteBlank(e.target.textContent)){
                todo[index].content = deleteBlank(e.target.textContent);
            } else {
                todo.splice(index, 1);
            }
            refreshLocalTodo(todo);
            e.target.removeAttribute('contenteditable');
        }

        e.target.onblur = blur;

        e.target.onkeydown = function(kde){
            if(kde.code ==='Enter'){
                e.target.blur();
            }
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
                <input type='checkbox' className='check' checked={item.completed} onChange={()=>checkTodo(item.timeid)}></input>
                <label onDoubleClick={(e)=>modify(e, item.timeid)}>{item.content}</label>
                <button onClick={()=>deleteTodo(item.timeid)}></button>
            </div>
        );

        return (<div id='todoall'>{todos}</div>);
}

export default List;