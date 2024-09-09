// components/Header.js
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Styled-components for header
const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 10;
 
`;

const Logo = styled.h1`
margin-left:20px;
  display: flex;
  align-items: center;
  font-weight:bold;
  color:#F09418;
  font-size:25px;
`;


const NavLinks = styled.nav`
  display: flex;
  gap: 20px;
  margin-right:50px;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #007bff;
  font-weight: bold;

  &:hover {
    color: #0056b3;
  }
`;
const VideoContainer = styled.div`
display:flex;
flex:1;
  position: fixed;
 top:100px;
  left: 0;
  overflow: hidden;
  align-items:center;
  z-index: -1;
`;

// Styled component for the video element
const StyledVideo = styled.video`
  width: 500px
  height: 300px
  object-fit: cover; /* Ensures the video covers the entire viewport */
`;
const QuoteContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  color: #333;
  font-size: 1.5em;
  font-weight: bold;
  text-align: center;
`;
function Header(){
  return (
    <div>
        <VideoContainer>
      <StyledVideo
        src="/assets/fast.mp4" // Change to the path of your video file
        autoPlay
        loop
        muted
        playsInline
      />
      <QuoteContainer>
          "Empowering citizens through digital certification – fast, reliable, and at your fingertips."
        </QuoteContainer>
    </VideoContainer>

    <HeaderContainer>
      <Logo>CERTIfast</Logo>
      <NavLinks>
        <NavLink to="/auth">Login/Signup</NavLink>
        <NavLink to="/services">Services</NavLink>
        <NavLink to="/support">Support</NavLink>
      </NavLinks>
    </HeaderContainer>
    </div>
  );
};

export default Header;
