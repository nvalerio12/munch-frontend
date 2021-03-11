import React from 'react';
import { bool } from 'prop-types';
import { StyledSideNav } from './SideNav.styled';

const SideNav = ({ open, ...props }) => {
  
  const isHidden = open ? true : false;
  const tabIndex = isHidden ? 0 : -1;

  return (
    <StyledSideNav open={open} aria-hidden={!isHidden} {...props}>
      <a href="/" tabIndex={tabIndex}>
        <span aria-hidden="true">💁🏻‍♂️</span>
        About us
      </a>
      <a href="/" tabIndex={tabIndex}>
        <span aria-hidden="true">💸</span>
        Pricing
        </a>
      <a href="/" tabIndex={tabIndex}>
        <span aria-hidden="true">📩</span>
        Contact
        </a>
    </StyledSideNav>
  )
}

SideNav.propTypes = {
  open: bool.isRequired,
}

export default SideNav;