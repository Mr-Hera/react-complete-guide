import React, { useState } from 'react'
import ExpenseForm from './ExpenseForm'
import './NewExpense.css'

const NewExpense = (props) => {
    const [toggleForm, setToggleForm] = useState(false);

    const onSaveExpenseDataHandler = (enteredExpenseData) => {
        const expenseData = {
            ...enteredExpenseData,
            id: Math.random().toString()
        };
        props.onAddExpense(expenseData);
        setToggleForm(!toggleForm);
    }

    const handleToggleForm = () => {
        setToggleForm(!toggleForm);
    }

  return (
    <div className="new-expense">
        {toggleForm ?
            (<button onClick={handleToggleForm}>Add New Expense</button>) :
            (<ExpenseForm formHandler={handleToggleForm} onSaveExpenseData={onSaveExpenseDataHandler} />)
        }
    </div>
  )
}

export default NewExpense
