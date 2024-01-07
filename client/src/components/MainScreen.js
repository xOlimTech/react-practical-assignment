import React, {useState, useEffect, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Post from './Post';
import Modal from './Modal';
import {createPost, fetchPosts} from '../actions/postActions';
import {logoutUser} from "../actions/userActions";

const MainScreen = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.currentUser);
    const posts = useSelector((state) => state.post.posts);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const postsPerPage = 9;

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
        dispatch(logoutUser());
    }
    const handlePageChange = (newPageNumber) => {
        setPageNumber(newPageNumber);
    };

    useEffect(() => {
        dispatch(fetchPosts(pageNumber, postsPerPage));
    }, [dispatch, pageNumber, postsPerPage]);

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

            {/* Добавьте компоненты для отображения пагинации */}
            <div>
                <button onClick={() => handlePageChange(pageNumber - 1)} disabled={pageNumber === 1}>
                    Previous
                </button>
                <span> Page {pageNumber} </span>
                <button onClick={() => handlePageChange(pageNumber + 1)} disabled={posts.length < postsPerPage}>
                    Next
                </button>
            </div>

        </div>
    );
};

export default MainScreen;
