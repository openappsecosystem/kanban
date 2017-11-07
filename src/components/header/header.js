import React from 'react'
import style from './style.css'
import { Link } from 'react-router-dom'

const Header = (props) => {
    return (
        <div className={style.header}>
            <div className={style.header_left}>
                <div className={style.header_plans} onClick={props.handleTogglePanel}>
                    <h5>All Plans</h5>
                </div>
                <div className={props.panel ? style.header_panel + ' ' + style.active : style.header_panel}>
                    <h3 className={style.panel_title}>Your plans</h3>
                    <div className={style.panel_list}>
                        {props.info.agentPlans.map(plan => (
                        <Link key={plan.id} to={'/canvas/' + plan.id}>
                            <div className={style.list_item}>
                                <h5 className={style.item_title}>{plan.name || 'Plan ' + plan.id}</h5>
                            </div>
                        </Link>
                        ))}
                    </div>
                </div>
            </div>
            <h1 className={style.header_title}><Link to={'/'}>kanban</Link></h1>
            <div className={style.header_right}>
            <div className={style.right_info}>
                    <span className={style.info_img} />
                </div>
                <div onClick={props.handleToggleProfilePanel} className={style.right_profile}>
                    <img src={props.info.image} className={style.profile_img} />
                </div>
                <div className={props.profile ? style.right_profile_panel + ' ' + style.profileActive : style.right_profile_panel }>
                    <h3 className={style.right_profile_panel_title}>{props.info.name}</h3>
                    <button onClick={props.logout} className={style.logout}>Logout</button>
                </div>
            </div>
        </div>
    )
}

export default Header
