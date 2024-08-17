import React from 'react';
import Navbar from '../Navbar';
import { Box } from '@mui/material';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import Login from '../LoginComponents/LoginForm';

export default function Index() {
  return (
    <BrowserRouter>
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
        }}
      >
        <Navbar />
        <Routes>
          <Route path='/sell' element={<Login />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}
