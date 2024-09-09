import React, { useState } from 'react';
import styled from 'styled-components';
import authService from '../services/authService';

const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 110vh;
  background-image: url('/assets/bg.jpg');
  background-size: cover;
  background-position:center;
  z-index:10;
`;
const Main= styled.h3`
font-size:1.6em;
font-weight: bold;
`;
const Header= styled.h2`
text-align:center;
align-items:center;
justify-content:center;

`;
const AuthForm = styled.form`
 
 background-image: linear-gradient(to bottom, #f5e4c0, #f1e7c1, #edeac3, #e9edc6, #e4f0c9);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.1);
  width: 450px;
  height:350px;
  
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px -10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  
  &:hover {
    background-color: #0056b3;
  }
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  margin-top: 10px;
  text-decoration: underline;
`;

function OfficerAuth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [uniqueId, setUniqueId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      const success = await authService.login(email, password, uniqueId);
      if (success) {
        window.location.href = '/dashboard';
      } else {
        alert('Login failed');
      }
    } else {
      const success = await authService.signup(email, password, uniqueId);
      if (success) {
        setIsLogin(true); 
      } else {
        alert('Signup failed');
      }
    }
  };

  return (
    <AuthContainer>
        <Main>Simplify the way you Certify</Main>
      <AuthForm onSubmit={handleSubmit}>
        
        <Header>{isLogin ? 'Login' : 'Sign Up'}</Header>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Officer ID"
          value={uniqueId}
          onChange={(e) => setUniqueId(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">{isLogin ? 'Login' : 'Sign Up'}</Button>
        <ToggleButton onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Don’t have an account? Sign Up' : 'Already have an account? Login'}
        </ToggleButton>
      </AuthForm>
    </AuthContainer>
  );
}

export default OfficerAuth;
