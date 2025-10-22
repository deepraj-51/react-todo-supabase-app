import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export function SingleTodo({ todoId, onBack }) {
    const [todo, setTodo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTodo = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const { data, error } = await supabase
                .from('todos')
                .select('*')
                .eq('id', todoId)
                .single();

            if (error) {
                throw error;
            }

            setTodo(data);
        } catch (err) {
            console.error("Error fetching todo:", err);
            setError("Failed to fetch todo. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleToggleComplete = async () => {
        try {
            const { error } = await supabase
                .from('todos')
                .update({ completed: !todo.completed })
                .eq('id', todoId);

            if (error) {
                throw error;
            }

            // Update local state
            setTodo(prev => ({ ...prev, completed: !prev.completed }));
        } catch (err) {
            console.error("Error updating todo:", err);
            alert("Failed to update todo. Please try again.");
        }
    };

    const handleDeleteTodo = async () => {
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

            alert("Todo deleted successfully!");
            onBack(); // Go back to todo list
        } catch (err) {
            console.error("Error deleting todo:", err);
            alert("Failed to delete todo. Please try again.");
        }
    };

    useEffect(() => {
        if (todoId) {
            fetchTodo();
        }
    }, [todoId]);

    if (loading) {
        return (
            <div style={{ textAlign: "center", padding: "20px" }}>
                <p>Loading todo...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ textAlign: "center", padding: "20px" }}>
                <p style={{ color: "red" }}>{error}</p>
                <button onClick={onBack} style={{
                    padding: "10px 20px",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer"
                }}>
                    Back to Todos
                </button>
            </div>
        );
    }

    if (!todo) {
        return (
            <div style={{ textAlign: "center", padding: "20px" }}>
                <p>Todo not found</p>
                <button onClick={onBack} style={{
                    padding: "10px 20px",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer"
                }}>
                    Back to Todos
                </button>
            </div>
        );
    }

    return (
        <div style={{
            maxWidth: "600px",
            margin: "0 auto",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            backgroundColor: todo.completed ? "#f8f9fa" : "white"
        }}>
            <div style={{ marginBottom: "20px" }}>
                <button onClick={onBack} style={{
                    padding: "8px 16px",
                    backgroundColor: "#6c757d",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginBottom: "20px"
                }}>
                    ← Back to Todos
                </button>
            </div>

            <div style={{ marginBottom: "20px" }}>
                <h1 style={{
                    fontSize: "2rem",
                    marginBottom: "10px",
                    textDecoration: todo.completed ? "line-through" : "none",
                    color: todo.completed ? "#6c757d" : "#333"
                }}>
                    {todo.title}
                </h1>
                
                <p style={{
                    fontSize: "1.1rem",
                    color: todo.completed ? "#6c757d" : "#666",
                    textDecoration: todo.completed ? "line-through" : "none",
                    lineHeight: "1.6"
                }}>
                    {todo.description}
                </p>
            </div>

            <div style={{ marginBottom: "20px" }}>
                <p style={{ color: "#666", fontSize: "0.9rem" }}>
                    <strong>Status:</strong> {todo.completed ? "Completed" : "Pending"}
                </p>
                <p style={{ color: "#666", fontSize: "0.9rem" }}>
                    <strong>Created:</strong> {new Date(todo.created_at).toLocaleString()}
                </p>
                {todo.updated_at !== todo.created_at && (
                    <p style={{ color: "#666", fontSize: "0.9rem" }}>
                        <strong>Updated:</strong> {new Date(todo.updated_at).toLocaleString()}
                    </p>
                )}
            </div>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <button
                    onClick={handleToggleComplete}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: todo.completed ? "#6c757d" : "#28a745",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontSize: "1rem"
                    }}
                >
                    {todo.completed ? "Mark as Incomplete" : "Mark as Complete"}
                </button>

                <button
                    onClick={handleDeleteTodo}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#dc3545",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontSize: "1rem"
                    }}
                >
                    Delete Todo
                </button>
            </div>
        </div>
    );
}
