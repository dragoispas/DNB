import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useAuth } from '../hooks/useAuth';

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('');

        await login({ email, password });
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
