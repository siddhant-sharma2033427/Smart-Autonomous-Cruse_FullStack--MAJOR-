import React from 'react';
import { Button } from '@mui/material';

const LogoutButton = ({ setShowHome, setSignup }) => {
    const handleLogout = () => {
        setShowHome(false);
        setSignup(false);
    };

    return (
        <Button
            onClick={handleLogout}
            variant="contained"
            color="primary"
            size="large"
            sx={{
                position: 'fixed',
                top: '10px',
                left: '10px',
                zIndex: '1000',
            }}
        >
            Logout
        </Button>
    );
};

export default LogoutButton;
