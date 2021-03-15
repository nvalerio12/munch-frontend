import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Badge from '@material-ui/core/Badge';
import { BsBag } from 'react-icons/bs';

import './Cart.css'

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function TemporaryDrawer(props) {
  const classes = useStyles();
  const [ currentBag, setCurrentBag] = useState(props.currentBag)
  const [ currentTotal, setCurrentTotal] = useState(0)

  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    console.log(anchor)
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const cartList = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    > <h1 className="cart-header"><BsBag size={30}/></h1>
        <Divider />
         <List>
        {props.currentBag.map((item, index) => (
          <ListItem button key={index}>
            <ListItemText >
              <div className="item-container">
              <span className="item-price">${item[0]}</span> 
              <span className="item-name">{item[1]}</span>
              </div>
              </ListItemText>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Button className="checkout-btn"> Checkout </Button>
    </div>
  );

  return (
    <div className="cart-bar">
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
          <Badge badgeContent={props.currentBag.length} color="primary">
              <BsBag size={30}/>
            </Badge>
              </Button>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {cartList(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}


