import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

import User from '../user/User'

import s from './users.module.scss';

const Users = ({friendsPage, currentUsers}) => {
const {user} = useSelector((state) => state.user);
  return (
    <div className={s.users__list}>
        {
        friendsPage
        ? currentUsers.map((u) => (
                <div key={u?.id}>
                    <User
                        id={u?.id}
                        img={u?.avatar}
                        name={u?.name}
                        email={u?.email}
                    />
                </div>
            ))
        : currentUsers.map(u => (
            <div key={u.id}>
                {
                Number(user.id) === Number(u.id) ? (
                <Link to="/profile">
                    <User
                    id={u.id}
                    img={u.avatar}
                    name={u.name}
                    email={u.email}
                    />
                </Link>
                ) : (
                    <User
                    id={u.id}
                    img={u.avatar}
                    name={u.name}
                    email={u.email}
                    />
                )
                }
            </div>
            ))}
  </div>
  )
}

export default Users