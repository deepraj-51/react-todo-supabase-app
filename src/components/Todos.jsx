import { supabase } from "../lib/supabase";

export function Todos({ todos, onTodoUpdated, onViewTodo }) {
    const handleToggleComplete = async (todo) => {
        try {
            const { error } = await supabase
                .from('todos')
                .update({ completed: !todo.completed })
                .eq('id', todo.id);

            if (error) {
                throw error;
            }

            // Notify parent component to refresh todos
            if (onTodoUpdated) {
                onTodoUpdated();
            }
        } catch (err) {
            console.error("Error updating todo:", err);
            alert("Failed to update todo. Please try again.");
        }
    };

    const handleDeleteTodo = async (todoId) => {
        if (!confirm("Are you sure you want to delete this todo?")) {
            return;
        }

        try {
            const { error } = await supabase
                .from('todos')
                .delete()
                .eq('id', todoId);

            if (error) {
                throw error;
            }

            // Notify parent component to refresh todos
            if (onTodoUpdated) {
                onTodoUpdated();
            }
        } catch (err) {
            console.error("Error deleting todo:", err);
            alert("Failed to delete todo. Please try again.");
        }
    };

    return (
        <div>
            {todos.map(function(todo, index){
                return (
                    <div key={todo.id || index} style={{
                        border: "1px solid #ccc",
                        padding: "10px",
                        margin: "10px",
                        borderRadius: "5px",
                        backgroundColor: todo.completed ? "#f0f0f0" : "white"
                    }}>
                        <h3 style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
                            {todo.title}
                        </h3>
                        <p style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
                            {todo.description}
                        </p>
                        <div style={{ marginTop: "10px" }}>
                            <button
                                onClick={() => onViewTodo && onViewTodo(todo.id)}
                                style={{
                                    padding: "5px 10px",
                                    marginRight: "10px",
                                    backgroundColor: "#007bff",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "3px",
                                    cursor: "pointer"
                                }}
                            >
                                View Details
                            </button>
                            <button
                                onClick={() => handleToggleComplete(todo)}
                                style={{
                                    padding: "5px 10px",
                                    marginRight: "10px",
                                    backgroundColor: todo.completed ? "#gray" : "#4CAF50",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "3px",
                                    cursor: "pointer"
                                }}
                            >
                                {todo.completed ? "Mark as Incomplete" : "Mark as Completed"}
                            </button>
                            <button
                                onClick={() => handleDeleteTodo(todo.id)}
                                style={{
                                    padding: "5px 10px",
                                    backgroundColor: "#f44336",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "3px",
                                    cursor: "pointer"
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                );
            })}        
        </div>
    );
}