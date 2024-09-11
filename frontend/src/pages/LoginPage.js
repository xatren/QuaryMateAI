import React, { useState } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Yönlendirme için eklendi

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Yönlendirme için kullanılıyor

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/'); // Giriş başarılıysa ana sayfaya yönlendir
        } catch (error) {
            console.error("Giriş hatası:", error);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-posta" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Şifre" required />
            <button type="submit">Giriş Yap</button>
        </form>
    );
};

export default LoginPage;