import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Posts from "../../../components/homeworkReg/posts/Posts";

import ProfileRouter from "../../../components/homeworkReg/profileRouter";

import usePagination from '../../../hooks/usePagination';

import { getPosts } from "../../../store/postsSlice";
import { getUsers } from "../../../store/userSlice";

import s from "./feedPage.module.scss";

const FeedPage = () => {
  const { posts } = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  const {currentData, disabledNext, disabledPrev, prevPage, nextPage, setMyData} = usePagination();

  useEffect(() => {
    dispatch(getPosts());
    dispatch(getUsers());
    setMyData(posts);
  }, [dispatch, setMyData]);

  return (
    <div className={s.space}>
      <ProfileRouter />
      <div className={s.feed}>
        <div className={s.feed__content}>
          <div className={s.feed__title}>Recent posts</div>
          <Link to="/create">
            <button className={s.feed__add}>Add new post</button>
          </Link>
          {
            posts.length <= 0 || (
            <>
              <Posts posts={currentData}/>
              <div className={s.feed__pagination}>
                <button style={{opacity: !disabledPrev ? 0.4: 1}} onClick={prevPage} disabled={!disabledPrev}>Prev</button>
                <button style={{opacity: !disabledNext ? 0.4: 1}} onClick={nextPage} disabled={!disabledNext}>Next</button>
              </div>
            </>
          )}
        </div>
      </div>
      <div className={s.unnecessary}></div>
    </div>
  );
};

export default FeedPage;
