import React from 'react'

import './stand.scss';
import User from '../user/User';

import { useEffect, useState } from 'react';
import axios from 'axios';

const url = 'https://jsonplaceholder.typicode.com/users';

const Stand = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const usersFetch = async () => {
          const users = await axios(url);
          setUsers(users.data);
        };
        usersFetch();
    }, []);
    console.log(users);
    return (
        <div className="users">
            {
                users.map(user => {
                    return (
                        <User user={user} key={user.id}/>
                    )
                })
            }
        </div>
    )
}

export default Stand;