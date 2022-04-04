import React from 'react';

import styles from './styles.module.scss'

function User ({children, name, username, email, ...props})  {
  return (
        <aside className={styles.user}>
          <header>
            <h2>{name}</h2>
            <p>{username}</p>
          </header>
          <p>{email}</p>


        </aside>
  )
}

export default User