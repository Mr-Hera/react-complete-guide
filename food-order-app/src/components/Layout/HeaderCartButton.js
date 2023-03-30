import React, { useContext, useEffect, useState } from 'react'
import CartContext from '../../store/cart-context'
import CartIcon from '../Cart/CartIcon'
import classes from './HeaderCartButton.module.css'

const HeaderCartButton = (props) => {
  const [buttonIsHighlighted, setButtonIsHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);

  const { items } = cartCtx;

  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${buttonIsHighlighted ? classes.bump : ''}`;

  useEffect(() => {
    if(items.length === 0) {
      return;
    }
    setButtonIsHighlighted(true);

    const timer = setTimeout(() => {
      setButtonIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button onClick={props.onClick} className={btnClasses}>
      <div className={classes.icon}>
        <CartIcon />
      </div>
      <div>
        Your Cart
      </div>
      <div className={classes.badge}>
        {numberOfCartItems}
      </div>
    </button>
  )
}

export default HeaderCartButton
