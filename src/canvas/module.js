import React from 'react'

const Module = ({icon, title, content }) => (
  <div className='content_module'>
    <h5>{icon + title}</h5>
    <div className='content'>{content}</div>
  </div>
)

export default Module