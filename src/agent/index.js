import React from 'react'
import style from './style.css'
import Cards from '../components/cards'

const Agent = ({data}) => {
    return (
        <section className={style.agent}>
            <div className={style.agent_info}>
                <span className={style.info_image}>
                    <img className={style.image_photo} src={data.image} />
                </span>
                <h1 className={style.info_title}>{data.name}</h1>
            </div>
            <nav className={style.agent_menu}>
                <h5 className={style.menu_item}>Recent</h5>
                <h5 className={style.menu_item + ' ' + style.item_active}>Plans</h5>
                <h5 className={style.menu_item}>Network</h5>
                <h5 className={style.menu_item}>Inventory</h5>
            </nav>
            <div className={style.agent_section}>
                <Cards
                  data={data.agentPlans}
                  link='canvas'
                />
            </div>
        </section>
    )
}

export default Agent
