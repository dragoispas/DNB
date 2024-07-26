import React from 'react';
import { Avatar, Typography, Box } from '@mui/material';
import { User } from '../api';
import { useNavigate } from 'react-router-dom';

// Utility function to generate a random color
const getRandomColor = () => {
    const letters = '0123456789ABC';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 12)]; // Use only the first 12 characters for darker shades
    }
    return color;
};


// Function to get initials from name
const getInitials = (name: string) => {
    const initials = name.split(' ').map(word => word[0]).join('');
    return initials.toUpperCase();
};

interface Props {
    user: User;
}

const UserAvatar: React.FC<Props> = ({ user }) => {
    const initials = getInitials(user.name);
    const avatarColor = getRandomColor();
    const navigate = useNavigate();

    const handleOnClick = () => {
        navigate('/profile');
    }

    return (
        <Box display="flex" alignItems="center">
            <Avatar sx={{ bgcolor: avatarColor, cursor: "pointer" }} onClick={handleOnClick}>
                {initials}
            </Avatar>
            <Typography variant="h6" sx={{ marginLeft: 2 }}>
                {user.name}
            </Typography>
        </Box>
    );
};

export default UserAvatar;
