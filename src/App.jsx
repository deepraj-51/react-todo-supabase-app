import { useState, useEffect } from "react";
import { CreateTodo } from "./components/CreateTodo";
import { Todos } from "./components/Todos";
import { SingleTodo } from "./components/SingleTodo";
import { supabase } from "./lib/supabase";

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTodoId, setSelectedTodoId] = useState(null);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setTodos(data || []);
    } catch (err) {
      console.error("Error fetching todos:", err);
      alert("Failed to fetch todos. Please check your Supabase configuration.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleTodoAdded = () => {
    fetchTodos();
  };

  const handleTodoUpdated = () => {
    fetchTodos();
  };

  const handleViewTodo = (todoId) => {
    setSelectedTodoId(todoId);
  };

  const handleBackToList = () => {
    setSelectedTodoId(null);
    fetchTodos(); // Refresh the list when coming back
  };

  // If viewing a single todo, show SingleTodo component
  if (selectedTodoId) {
    return (
      <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
        <SingleTodo todoId={selectedTodoId} onBack={handleBackToList} />
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Todo App</h1>
      
      <CreateTodo onTodoAdded={handleTodoAdded} />
      
      <div style={{ marginTop: "30px" }}>
        <h2>Your Todos</h2>
        {loading ? (
          <p>Loading todos...</p>
        ) : todos.length === 0 ? (
          <p>No todos yet. Create your first todo above!</p>
        ) : (
          <Todos todos={todos} onTodoUpdated={handleTodoUpdated} onViewTodo={handleViewTodo} />
        )}
      </div>
    </div>
  );
}

export default App;