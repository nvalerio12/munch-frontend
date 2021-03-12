import styled from 'styled-components';
// This basically creates a component that is already styled
// we call it StyledSideNav - we use it in our SideNav component

export const StyledSideNav = styled.nav`
display: flex;
flex-direction: column;
justify-content: center;
background: ${({ theme }) => theme.primaryLight};
transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'};
height: 100vh;
text-align: left;
padding: 2rem;
position: absolute;
top: 0;
left: 0;
opacity: 0.9;
z-index: 1;
transition: transform 0.3s ease-in-out;
@media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100%;
  }
a {
  font-size: 1rem;
  text-transform: uppercase;
  padding: 1rem 0;
  font-weight: bold;
  letter-spacing: 0.5rem;
  color: ${({ theme }) => theme.primaryDark};
  text-decoration: none;
  transition: color 0.3s linear;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    font-size: 1.5rem;
    text-align: center;
  }
  &:hover {
    color: ${({ theme }) => theme.primaryHover};
  }
}
.login-btn, .signup-btn {
  margin: 1em 0;
  font-size: .75rem;
  text-transform: uppercase;
  padding: 1rem 0;
  font-weight: bold;
  letter-spacing: 0.5rem;
  transition: background-color 0.3s linear;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    font-size: 1.5rem;
    text-align: center;
  }
&:hover {
  background-color: ${({ theme }) => theme.primaryHover};
}
}
`;