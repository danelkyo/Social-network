import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProfileRouter from "../../../components/homeworkReg/profileRouter";
import Users from "../../../components/homeworkReg/usersPag/Users";

import usePagination from '../../../hooks/usePagination';

import { getUsers } from "../../../store/userSlice";

import s from "./usersPage.module.scss";

const UsersPage = ({friendsPage}) => {
  const {user, users} = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const {currentData, disabledNext, disabledPrev, prevPage, nextPage, setMyData, setCurrentPage} = usePagination();
  
  const howManyFriends = user.friends.length <= 0;

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

    useEffect(() => {
      if(friendsPage) {
        const friends = user.friends.map(friend => users.find(user => Number(user.id) === Number(friend)));
        setMyData(friends);
        setCurrentPage(1);
      } else {
        setMyData(users);
      }
    }, [dispatch, friendsPage, setCurrentPage, setMyData, user.friends]);
  

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
                  <Users friendsPage={friendsPage} currentUsers={currentData}/>
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
