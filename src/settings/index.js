import React from 'react'
import style from './style.css'

const Settings = ({data, saveSettings, updateImage, updateBio, updateEmail, updateLocation, updateName}) => {
  return (
      <div className={style.settings}>
        <section className={style.settings_container}>
          <h3 className={style.container_title}>Account</h3>
          <div className={style.container_form}>
            <div className={style.form_item}>
              <h5>Name</h5>
              <input onChange={updateName} placeholder={data.name} />
            </div>
            <div className={style.form_item}>
              <h5>Email</h5>
              <input onChange={updateEmail} placeholder={data.email} />
            </div>
            <div className={style.form_item}>
              <h5>Photo</h5>
              <input onChange={updateImage} placeholder={data.image} />
              <div className={style.item_photo}>
                <img src={data.image} />
              </div>
            </div>
            {/* <div className={style.form_item}>
              <h5>Location</h5>
              <input onChange={updateLocation} placeholder={data.primaryLocation ? data.primaryLocation.name : ''} />
            </div> */}
            <div className={style.form_item}>
              <h5>Bio</h5>
              <textarea onChange={updateBio} placeholder={data.note} />
            </div>
            <div className={style.form_actions}>
              <button onClick={saveSettings} >Save</button>
            </div>
          </div>
        </section>
      </div>
  )
}


export default Settings
