import React from 'react';
import { Avatar, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { User } from '../api';
import { useNavigate } from 'react-router-dom';

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
    const theme = useTheme(); // Use the MUI theme
    const navigate = useNavigate();

    const handleOnClick = () => {
        navigate('/profile');
    }

    return (
        <Box display="flex" alignItems="center">
            <Avatar sx={{ bgcolor: theme.palette.primary.main, cursor: "pointer" }} onClick={handleOnClick}>
                {initials}
            </Avatar>
            <Typography variant="h6" sx={{ marginLeft: 2 }}>
                {user.name}
            </Typography>
        </Box>
    );
};

export default UserAvatar;
