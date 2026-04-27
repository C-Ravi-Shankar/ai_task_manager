import { auth } from "./firebase";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";

import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  // 🔥 Track user session (IMPORTANT)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // 🔐 Signup
  const signup = async () => {
    try {
      setError("");
      const res = await createUserWithEmailAndPassword(auth, email, password);
      setUser(res.user);
    } catch (err) {
      setError(err.message);
      console.log(err.message);
    }
  };

  // 🔐 Login
  const login = async () => {
    try {
      setError("");
      const res = await signInWithEmailAndPassword(auth, email, password);
      setUser(res.user);
    } catch (err) {
      setError(err.message);
      console.log(err.message);
    }
  };

  // 🔓 Logout
  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  // 📥 Fetch tasks
  const fetchTasks = async () => {
    const res = await axios.get("https://ai-task-manager-1boz.onrender.com/tasks");
    setTasks(res.data);
  };

  // ➕ Add task
  const addTask = async () => {
    if (!title) return;
    await axios.post("https://ai-task-manager-1boz.onrender.com/tasks", {
      title,
      completed: false,
    });
    setTitle("");
    fetchTasks();
  };

  // ❌ Delete task
  const deleteTask = async (id) => {
    await axios.delete(`https://ai-task-manager-1boz.onrender.com/tasks/${id}`);
    fetchTasks();
  };

  // Load tasks when user logs in
  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  return (
    <div style={{ padding: 20 }}>
      {!user ? (
        <>
          <h2>Login / Signup</h2>

          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <br /><br />

          <button onClick={signup}>Signup</button>
          <button onClick={login}>Login</button>

          {/* 🔴 Show error */}
          {error && <p style={{ color: "red" }}>{error}</p>}
        </>
      ) : (
        <>
          <h1>AI Task Manager 🚀</h1>

          <button onClick={logout}>Logout</button>

          <br /><br />

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task"
          />
          <button onClick={addTask}>Add</button>

          <h3>AI Suggestion: Focus on important tasks first</h3>

          <ul>
            {tasks.map((t) => (
              <li key={t._id}>
                {t.title}
                <button onClick={() => deleteTask(t._id)}>❌</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;