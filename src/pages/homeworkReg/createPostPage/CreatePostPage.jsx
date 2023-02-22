import React, {useState} from 'react'

import { useSelector, useDispatch } from 'react-redux';
import { addPost } from '../../../store/postsSlice';

import ProfileRouter from '../../../components/homeworkReg/profileRouter';

import s from './createPostPage.module.scss';

const CreatePostPage = () => {

  const {user} = useSelector(state => state.user);
    
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    img: "",
    title: "",
    text: "",
    user: user.id
  });

  const inputChangeHandler = (e) => {
    const {value, name} = e.target;

    setFormData((data) => {
        return {
            ...data,
            [name]: value
        }
    })
  };

  const createPost = () => {
    if(formData.img && formData.text && formData.title) {
      dispatch(addPost(formData))
    }
  }

  return (
    <div className={s.space}>
      <ProfileRouter />
      <div className={s.create}>
        <div className={s.create__container}>
          <div className={s.create__title}>Post creation</div>
          <div className={s.create__create_post}>
            <form className={s.create__form}>
              <div className={s.create__info}>
                <label className={s.label}>
                  <div className={s.label__title}>Image url</div>
                    <input 
                        type="text" 
                        name="img"
                        value={formData.img}
                        onChange={inputChangeHandler}
                    />
                </label>
                <label className={s.label}>
                  <div className={s.label__title}>Title</div>
                    <input 
                        type="text" 
                        name="title"
                        value={formData.title}
                        onChange={inputChangeHandler}
                    />
                </label>
                <label className={s.label}>
                    <div className={s.label__title}>Text</div>
                    <textarea 
                        name="text"
                        value={formData.text}
                        onChange={inputChangeHandler}
                    />
                </label>
              </div>
              <button type="submit" className={s.submit} onClick={createPost}>Create</button>
            </form>
          </div>
        </div>
      </div>
      <div className={s.unnecessary}></div>
    </div>
  )
}

export default CreatePostPage