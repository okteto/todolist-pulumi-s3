// build a react component to input a todo item

import React, { Fragment, useState } from "react";

const InputTodo = () => {
    const [description, setDescription] = useState("");
    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { description };
            await fetch("/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <Fragment>
            <h1 className="title">
                Okte<span>todo</span>
            </h1>
            <form className="app-add" onSubmit={onSubmitForm}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="What should I do today?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button className="submit-button">Add</button>
            </form>
        </Fragment>
    );
};

export default InputTodo;
