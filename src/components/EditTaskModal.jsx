import styles from './EditTaskModal.module.css';

export default function EditTaskModal({ task, onChange, onCancel, onSave }) {
  return (
    <div className={styles.modal}>
      <h3 className={styles.title}>Editar tarea</h3>
      <input
        className={styles.input}
        value={task.title}
        placeholder="Título"
        onChange={(e) => onChange({ ...task, title: e.target.value })}
      />
      <textarea
        className={styles.textarea}
        value={task.description}
        placeholder="Descripción"
        onChange={(e) => onChange({ ...task, description: e.target.value })}
      />
      <div className={styles.actions}>
        <button className={styles.save} onClick={onSave}>Guardar</button>
        <button className={styles.cancel} onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  );
}
