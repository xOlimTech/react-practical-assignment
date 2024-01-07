// // Modal.js
// import React, {useState} from 'react';
// import {useDispatch, useSelector} from 'react-redux';
// import {createPost} from '../actions/postActions';
//
// const Modal = ({isOpen, onClose}) => {
//     const dispatch = useDispatch();
//     const [title, setTitle] = useState('');
//     const currentUser = useSelector((state) => state.user.currentUser);
//
//     const handleSave = async () => {
//         const post = {title: title, username: currentUser};
//         await dispatch(createPost(post));
//         onClose();
//     };
//
//     return (
//         <div style={{display: isOpen ? 'block' : 'none'}}>
//             <div>
//                 <label htmlFor="postTitle">Title: </label>
//                 <input
//                     type="text"
//                     id="postTitle"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                 />
//             </div>
//
//             <button onClick={handleSave}>Save</button>
//             <button onClick={onClose}>Cancel</button>
//         </div>
//     );
// };
//
/// Modal.js
// Modal.js
// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { createPost } from '../actions/postActions';
//
// const Modal = ({ isOpen, onClose }) => {
//     const dispatch = useDispatch();
//     const [title, setTitle] = useState('');
//     const [file, setFile] = useState(null);
//     const currentUser = useSelector((state) => state.user.currentUser);
//
//     const handleSave = async () => {
//         try {
//             const post = { title: title, username: currentUser, file: file };
//
//             // Используем createPost из createAsyncThunk
//             const createdPost = await dispatch(createPost(post));
//
//             if (file && createdPost && createdPost.id) {
//                 const formData = new FormData();
//                 formData.append('picture', file);
//
//                 // Используем асинхронный action для загрузки изображения
//                 await dispatch(
//                     createPost.fulfilled(
//                         { id: createdPost.id, title, username: currentUser, file },
//                         null,
//                         null
//                     )
//                 );
//             }
//
//             onClose();
//         } catch (error) {
//             console.error('Error when creating a post:', error);
//         }
//     };
//
//     const handleFileChange = (e) => {
//         setFile(e.target.files[0]);
//     };
//
//     return (
//         <div style={{ display: isOpen ? 'block' : 'none' }}>
//             <div>
//                 <label htmlFor="postTitle">Title: </label>
//                 <input
//                     type="text"
//                     id="postTitle"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                 />
//             </div>
//
//             <div>
//                 <label htmlFor="postPicture">Picture: </label>
//                 <input type="file" id="postPicture" onChange={handleFileChange} />
//             </div>
//
//             <button onClick={handleSave}>Save</button>
//             <button onClick={onClose}>Cancel</button>
//         </div>
//     );
// };
//
// export default Modal;
// Modal.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, uploadPostPicture } from '../actions/postActions';

const Modal = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);
    const currentUser = useSelector((state) => state.user.currentUser);

    const handleSave = async () => {
        try {
            const post = { title: title, username: currentUser };

            const createdPost = await dispatch(createPost(post));
            const postId = createdPost.payload.id;

            if (file) {
                const formData = new FormData();
                formData.append('picture', file);

                await dispatch(uploadPostPicture({ postId, formData }));
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
        <div style={{ display: isOpen ? 'block' : 'none' }}>
            <div>
                <label htmlFor="postTitle">Title: </label>
                <input
                    type="text"
                    id="postTitle"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="postPicture">Picture: </label>
                <input
                    type="file"
                    id="postPicture"
                    onChange={handleFileChange}
                />
            </div>

            <button onClick={handleSave}>Save</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
};

export default Modal;

