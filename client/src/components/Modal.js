import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createPost, uploadPostPicture} from '../actions/postActions';
import '../bootstrap.min.css';

const Modal = ({isOpen, onClose}) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);
    const currentUser = useSelector((state) => state.user.currentUser);

    const handleSave = async () => {
        try {
            const post = {title: title, username: currentUser};
            const createdPost = await dispatch(createPost(post));
            const postId = createdPost.payload.id;

            if (file) {
                const formData = new FormData();
                formData.append('picture', file);
                await dispatch(uploadPostPicture({postId, formData}));
            }
            onClose();
        } catch (error) {
            console.error('Error when creating a post:', error);
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        <div style={{display: isOpen ? 'block' : 'none'}} className="input-group">
            <div className="input-group">
                <span className="input-group-text" id="addon-wrapping">Title: </span>
                <input className="form-control"
                       type="text"
                       id="postTitle"
                       value={title}
                       onChange={(e) => setTitle(e.target.value)}
                />
                <label htmlFor="postPicture" className="btn btn-outline-primary ml-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-cloud-upload" viewBox="0 0 16 16">
                        <path fillRule="evenodd"
                              d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"/>
                        <path fillRule="evenodd"
                              d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708z"/>
                    </svg>
                    Upload Picture
                    <input
                        type="file"
                        id="postPicture"
                        onChange={handleFileChange}
                        style={{display: 'none'}}
                    />
                </label>
            </div>
            <br/>
            <button variant="primary" className="btn btn-primary ml-2" onClick={handleSave}>Save</button>
            <button variant="secondary" className="btn btn-danger ml-2" onClick={onClose}>Cancel</button>
            <hr/>
        </div>
    );
};
export default Modal;

