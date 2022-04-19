import React, { useContext } from 'react';
import { todoContext } from './context-manager';

function List() {
    const {todo, refreshLocalTodo, hash} = useContext(todoContext);

    function checkTodo(e) {
        let checkindex = todo.findIndex(x => x.timeid - e.target.nextSibling.id === 0);
        todo[checkindex].completed = !todo[checkindex].completed;
        refreshLocalTodo(todo);
    }

    function deleteTodo(e) {
        let deleteindex = todo.findIndex(x => x.timeid - e.target.previousSibling.id === 0);
        todo.splice(deleteindex, 1);
        refreshLocalTodo(todo);
    }

    function deleteBlank(value) {
        value = value.replace(/\s{2,}/g,' ');
        value = value.replace(/(^\s)|(\s$)/g,'');
        return value;
    }

    function modify(e) {
        e.target.setAttribute('contenteditable','true');
        e.target.focus();
        let index = todo.findIndex(x => x.timeid === e.target.id);

        function blur(){
            if(deleteBlank(e.target.textContent)){
                e.target.textContent = deleteBlank(e.target.textContent);
                todo[index].content = e.target.textContent;
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
                    let arr2 = [];
                    for(let i=0; i<todo.length; ++i){
                        if(!todo[i].completed){
                            arr2.push(todo[i]);
                        }
                    }
                    newTodo = arr2;
                    break;
                case '#3':
                    let arr3 = [];
                    for(let i=0; i<todo.length; ++i){
                        if(todo[i].completed){
                            arr3.push(todo[i]);
                        }
                    }
                    newTodo = arr3;
                    break;
                default:
                    break;
            }
            return newTodo;
        }
    }

    let todos = newTodo().map((item) => 
            <div key={item.timeid}>
                <input type='checkbox' className='check' checked={item.completed} onChange={checkTodo}></input>
                <label id={item.timeid} onDoubleClick={modify}>{item.content}</label>
                <button onClick={deleteTodo}></button>
            </div>
        );

        return (<div id='todoall'>{todos}</div>);
}

export default List;