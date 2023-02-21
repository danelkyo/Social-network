import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import RegistrationPage from './pages/homeworkReg/registrationPage';
import ProfilePage from './pages/homeworkReg/profilePage';
import SettingsPage from './pages/homeworkReg/settingsPage';
import FeedPage from './pages/homeworkReg/feedPage'
import UsersPage from './pages/homeworkReg/usersPage'
import CreatePostPage from './pages/homeworkReg/createPostPage';
import OnePostPage from './pages/homeworkReg/onePostPage';
import UserPage from './pages/homeworkReg/userPage';

import {useSelector} from 'react-redux';

const Router = () => {
  const {user} = useSelector((state) => state.user)

  return (
    <BrowserRouter>
        <Routes>
            {
              user ? 
                <>
                  <Route path="/create" element={<CreatePostPage />} />
                  <Route path="/posts/:id" element={<OnePostPage />} />
                  <Route path="/friends" element={<UsersPage friendsPage={true}/>} />
                  <Route path="/users" element={<UsersPage />} />
                  <Route path="/users/:id" element={<UserPage />} />
                  <Route path="/feed" element={<FeedPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="*" element={<ProfilePage />} /> 
                </>
              : 
                <Route path="*" element={<RegistrationPage />} />
            }
        </Routes>
    </BrowserRouter>
  )
}

export default Router