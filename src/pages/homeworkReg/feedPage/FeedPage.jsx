import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Posts from "../../../components/homeworkReg/posts/Posts";

import ProfileRouter from "../../../components/homeworkReg/profileRouter";

import { getPosts } from "../../../store/postsSlice";
import { getUsers } from "../../../store/userSlice";

import s from "./feedPage.module.scss";

const FeedPage = () => {
  const { posts } = useSelector((state) => state.posts);

  const dispatch = useDispatch();
  
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);

  const lastIndex = currentPage * postsPerPage;
  const firstIndex = lastIndex - postsPerPage;
  const currentPosts = posts.slice(firstIndex, lastIndex);

  const disabledNext = Math.ceil(posts.length / 3) > currentPage;
  const disabledPrev = currentPage > 1;

  useEffect(() => {
    dispatch(getPosts());
    dispatch(getUsers());
  }, [dispatch]);

  const prevPage = () => setCurrentPage(prev => prev - 1);
  const nextPage = () => setCurrentPage(prev => prev + 1);

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
              <Posts posts={currentPosts}/>
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
