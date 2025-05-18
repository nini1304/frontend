import TaskCard from './TaskCard';

export default function TaskList({ tasks, onDelete, onEdit }) {
    return (
        <div>
            {tasks.map(task => (
                <TaskCard key={task.id} task={task} onDelete={onDelete} onEdit={onEdit} />
            ))}
        </div>
    );
}
