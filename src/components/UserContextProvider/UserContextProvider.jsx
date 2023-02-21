import React, {useState, useCallback, useMemo} from 'react';

import UserContext from '../../context';

import { useSnackbar } from 'notistack';

const UserContextProvider = ({children}) => {
    const { enqueueSnackbar } = useSnackbar()

    const localDataUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const localData = JSON.parse(localStorage.getItem("User") || null);
    const [user, setUser] = useState(localData);
    const signIn = useCallback((user) => {
        setUser(user)
    },[setUser])

    const signOut = useCallback(() => {
        setUser(null)
    },[setUser])
    
    const changeEmail = useCallback((email) => {
        const newData = {...user, email}
        setUser(newData)
        const newUsers = localDataUsers.map((u) => {
            if(u.id === user.id) {
                localStorage.setItem("User", JSON.stringify(newData));
                return newData;
            }
            return u;
        })
        enqueueSnackbar("You changed your email", { variant: "success" });
        localStorage.setItem("users", JSON.stringify(newUsers));
    },[user, localDataUsers, enqueueSnackbar])
    
    const changeAvatar = useCallback((avatar) => {
        const newData = {...user, avatar}
        setUser(newData)
        const newUsers = localDataUsers.map((u) => {
            if(u.id === user.id) {
                localStorage.setItem("User", JSON.stringify(newData));
                return newData;
            }
            return u;
        })
        enqueueSnackbar("You changed your avatar", { variant: "success" });
        localStorage.setItem("users", JSON.stringify(newUsers));
    },[user, localDataUsers, enqueueSnackbar])
    const changeName = useCallback ((name) => {
        const newData = {...user, name}
        setUser(newData)
        const newUsers = localDataUsers.map((u) => {
            if(u.id === user.id) {
                localStorage.setItem("User", JSON.stringify(newData));
                return newData;
            }
            return u;
        })
        enqueueSnackbar("You changed your name", { variant: "success" });
        localStorage.setItem("users", JSON.stringify(newUsers));
    },[user, localDataUsers, enqueueSnackbar])

    const changeDescription = useCallback((description) => {
        const newData = {...user, description}
        setUser(newData)
        const newUsers = localDataUsers.map((u) => {
            if(u.id === user.id) {
                localStorage.setItem("User", JSON.stringify(newData));
                return newData;
            }
            return u;
        })
        enqueueSnackbar("You changed your description", { variant: "success" });
        localStorage.setItem("users", JSON.stringify(newUsers));
    },[user, localDataUsers, enqueueSnackbar])

    const providerValues = useMemo(() => ({
        user, setUser, signIn, signOut, changeEmail, changeAvatar, changeName, changeDescription
    }), [user, setUser, signIn, signOut, changeEmail, changeAvatar, changeName, changeDescription])

  return (
    <UserContext.Provider value={providerValues}>
        {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider