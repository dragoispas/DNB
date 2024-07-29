import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Avatar, Paper, Grid } from '@mui/material';
import UserAvatar from '../components/UserAvatar';
import { getProfile, Profile } from '../api/auth';

const ProfilePage: React.FC = () => {
    const [profile, setProfile] = useState<Profile>();
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const fetchedUser = await getProfile();
                console.log(fetchedUser);
                if (fetchedUser) {
                    setProfile(fetchedUser);
                } else {
                    setError('Failed to fetch profile');
                }
            } catch (err) {
                setError('Failed to fetch profile');
                console.error('Profile fetch error:', err);
            }
        };

        fetchProfile();
    }, []);

    const handleTransactionsOnClick = () => {
        navigate('/');
    };

    const handleLogout = () => {
        // Assume logout functionality is properly implemented in the API file
        localStorage.removeItem('authToken');
        navigate('/login');
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
                {error && <Typography color="error">{error}</Typography>}
                <Box sx={{ marginTop: 2, gap: 2, display: "flex" }}>
                    <Button variant="contained" color="primary" onClick={handleTransactionsOnClick}>
                        Transactions
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleLogout}>
                        Logout
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default ProfilePage;
