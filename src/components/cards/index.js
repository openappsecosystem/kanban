import React from 'react'
import style from './style.css'
import { Link } from 'react-router-dom'

const Cards = ({data, link}) => {
    console.log(data)
    return (
    <div className={style.section_wrapper}>
        <div className={style.wrapper}>
            {data.map((org, i) => (
            <div key={i} className={style.lists_item}>
                <Link key={i} to={'/' + link + '/' + org.id} className='link'>
                    <h4 className={style.item_title}>{org.name.length > 0 ? org.name : org.planProcesses[0].name}</h4>
                    <h5 className={style.plan_scope}>{org.note}</h5>
                </Link>
            </div>
            ))}
        </div>
    </div>
)
}

export default Cards
