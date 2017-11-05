import * as React from 'react'

import AuthenticatedOnly from '../../AuthenticatedOnly'
import Login from '../../login'

class AppTemplate extends React.Component {
  render () {
    return (
      <AuthenticatedOnly unauthenticatedComponent={<Login />}>
        {this.props.children}
      </AuthenticatedOnly>
    )
  }
}

export default AppTemplate
