import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
    const navigate = useNavigate();
    const { login: authLogin } = useAuth();
    const [login, setLogin] = useState(false);
    const [isCreateAccount, setIsCreateAccount] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [emailError, setEmailError] = useState("");
    
    const handleLogin = () => {
        // Basic checks for sign-in: email and password required
        if (!email || !password) {
            if (!password) setPasswordError('Password is required');
            return;
        }
        if (!emailValidation(email)) {
            return;
        }
        if (!passwordValidation(password)) {
            return;
    
        }
        setLogin(true);
        // Pass user data to authLogin so it can be saved to localStorage
        authLogin({ email, loginTime: new Date().toISOString() });
        console.log("User logged in");
        navigate('/');
    };

    const handleCreateAccount = () => {
        if (emailValidation(email) && passwordValidation(password, confirmPassword)) {
            setLogin(true);
            // Pass user data to authLogin so it can be saved to localStorage
            authLogin({ email, createdAt: new Date().toISOString() });
            console.log("Account created");
            navigate('/');
        }
    };

    const toggleView = () => {
        setIsCreateAccount(!isCreateAccount);
        setPasswordError("");
        setEmailError("");
    };

    const passwordValidation = (password, confirmPassword) => {
        // require at least 8 numeric digits
        const numericDigitsRegex = /^\d{8,}$/;

        if (confirmPassword !== undefined && confirmPassword !== null) {
            if (password !== confirmPassword) {
                setPasswordError("Passwords do not match");
                return false;
            }
        }

        if (!numericDigitsRegex.test(password)) {
            setPasswordError("Password must be at least 8 numbers (digits)");
            return false;
        }

        setPasswordError("");
        return true;
    };

    const emailValidation = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError("Invalid email format");
            return false;
        }
        setEmailError("");
        return true;
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            if (isCreateAccount) {
                handleCreateAccount();
            } else {
                handleLogin();
            }
        }
    };

    return (
        <>
            {login && <p>Welcome back!</p>}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 300, margin: '0 auto', mt: 5, border: '1px solid #ccc', padding: 3, borderRadius: 2 }}>
                <h1>{isCreateAccount ? 'Create Account' : 'Sign in'}</h1>
                <p>Or <span className="text-blue-500 underline hover:text-blue-600 hover:cursor-pointer" onClick={toggleView}>
                    {isCreateAccount ? 'Sign in to existing account' : 'Create an account'}
                </span></p>
                <TextField 
                    label="Email" 
                    variant="outlined"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={handleKeyPress}
                    error={!!emailError}
                    helperText={emailError}
                />
            

                <TextField 
                    label="Password" 
                    variant="outlined" 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleKeyPress}
                />
                {isCreateAccount && (
                    
                    <TextField 
                        label="Confirm Password" 
                        variant="outlined" 
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        error={!!passwordError}
                        helperText={passwordError}
                        onKeyDown={handleKeyPress}
                    />
                )}
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={isCreateAccount ? handleCreateAccount : handleLogin}
                >
                    {isCreateAccount ? 'Create Account' : 'Login'}
                </Button>
            </Box>
        </>
    )
}