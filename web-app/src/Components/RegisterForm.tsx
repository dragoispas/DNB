import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField } from '@mui/material';
import { register } from '../api';

const RegisterForm: React.FC = () => {
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('');

        try {
            await register({ name, gender, email, birth_date: birthDate, password });
            console.log('Registered with:', name, gender, email, birthDate);
            navigate('/profile'); // Navigate to profile page on successful registration
        } catch (err) {
            setError('Registration failed. Please check your inputs.');
            console.error('Registration failed:', err);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleRegister}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 300, mx: 'auto' }}
        >
            <TextField
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <TextField
                label="Gender"
                variant="outlined"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
            />
            <TextField
                label="Email"
                variant="outlined"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <TextField
                label="Birth Date"
                variant="outlined"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                required
            />
            <TextField
                label="Password"
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <Button variant="contained" type="submit">
                Register
            </Button>
        </Box>
    );
};

export default RegisterForm;
