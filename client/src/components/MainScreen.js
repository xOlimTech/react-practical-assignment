import React, {useState, useEffect, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Post from './Post';
import Modal from './Modal';
import {createPost, fetchPosts} from '../actions/postActions';
import {logoutUser} from "../actions/userActions";
import SearchInput from "./SearchInput";
import '../bootstrap.min.css';

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

    // return (
    //     <div>
    //         <h1>Main Screen</h1>
    //         {currentUser && <p>Hello, {currentUser}!</p>}
    //         <button onClick={openModal}>Create Post</button>
    //         <button onClick={handleLogout}>Logout</button>
    //         <Modal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleCreatePost}/>
    //         <SearchInput/>
    //         {posts.map((post) => (
    //             <Post key={post.id} post={post}/>
    //         ))}
    //         <div>
    //             <button onClick={() => handlePageChange(pageNumber - 1)} disabled={pageNumber === 1}>
    //                 Previous
    //             </button>
    //             <span> Page {pageNumber} </span>
    //             <button onClick={() => handlePageChange(pageNumber + 1)} disabled={posts.length < postsPerPage}>
    //                 Next
    //             </button>
    //         </div>
    //     </div>
    // );
    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <h1>Main Screen</h1>
                    {currentUser && (
                        <p className="lead">Hello, {currentUser}!</p>
                    )}
                </div>
                <div className="d-flex align-items-center">
                    <button className="btn btn-primary mr-2" onClick={openModal}>Create Post</button>
                    <SearchInput />
                    {currentUser && (
                        <button className="btn btn-danger ml-2" onClick={handleLogout}>Logout</button>
                    )}
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleCreatePost}/>
            {posts.map((post) => (
                <Post key={post.id} post={post}/>
            ))}
            <div className="mt-3">
                <button
                    className="btn btn-secondary mr-2"
                    onClick={() => handlePageChange(pageNumber - 1)}
                    disabled={pageNumber === 1}
                >
                    Previous
                </button>
                <span className="align-middle"> Page {pageNumber} </span>
                <button
                    className="btn btn-secondary ml-2"
                    onClick={() => handlePageChange(pageNumber + 1)}
                    disabled={posts.length < postsPerPage}
                >
                    Next
                </button>
            </div>
        </div>
    );


};
export default MainScreen;
