import React, { Fragment, useEffect, useState } from "react";

import EditTodo from "./EditTodo";


const ListTodos = () => {

    const [todos, setTodos] = useState([]);

    const deleteTodo = async (id) => {
        try {
            await fetch(`/todos/${id}`, {
                method: "DELETE"
            });
            setTodos(todos.filter(todo => todo.todo_id !== id));
        } catch (err) {
            console.error(err.message);
        }
    };

    const getTodos = async () => {
        try {
            const response = await fetch("/todos");
            const jsonData = await response.json();
            setTodos(jsonData)
        } catch (err) {
            console.error(err.message);
        }
    };

    const saveTodosToS3 = async () => {
        try {
            const response = await fetch('/todos/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ todos: todos }),
            });
            const data = await response.json();
            console.log(data.message, data.s3Url);
        } catch (error) {
            console.error('Error saving todos to S3:', error);
        }
    };


    // useEffect makes a call to the backend to get all the todos when the component mounts
    useEffect(() => {
        getTodos();
    }, []);

    return (
        <Fragment>
            <table class="table mt-5 text-center">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo => (
                        <tr key={todo.todo_id}>
                            <td>{todo.description}</td>
                            <td><EditTodo todo={todo} /></td>
                            <td><button className="btn btn-danger" onClick={() => deleteTodo(todo.todo_id)}>Delete</button></td>
                        </tr>
                    ))}

                </tbody>
            </table>
            <button className="btn btn-info" onClick={() => saveTodosToS3()}>Save</button>
        </Fragment>
    );
}

export default ListTodos;