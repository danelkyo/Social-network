import React from 'react'

import { useSelector } from 'react-redux'

import {Link} from 'react-router-dom';
 
import Diversity1Icon from '@mui/icons-material/Diversity1';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import PeopleIcon from '@mui/icons-material/People';

import s from './profileRouter.module.scss'

const ProfileRouter = () => {
    const {user} = useSelector((state) => state.user)
    return (
        <div className={s.router}>
            <Link to="/">
                <div className={s.user_info}>
                        <div className={s.user__name}>
                            {user?.name}
                        </div>
                        <div className={s.user__avatar}>
                            <img src={user.avatar} alt="avatar" />
                        </div>
                </div>
            </Link>
            <div>
                <Link to="/feed" className={s.router__link}><DynamicFeedIcon />Feed</Link>
            </div>
            <div>
                <Link to="/users" className={s.router__link}><PeopleIcon />Users</Link>
            </div>
            <div>
                <Link to="/friends" className={s.router__link}><Diversity1Icon />Friends</Link>
            </div>
        </div>
    )
}

export default ProfileRouter