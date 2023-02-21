import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeData } from "../../../store/userSlice";

import { Link } from "react-router-dom";

import s from "./user.module.scss";

const User = ({ id, img, name, email }) => {
  const { user } = useSelector((state) => state.user);
  const [friend, setFriend] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    user.friends.find((friend) => {
      if (Number(friend) === Number(id)) {
        setFriend(true);
      }
    });
  }, [dispatch, id, user.friends]);

  const switchFriend = () => {
    if (!friend) {
      dispatch(changeData({ ...user, friends: [...user.friends, Number(id)] }));
      setFriend(true);
    } else {
      dispatch(
        changeData({
          ...user,
          friends: user.friends.filter((friend) => friend !== Number(id)),
        })
      );
      setFriend(false);
    }
  };

  return (
    <div className={s.user}>
      {
      Number(user.id) === Number(id) ? (
        <div className={s.user__container}>
          <div className={s.itsYou}>Это вы</div>
        </div>
      ) : (
          <div className={s.user__container}>
            <Link to={"/users/" + id} className={s.user__container}>
              <div className={s.user__image}>
                <img src={img} alt="userImage" className={s.image} />
              </div>
              <div className={s.user__info}>
                <div className={s.user__name}>{name}</div>
                <div className={s.user__email}>{email}</div>
              </div>
            </Link>
            <button className={s.user__follow} onClick={switchFriend}>
              {friend ? "Unfollow" : "Follow"}
            </button>
          </div>
      )}
    </div>
  );
};

export default User;
