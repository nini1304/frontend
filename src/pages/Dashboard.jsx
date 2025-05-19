// src/pages/Dashboard.jsx
import { useEffect, useState } from 'react';
import { fetchTasks, createTask, deleteTask, updateTask } from '../api/api';

import { useAuth } from '../context/AuthContext';
import TaskList from '../components/TaskList';
import EditTaskModal from '../components/EditTaskModal';
import styles from './Dashboard.module.css';
import { useNavigate } from 'react-router-dom';


export default function Dashboard() {
    const { token, logout } = useAuth();
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        status: 'pendiente',
        dueDate: '',
    });
    const [editingTask, setEditingTask] = useState(null);
    const [filters, setFilters] = useState({ status: '', search: '' });
    const loadTasks = async () => {
        try {
            const { data } = await fetchTasks(token, filters);
            setTasks(data);
        } catch (err) {
            console.error('Error al obtener tareas:', err);
        }
    };



    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await createTask(newTask, token);
            setNewTask({ title: '', description: '', status: 'pendiente', dueDate: '' });
            loadTasks();
        } catch (err) {
            alert('Error al crear tarea');
        }
    };
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar esta tarea?');
        if (!confirmDelete) return;

        try {
            await deleteTask(id, token);
            loadTasks();
        } catch (err) {
            alert('Error al eliminar');
        }
    };

    const handleEdit = (task) => {
        setEditingTask(task);
    };

    const handleUpdate = async () => {
        try {
            await updateTask(editingTask, token);
            setEditingTask(null);
            loadTasks();
        } catch (err) {
            alert('Error al actualizar');
        }
    };

    useEffect(() => {
        loadTasks();
    }, []);

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Dashboard</h2>
            <button className={styles.logoutButton} onClick={() => {
                logout();
                navigate('/');
            }}>
                Cerrar sesión
            </button>

            <div className={styles.filters}>
                <input
                    placeholder="Buscar..."
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                />
                <select
                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                >
                    <option value="">Todas</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="en progreso">En progreso</option>
                    <option value="completada">Completada</option>
                </select>
                <button onClick={loadTasks}>Buscar</button>
            </div>

            <form className={styles.form} onSubmit={handleCreate}>
                <input
                    placeholder="Título"
                    value={newTask.title}
                    onChange={e => setNewTask({ ...newTask, title: e.target.value })}
                />
                <input
                    placeholder="Descripción"
                    value={newTask.description}
                    onChange={e => setNewTask({ ...newTask, description: e.target.value })}
                />
                <input
                    type="date"
                    value={newTask.dueDate}
                    onChange={e => setNewTask({ ...newTask, dueDate: e.target.value })}
                />
                <select
                    value={newTask.status}
                    onChange={e => setNewTask({ ...newTask, status: e.target.value })}
                >
                    <option value="pendiente">Pendiente</option>
                    <option value="en progreso">En progreso</option>
                    <option value="completada">Completada</option>
                </select>
                <button type="submit">Agregar Tarea</button>
            </form>

            <TaskList tasks={tasks} onDelete={handleDelete} onEdit={handleEdit} />

            {editingTask && (
                <EditTaskModal
                    task={editingTask}
                    onChange={setEditingTask}
                    onCancel={() => setEditingTask(null)}
                    onSave={handleUpdate}
                />
            )}
        </div>
    );

}
