import React, { useState } from 'react';
import './App.css';

function App() {
  // Estado inicial con algunas tareas de ejemplo basadas en tu imagen
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Hacer ejercicio', completed: false },
    { id: 2, text: 'Dormir', completed: false },
    { id: 3, text: 'Comprar jabón', completed: false },
    { id: 4, text: 'Salir a caminar', completed: true },
    { id: 5, text: 'Pasear al perro', completed: true }
  ]);
  
  const [newTask, setNewTask] = useState('');

  // Función para registrar una nueva tarea
  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      const newTaskObj = {
        id: Date.now(), // Generamos un ID único temporal
        text: newTask,
        completed: false // Por defecto inicia pendiente
      };
      setTasks([...tasks, newTaskObj]);
      setNewTask(''); // Limpiamos el input
    }
  };

  // Función para actualizar el estado (pendiente/completada)
  const handleToggle = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Función para eliminar una tarea
  const handleDelete = (id, e) => {
    e.stopPropagation(); // Evita que se dispare el toggle al hacer clic en eliminar
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Función para ordenar: primero pendientes, luego completadas
  const handleSort = () => {
    const sortedTasks = [...tasks].sort((a, b) => {
      if (a.completed === b.completed) return 0;
      return a.completed ? 1 : -1;
    });
    setTasks(sortedTasks);
  };

  // Lógica para obtener la fecha actual con el formato de la imagen
  const date = new Date();
  const dayNum = date.getDate();
  const month = date.toLocaleString('es-ES', { month: 'short' });
  const year = date.getFullYear();
  const dayName = date.toLocaleString('es-ES', { weekday: 'long' }).toUpperCase();

  return (
    <div className="app-container">
      <div className="todo-card">
        {/* Cabecera con la fecha */}
        <header className="todo-header">
          <div className="date-left">
            <span className="day-num">{dayNum}</span>
            <div className="month-year">
              <span>{month}</span>
              <span>{year}</span>
            </div>
          </div>
          <div className="day-name">{dayName}</div>
        </header>

        {/* Sección de input y botones */}
        <div className="input-section">
          <input
            type="text"
            placeholder="Nueva tarea"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
          />
          <button className="add-btn" onClick={handleAddTask}>+</button>
          <button className="sort-btn" onClick={handleSort}>Ordenar</button>
        </div>

        {/* Lista de Tareas */}
        <div className="task-list">
          {tasks.map(task => (
            <div
              key={task.id}
              className={`task-item ${task.completed ? 'completed' : 'pending'}`}
              onClick={() => handleToggle(task.id)}
            >
              <span className="task-text">{task.text}</span>
              <button 
                className="delete-btn" 
                onClick={(e) => handleDelete(task.id, e)}
                title="Eliminar tarea"
              >
                ✖
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;