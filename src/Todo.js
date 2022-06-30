import React from 'react'

export default function Todo({todo, toggleTodo}) {
    function handleTodoClick(){
        toggleTodo(todo.id);
    }

    const styleClass = {
        fontWeight: 300
    };
    return (
        <div>
            <label style={styleClass}>
                <input type="checkbox" checked={todo.complete} onChange= {handleTodoClick}/>
                {todo.name}
            </label>
        </div>
    )
}
