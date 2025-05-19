import styles from './TaskCard.module.css';

export default function TaskCard({ task, onDelete, onEdit }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{task.title}</h3>
        <span className={`${styles.status} ${styles[task.status.toLowerCase().replace(/\s/g, '')]}`}>
          {task.status}
        </span>
      </div>
      <p className={styles.description}>{task.description}</p>
      <p className={styles.dueDate}>Fecha límite: {new Date(task.dueDate).toLocaleDateString('es-BO')}</p>
      <div className={styles.actions}>
        <button className={styles.edit} onClick={() => onEdit(task)}>Editar</button>
        <button className={styles.delete} onClick={() => onDelete(task.id)}>Eliminar</button>
      </div>
    </div>
  );
}
