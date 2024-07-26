import React, { useState } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import LoginForm from '../Components/LoginForm';
import RegisterForm from '../Components/RegisterForm';

const LoginPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <Container maxWidth="sm">
            <Box mt={4} mb={2} textAlign="center">
                <Typography variant="h4">{isLogin ? 'Login' : 'Register'}</Typography>
            </Box>
            {isLogin ? <LoginForm /> : <RegisterForm />}
            <Box mt={2} textAlign="center">
                <Button onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? 'Need to register? Click here' : 'Already have an account? Log in'}
                </Button>
            </Box>
        </Container>
    );
};

export default LoginPage;
