import React, { useState } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            // Başarılı kayıt sonrası yönlendirme
        } catch (error) {
            console.error("Kayıt hatası:", error);
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-posta" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Şifre" required />
            <button type="submit">Kayıt Ol</button>
        </form>
    );
};

export default RegisterPage;