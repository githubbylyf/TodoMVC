import React, { useContext, useState } from 'react';
import { todoContext } from './context-manager';

function List() {
    const {todo, refreshLocalTodo, hash} = useContext(todoContext);
    const [check, setCheck] = useState(false);

    function checkOrDelete(e) {
        switch(e.target.nodeName) {
            case 'INPUT':
                let checkindex = todo.findIndex(x => x.timeid == e.target.nextSibling.id);
                todo[checkindex].completed = !todo[checkindex].completed;
                refreshLocalTodo(todo);
                break;
            case 'BUTTON':
                let deleteindex = todo.findIndex(x => x.timeid == e.target.previousSibling.id);
                todo.splice(deleteindex, 1);
                refreshLocalTodo(todo);
                break;
        }
    }

    function deleteBlank(value) {
        value = value.replace(/\s{2,}/g,' ');
        value = value.replace(/(^\s)|(\s$)/g,'');
        return value;
    }

    function modify(e) {
        if(e.target.nodeName == 'LABEL') {
            e.target.setAttribute('contenteditable','true');
            e.target.focus();
            let index = todo.findIndex(x => x.timeid == e.target.id);

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
            }
            return newTodo;
        }
    }

    const handleChecked = (e) => {setCheck(e.target.checked)}

    let todos = newTodo().map((item) => 
            <div key={item.timeid}>
                <input type='checkbox' className='check' checked={item.completed} onChange={handleChecked}></input>
                <label id={item.timeid}>{item.content}</label>
                <button></button>
            </div>
        );

        return (<div id='todoall' onClick={checkOrDelete} onDoubleClick={modify}>{todos}</div>);
}

export default List;