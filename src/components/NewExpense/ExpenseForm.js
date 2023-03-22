import React, { useState } from 'react'
import './ExpenseForm.css'

const ExpenseForm = (props) => {
    const [enteredTitle, setEnteredTitle] = useState('');
    const [enteredAmount, setEnteredAmount] = useState('');
    const [enteredDate, setEnteredDate] = useState('');
    // const [userInput, setUserInput] = useState({
    //     enteredTitle: '',
    //     enteredAmount: '',
    //     enteredDate: ''
    // });

    const titleChangeHandler = (e) => {
        setEnteredTitle(e.target.value)
        // setUserInput(prevState => 
        //     {
        //         return {
        //             ...prevState,
        //             enteredTitle: e.target.value
        //         };
        //     }
        // );
    };

    const amountChangeHandler = (e) => {
        setEnteredAmount(e.target.value)
        // setUserInput(prevState => 
        //     {
        //         return {
        //             ...prevState,
        //             enteredAmount: e.target.value
        //         };
        //     }
        // );
    };

    const dateChangeHandler = (e) => {
        setEnteredDate(e.target.value)
        // setUserInput(prevState => 
        //     {
        //         return {
        //             ...prevState,
        //             enteredDate: e.target.value
        //         };
        //     }
        // );
    };

    const submitHandler = (e) => {
        e.preventDefault();

        const expenseData = {
            title: enteredTitle,
            amount: enteredAmount,
            date: new Date(enteredDate),
        };

        props.onSaveExpenseData(expenseData);
        setEnteredTitle('');
        setEnteredAmount('');
        setEnteredDate('');
    }

  return (
    <form onSubmit={submitHandler} className="">
      <div className="new-expense__controls">

        <div className="new-expense__control">
            <label htmlFor="">Title</label>
            <input value={enteredTitle} onChange={titleChangeHandler} type="text" />
        </div>
        
        <div className="new-expense__control">
            <label htmlFor="">Amount</label>
            <input value={enteredAmount} onChange={amountChangeHandler} type="number" min="0.01" step="0.01" />
        </div>
        
        <div className="new-expense__control">
            <label htmlFor="">Date</label>
            <input value={enteredDate} onChange={dateChangeHandler} type="date" min="2019-01-01" step="2022-12-31" />
        </div>

        <div className="new-expense__actions">
            <button type='submit'>Add Expense</button>
        </div>

      </div>
    </form>
  )
}

export default ExpenseForm
