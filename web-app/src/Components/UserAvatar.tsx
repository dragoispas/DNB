import React from 'react';
import { Avatar, Typography, Box } from '@mui/material';

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
    name: string;
}

const UserAvatar: React.FC<Props> = ({ name }) => {
    const initials = getInitials(name);
    const avatarColor = getRandomColor();

    return (
        <Box display="flex" alignItems="center">
            <Avatar sx={{ bgcolor: avatarColor }}>
                {initials}
            </Avatar>
            <Typography variant="h6" sx={{ marginLeft: 2 }}>
                {name}
            </Typography>
        </Box>
    );
};

export default UserAvatar;
