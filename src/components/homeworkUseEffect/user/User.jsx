import React from 'react'

import './user.scss';

const User = ({user : {name, username, email, phone}}) => {
  return (
    <div style={{'margin' : '25px'}}>
        <div className="container">
            <div className="card">
                <div className="front">
                    <div className="logo"><span></span></div>
                </div>
                <div className="back">
                    <h1>{name}</h1>
                    <ul>
                        <li>{username}</li>
                        <li>{email}</li>
                        <li>{phone}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  )
}

export default User;