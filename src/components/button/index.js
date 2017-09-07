import React from 'react'
import style from './index.css'

const Button = ({action, type, title}) => (
    <button onClick={action} className={type} >{title}</button>
)

export default Button