import React, {useState, useEffect} from 'react'

import { Link, useParams } from 'react-router-dom';

import ProfileRouter from '../../../components/homeworkReg/profileRouter';

import { useSnackbar } from 'notistack'
import { useSelector, useDispatch } from 'react-redux';
import { getPostById, deletePostById, editPostById } from '../../../store/postsSlice';
import { getUserById } from '../../../store/userSlice';

import s from './onePostPage.module.scss';

const OnePostPage = () => {
  const  { id } = useParams();
  const { user, userById } = useSelector(state => state.user);
  const { post } = useSelector(state => state.posts);

  const dispatch = useDispatch();

  const {enqueueSnackbar} = useSnackbar();
  
  const [editing, setEditing] = useState(false);
  
  const [newTitle, setNewTitle] = useState(post?.title);
  const [newText, setNewText] = useState(post?.text);

  const titleInputChangeHandler = (e) => {
    setNewTitle(e.target.value)
  };
  
  const textInputChangeHandler = (e) => {
    setNewText(e.target.value)
  };

  useEffect(() => {
    dispatch(getUserById(post?.user))
  }, [dispatch, post?.user]);

  useEffect(() => {
    dispatch(getPostById(id));
  }, [dispatch, id]);
  
  const deletePost = () => {
    dispatch(deletePostById(id));
  }

  const editingSwitcher = () => {
    setEditing(editing => !editing);
  }


  const editPost = () => {
    if(newTitle && newText) {
      const data = {
        id, title : newTitle, text: newText
      }
      dispatch(editPostById(data));
      enqueueSnackbar('The post has been edited!', { variant: `success` })
      setNewText("");
      setNewTitle("");
    } else {
      enqueueSnackbar('Incomplete data!', { variant: `error` })
      setNewText("");
      setNewTitle("");
    }
    setEditing(false);
  }

  return (
    <div className={s.space}>
      <ProfileRouter />
      <div className={s.onePost}>
        <div className={s.onePost__container}>
          <div className={s.onePost__title}>
            {editing ? 
                        <input 
                          type="text"
                          name="title"
                          value={newTitle}
                          onChange={titleInputChangeHandler} 
                          className={s.editPost}/> 
                        : post?.title}
          </div>
          <div className={s.onePost__info}>
            <img src={post?.img} alt="postImage" className={s.onePost__image} />
            <div className={s.onePost__desc}>
              {editing ? <textarea 
                          type="text"
                          name="text"
                          value={newText}
                          onChange={textInputChangeHandler} 
                          className={s.editPost}/> 
              : post?.text}
            </div>
          </div>
          <div>
            <Link to={"/users/" + userById?.id} className={s.onePost__profile}>
              <img src={userById?.avatar} alt="userAvatar" className={s.onePost__profile_avatar}/>
              <div className={s.onePost__profile_name}>{userById?.email}</div>
            </Link>
          </div>
          { 
            Number(user.id) === Number(userById?.id) && 
            <div className={s.onePost__settings}>
              <button className={s.onePost__delete} onClick={deletePost}>Delete</button>
              { editing ? 
              <>
                <button className={s.onePost__edit} onClick={editPost} style={{background : "green"}}>Yes</button>
                <button className={s.onePost__edit} onClick={editingSwitcher} style={{background : "black"}}>No</button>
              </>
               :
              <button className={s.onePost__edit} onClick={editingSwitcher}>Edit</button>
              }
            </div> 
          }
        </div>
      </div>
      <div className={s.unnecessary}></div>
    </div>
  )
}

export default OnePostPage