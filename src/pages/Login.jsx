import { useState } from 'react';
import { loginUser } from '../api/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [contraseña, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await loginUser(email, contraseña);
            login(data.token);
            navigate('/dashboard');
        } catch (err) {
            alert('Credenciales incorrectas');
        }
    };

    return (
        <div className={styles.container}>
            <form className={styles.card} onSubmit={handleSubmit}>
                <h2 className={styles.title}>Iniciar sesión</h2>
                <input
                    className={styles.input}
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    className={styles.input}
                    type="password"
                    placeholder="Contraseña"
                    value={contraseña}
                    onChange={e => setPassword(e.target.value)}
                />
                <button className={styles.button} type="submit">Ingresar</button>
            </form>
        </div>
    );

}
