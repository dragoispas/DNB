import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField } from '@mui/material';
import { login } from '../api/auth';

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('');

        try {
            const response = await login({ email, password })
            if (response.success) {
                // Store the authentication token (if provided)
                if (response.token) {
                    localStorage.setItem('authToken', response.token);
                }
                console.log('Logged in with:', email, password);
                navigate('/profile'); // Navigate to profile page on successful login
            } else {
                setError(response.message || 'Invalid email or password.');
            }
        } catch (err) {
            setError('Invalid email or password.');
            console.error('Login failed:', err);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleLogin}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 300, mx: 'auto' }}
        >
            <TextField
                label="Email"
                variant="outlined"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                Login
            </Button>
        </Box>
    );
};

export default LoginForm;
