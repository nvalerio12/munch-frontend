import React from 'react';
import { bool, func } from 'prop-types';
import { StyledNavbar } from './Navbar.styled';

const Navbar = ({ open, setOpen }) => {
  return (
    <>
    <StyledNavbar open={open} onClick={() => setOpen(!open)}>
      <div />
      <div />
      <div />
    </StyledNavbar>
    </>
  )
}
Navbar.propTypes = {
  open: bool.isRequired,
  setOpen: func.isRequired,
};
export default Navbar;