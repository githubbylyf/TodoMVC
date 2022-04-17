import React, { useContext } from 'react';
import { todoContext } from './context-manager';

function Filter() {
    const {todo, refreshLocalTodo, hash, setHash} = useContext(todoContext);

    function todoCount(){
        for(var i=0, n=0, m=0; i<todo.length; ++i){
            if(!todo[i].completed){
                m = ++n;
            }
        }

        let countTodo = null;
        if(m == 1){
            countTodo = `${m} item left`;
        }else{
            countTodo = `${m} items left`;
        }

        return countTodo;
    }

    function dataFliter(e) {
        switch(e.target.textContent) {
            case 'All':
                setHash('#1');
                break;
            case 'Active':
                setHash('#2');
                break;
            case 'Completed':
                setHash('#3');
                break;
            case 'Clear completed':
                let arr = [];
                for(let i=0; i<todo.length; ++i){
                    if(!todo[i].completed){
                        arr.push(todo[i]);
                    }
                }
                refreshLocalTodo(arr);
                break;
        }
    }
    
    function initialButton(hash, value) {
        switch(value) {
            case hash:
                return 'click'
            default:
                return 'noclick';
        }
    }

    function hideOrNot() {
        if(todo.some(x => x.completed == true)) {
            return 'show';
        }else {
            return 'hide';
        }
    }

    if(todo.length == 0) {
        return null;
    } else {
        return (
            <div id='foot' onClick={dataFliter}>
                <div id='left'>{todoCount()}</div>
                <div id='center'>
                    <div id='p1' className={initialButton(hash,'#1')}><a href='http://localhost:3000/#1'>All</a></div>
                    <div id='p2' className={initialButton(hash,'#2')}><a href='http://localhost:3000/#2'>Active</a></div>
                    <div id='p3' className={initialButton(hash,"#3")}><a href='http://localhost:3000/#3'>Completed</a></div>
                </div>
                <div id='right' className={hideOrNot()}>Clear completed</div>
            </div>
        );
    }
}

export default Filter;