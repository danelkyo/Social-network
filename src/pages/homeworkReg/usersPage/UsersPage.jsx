import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProfileRouter from "../../../components/homeworkReg/profileRouter";

import Users from "../../../components/homeworkReg/usersPag/Users";

import { getUsers } from "../../../store/userSlice";

import s from "./usersPage.module.scss";

const UsersPage = ({friendsPage}) => {
  const {user, users} = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [friends, setFriends] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(3);

  const lastIndex = currentPage * usersPerPage;
  const firstIndex = lastIndex - usersPerPage;

  const currentUsers = friendsPage ? friends.slice(firstIndex, lastIndex) : users.slice(firstIndex, lastIndex);
  
  const disabledNext = friendsPage ? Math.ceil(friends.length / 3) > currentPage : Math.ceil(users.length / 3) > currentPage;
  const disabledPrev = currentPage > 1;
  
  const howManyFriends = friends.length <= 0;

  const prevPage = () => setCurrentPage(prev => prev - 1);
  const nextPage = () => setCurrentPage(prev => prev + 1);

  useEffect(() => {
    dispatch(getUsers());
    const friends = user.friends.map(friend => users.find(user => Number(user.id) === Number(friend)));
    setFriends(friends);
  }, [dispatch, user.friends]);


  return (
    <div className={s.space}>
      <ProfileRouter />
      <div className={s.users}>
        <div className={s.container}>
          <div className={s.users__title}>{friendsPage ? "Friends" : "Users"}</div>
          {(howManyFriends && friendsPage) || (
            <>
              {users.length <= 0 || (
                <>
                  <Users friendsPage={friendsPage} currentUsers={currentUsers}/>
                  <div className={s.users__pagination}>
                    <button className={s.users__pagination_button} style={{opacity: !disabledPrev ? 0.4: 1}} onClick={prevPage} disabled={!disabledPrev}>Prev</button>
                    <button className={s.users__pagination_button} style={{opacity: !disabledNext ? 0.4: 1}} onClick={nextPage} disabled={!disabledNext}>Next</button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
      <div className={s.unnecessary}></div>
    </div>
  );
};

export default UsersPage;
