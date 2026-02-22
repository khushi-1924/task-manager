/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete, MdEdit, MdSave } from "react-icons/md";
import Snowfall from "react-snowfall";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/api/tasks");
    setTasks(res.data);
  };

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { fetchTasks(); }, []);

  const addTask = async () => {
    await axios.post("http://localhost:5000/api/tasks", { title });
    setTitle("");
    fetchTasks();
  };

  const toggle = async (id) => {
    await axios.put(`http://localhost:5000/api/tasks/${id}`);
    fetchTasks();
  };

  const del = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    fetchTasks();
  };

  return (

    <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
      {/* Snowfall Layer */}
      < Snowfall
        speed={[0.2, 0.6]}
        wind={[-0.05, 0.05]}
        radius={[1.5, 3]}
        color="#93c5fd"
      />

      {/* Floating bubbles */}
      <div className="absolute w-72 h-72 bg-blue-300 opacity-30 rounded-full blur-3xl -top-10 -left-10 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-sky-400 opacity-20 rounded-full blur-3xl bottom-0 right-0 animate-pulse"></div>

      {/* glow */}
      <div className="absolute w-125 h-125 bg-blue-300 opacity-30 blur-3xl rounded-full"></div>

      {/* Main Card */}
      <div className="relative backdrop-blur-xl bg-white/70 p-8 rounded-3xl shadow-2xl w-105 border border-white/40">

        <h1 className="text-3xl font-bold text-blue-600 text-center mb-6 drop-shadow-sm">
          🐳 Task Manager
        </h1>

        <div className="flex gap-2 mb-6">
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="flex-1 px-4 py-2 rounded-full border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Add task ✨"
          />
          <button
            onClick={addTask}
            className="px-5 py-2 rounded-full bg-blue-500 text-white shadow-md hover:bg-blue-600 active:scale-95 transition">
            Add
          </button>
        </div>

        {tasks.length === 0 && (
          <p className="text-center text-blue-400 mt-6">
            No tasks yet ✨ stay cozy
          </p>
        )}

        {tasks.map(task => (
          <TaskItem
            key={task._id}
            task={task}
            refresh={fetchTasks}
          />
        ))}
      </div>
    </div>
  );
}

function TaskItem({ task, refresh }) {
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const toggle = async () => {
    await axios.put(`http://localhost:5000/api/tasks/${task._id}`);
    refresh();
  };

  const del = async () => {
    await axios.delete(`http://localhost:5000/api/tasks/${task._id}`);
    refresh();
  };

  const save = async () => {
    await axios.put(
      `http://localhost:5000/api/tasks/${task._id}/edit`,
      { title: newTitle }
    );
    setEditing(false);
    refresh();
  };

  return (
    <div className="flex justify-between items-center bg-white/80 px-4 py-3 rounded-2xl mb-3 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition duration-200">
      {editing ? (
        <input
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          className="border p-1 rounded w-full mr-2"
        />
      ) : (
        <span
          onClick={toggle}
          className={`cursor-pointer text-blue-700 font-medium ${task.completed && "line-through text-blue-400"
            }`}
        >
          {task.title}
        </span>
      )}

      <div className="flex gap-2 ml-2">
        {editing ? (
          <button className="hover:scale-110 transition" onClick={save}><MdSave size={28} className="text-blue-400 p-1 rounded-md hover:bg-green-200" /></button>
        ) : (
          <button className="hover:scale-110 transition" onClick={() => setEditing(true)}><MdEdit size={28} className="text-blue-400 p-1 rounded-md hover:bg-yellow-200" /></button>
        )}
        <button className="hover:scale-110 transition" onClick={del}><MdDelete size={28} className="text-blue-400 p-1 rounded-md hover:bg-red-200" /></button>
      </div>
    </div>
  );
}