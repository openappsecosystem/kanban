import React from 'react'
import style from './style.css'
import {Left, Right, Bell, More} from '../../icons'
import {NavLink, withRouter} from 'react-router-dom'

const Sidebar = (props) => {
  return (
    <div className={style.sidebar}>
      <header className={style.sidebar_header}>
      <div className={style.header_menu}>
        <div className={style.sidebar_navigation}>
          <span onClick={() => props.history.goBack()}><Left width={18} height={18} color={'#fff'} /></span>
          <span onClick={() => props.history.goForward()}><Right width={18} height={18} color={'#fff'} /></span>
        </div>
        <NavLink exact className={style.home_button} activeClassName={style.activeLink} to={'/'}>Dashboard</NavLink>
        <div className={style.right_profile}>
          {/* <span><Bell width={'16'} height={'16'} color='#fff' /></span> */}
          <span onClick={props.handleToggleProfilePanel}><More onClick={props.handleToggleProfilePanel} color='#fff' /></span>
        </div>
        <div className={props.profile ? style.right_profile_panel + ' ' + style.profileActive : style.right_profile_panel }>
          <div className={style.panel_section}>
            <NavLink to={'/'}>Profile</NavLink>
            <NavLink to={'/settings'}>Settings</NavLink>
          </div>
          <button onClick={props.logout} className={style.logout}>Logout</button>
        </div>
        </div>
        <div className={style.header_profile}>
          <NavLink to={'/agent/' + props.data.id}>
            <div className={style.data_image}>
              <img src={props.data.image} />
            </div>
            <h3>{props.data.name}</h3>
          </NavLink>
        </div>
      </header>
      <section className={style.sidebar_section}>
        <h3 className={style.section_title}>Apps</h3>
        <ul className={style.section_list}>
          <li className={style.list_active}><NavLink to={'/'}>Dashboard</NavLink></li>
          <li><a target='blank' href="#">Work</a></li>
          <li><a href="https://board.net/p/Fair_Health_Care" target='blank'>Health</a></li>
          <li><a target='blank' href="https://wallet.bankofthecommons.coop">Wallet</a></li>
        </ul>
      </section>
      <section className={style.aside_section}>
        <h3 className={style.section_title}>Networks</h3>
        <ul className={style.section_list}>
          <NavLink exact activeClassName={style.activeLink} to={'/agent/' + props.data.id}><li className={style.list_me + ' ' + style.list_active}>Me</li></NavLink>
          {props.agents.map((agent, i) => (
            <NavLink key={i} activeClassName={style.activeLink} to={'/agent/' + agent.object.id}>
              <li>
                <div className={style.list_agent}>
                  <img className={style.agent_photo} src="https://picsum.photos/200/300" />
                  <h4>{agent.object.name}</h4>
                </div>
              </li>
            </NavLink>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default withRouter(Sidebar)
