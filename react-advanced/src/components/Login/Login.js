import React, { useState, useEffect, useReducer, useContext, useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../UI/Input/Input';

const emailReducer = (state, action) => {
  
  if(action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.includes('@') }
  }

  if(action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.includes('@') }
  }

  return {
    value: '',
    isValid: false
  };
};

const passwordReducer = (state, action) => {
  
  if(action.type === 'PASSWORD_INPUT') {
    return { value: action.val, isValid: action.val.trim().length > 6 }
  }

  if(action.type === 'PASSWORD_INPUT_BLUR') {
    return { value: state.value, isValid: state.value.trim().length > 6 }
  }

  return {
    value: '',
    isValid: false
  };
};

const Login = (props) => {
  // state
  const [formIsValid, setFormIsValid] = useState(false);

  // context
  const authCtx = useContext(AuthContext);

  // Input Refs
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  // Email Reducer

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '', 
    isValid: null
  });

  // Password Reducer
  
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '', 
    isValid: null
  });

  useEffect(() => {
    console.log('EFFECT RUNNING');

    return () => {
      console.log('EFFECT CLEANUP');
    };
  }, []);

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Checking from validity!');

      setFormIsValid(
        emailIsValid && passwordIsValid
      );
    }, 500)

    return () => {
      console.log('CLEANUP');
      clearTimeout(identifier);
    };
    
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'USER_INPUT', val: event.target.value});

    // setFormIsValid(
    //   emailState.isValid && passwordState.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type: 'PASSWORD_INPUT', val: event.target.value});

    // setFormIsValid(
    //   emailState.isValid && passwordState.isValid
    // );
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: 'INPUT_BLUR'});
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: 'PASSWORD_INPUT_BLUR'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if(formIsValid) {
      authCtx.onLogin(emailState.value, passwordState.value);
    } else if(!emailIsValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          isValid={emailIsValid}
          label="Email" type="email"
          id="email"
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          ref={passwordInputRef}
          isValid={passwordIsValid}
          label="Password" type="password"
          id="password"
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
