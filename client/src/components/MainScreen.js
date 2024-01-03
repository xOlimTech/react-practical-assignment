import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../actions/postActions';
import Post from './Post';

const MainScreen = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.currentUser);
    const posts = useSelector((state) => state.post.posts);
    const totalPages = useSelector((state) => state.post.totalPages);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(fetchPosts(currentPage));
    }, [dispatch, currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <h1>Main Screen</h1>
            <p>Welcome, {currentUser}!</p>

            {/* Display posts */}
            {posts.map((post) => (
                <Post key={post.id} post={post} />
            ))}

            {/* Pagination */}
            <div>
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                    <button key={page} onClick={() => handlePageChange(page)}>
                        {page}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default MainScreen;
