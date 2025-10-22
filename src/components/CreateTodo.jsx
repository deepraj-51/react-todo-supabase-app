import { useState } from "react";
import { supabase } from "../lib/supabase";

export function CreateTodo({ onTodoAdded }) {
    const [title, setTitle] = useState(""); // State for title
    const [description, setDescription] = useState(""); // State for description
    const [loading, setLoading] = useState(false);

    const handleAddTodo = async () => {
        if (!title.trim() || !description.trim()) {
            alert("Please fill in both title and description");
            return;
        }

        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('todos')
                .insert([
                    {
                        title: title.trim(),
                        description: description.trim(),
                        completed: false,
                        created_at: new Date().toISOString()
                    }
                ])
                .select();

            if (error) {
                throw error;
            }

            alert("Todo added successfully!");
            console.log("Todo added:", data);
            
            // Clear form
            setTitle("");
            setDescription("");
            
            // Notify parent component to refresh todos
            if (onTodoAdded) {
                onTodoAdded();
            }
        } catch (err) {
            console.error("Error:", err);
            alert("Failed to add todo. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <input
                id="title"
                style={{
                    padding: "10px",
                    margin: "10px",
                }}
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)} // Update title state
            />
            <br />
            <br />

            <input
                id="description"
                style={{
                    padding: "10px",
                    margin: "10px",
                }}
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)} // Update description state
            />
            <br />
            <br />

            <button
                style={{
                    padding: "10px",
                    margin: "10px",
                }}
                onClick={handleAddTodo} // Call the function to add a todo
                disabled={loading}
            >
                {loading ? "Adding..." : "Add a Todo"}
            </button>
        </div>
    );
}