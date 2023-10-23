import React, { Fragment, useState } from "react";

const EditTodo = ({ todo }) => {
    const [description, setDescription] = useState(todo.description);
    const [modalState, setModalState] = useState("closed");

    const updateDescription = async (e) => {
        e.preventDefault();
        try {
            const body = { description };
            await fetch(`/todos/${todo.todo_id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    };

    const openModal = () => setModalState("open");

    const closeModal = () => {
        setModalState("closed");
        setDescription(todo.description);
    };

    return (
        <Fragment>
            <button
                type="button"
                className="submit-button submit-button-small edit"
                data-toggle="modal"
                data-target={`#id${todo.todo_id}`}
                onClick={openModal}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-pencil"
                >
                    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                    <path d="m15 5 4 4" />
                </svg>
            </button>

            <div
                className={`modal ${modalState == "open" && "modal-open"}`}
                id={`id${todo.todo_id}`}
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="modal-title title">Edit Todo</h2>
                            <button
                                type="button"
                                className="modal-close-button"
                                onClick={closeModal}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="lucide lucide-x"
                                >
                                    <path d="M18 6 6 18" />
                                    <path d="m6 6 12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="app-add">
                            <input
                                type="text"
                                className="form-control"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />

                            <button
                                type="button"
                                className="submit-button"
                                onClick={(e) => updateDescription(e)}
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default EditTodo;
