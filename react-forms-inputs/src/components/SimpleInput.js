import useInput from '../hooks/use-input';

const SimpleInput = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput
  } = useInput(value => value.trim() !== '');

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput
  } = useInput(value => value.match(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/));

  const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  let formIsValid = false;

  if(enteredNameIsValid && enteredEmailIsValid ) {
    formIsValid = true;
  }

  const formSubmissionHandler = (e) => {
    e.preventDefault();

    if(!enteredNameIsValid) {
      return;
    }

    if(!enteredEmailIsValid) {
      return;
    }

    console.log("Name - ", enteredName);
    console.log("Email - ", enteredEmail);

    // below works but not the cleanest way to do it
    // nameInputRef.current.value = '';
    resetNameInput();
    resetEmailInput();
  }

  const nameInputClasses = nameInputHasError && emailInputHasError ? "form-control invalid" : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
          type='text'
          id='name'
        />
        {nameInputHasError && <p className="error-text">Name must not be empty</p>}

        <label htmlFor='name'>Your Email</label>
        <input
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
          type='email'
          id='email'
        />
        {emailInputHasError && <p className="error-text">Email must not be empty</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
