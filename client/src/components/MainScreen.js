import React, {useState, useEffect, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Post from './Post';
import Modal from './Modal';
import {createPost, fetchPosts} from '../actions/postActions';

const MainScreen = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.currentUser);
    const posts = useSelector((state) => state.post.posts);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleCreatePost = useCallback(
        (postData) => {
            dispatch(createPost(postData));
            closeModal();
        },
        [dispatch]
    );

    const handleLogout = () => {
        // Очистка состояния при выходе
        dispatch({type: 'LOGOUT_USER'});
    }

    useEffect(() => {
        // Загрузка постов при монтировании компонента
        dispatch(fetchPosts());
    }, [dispatch]);

    return (
        <div>
            <h1>Main Screen</h1>
            {currentUser && <p>Hello, {currentUser}!</p>}
            <button onClick={openModal}>Create Post</button>
            <button onClick={handleLogout}>Logout</button>
            <Modal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleCreatePost}/>

            <p>All Posts: {posts.length}</p>
            {posts.reverse().map((post) => (
                <Post key={post.id} post={post}/>
            ))}

        </div>
    );
};

export default MainScreen;
