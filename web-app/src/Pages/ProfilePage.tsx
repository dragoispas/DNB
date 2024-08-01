import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Avatar, Paper, Grid } from '@mui/material';
import UserAvatar from '../components/UserAvatar';
import { useAuth } from '../hooks/useAuth';

const ProfilePage: React.FC = () => {
    const navigate = useNavigate();

    const { profile, logout } = useAuth();


    const handleTransactionsOnClick = () => {
        navigate('/');
    };

    if (!profile) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Box sx={{ padding: 2 }}>
            <Paper elevation={3} sx={{ padding: 2, maxWidth: 600, margin: '0 auto' }}>
                <UserAvatar user={profile} />
                <Box sx={{ marginTop: 2 }}>
                    <Typography variant="body1"><strong>Email:</strong> {profile.email}</Typography>
                    <Typography variant="body1"><strong>Gender:</strong> {profile.gender}</Typography>
                    <Typography variant="body1"><strong>Birth Date:</strong> {profile.birth_date}</Typography>
                    <Typography variant="body1"><strong>Balance:</strong> {profile.balance} EUR</Typography>
                </Box>
                <Box sx={{ marginTop: 2, gap: 2, display: "flex" }}>
                    <Button variant="contained" color="primary" onClick={handleTransactionsOnClick}>
                        Transactions
                    </Button>
                    <Button variant="contained" color="primary" onClick={logout}>
                        Logout
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default ProfilePage;
