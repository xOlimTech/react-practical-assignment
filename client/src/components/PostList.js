import  React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {filterPostsByKeyword, getPostsByPage,} from '../actions/postActions';
import './styles/post-list.css';
import Post from './Post';


const PostList = ({ userId, loggedInUser }) => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.posts);
    const totalPages = useSelector((state) => state.posts.totalPages);
    const [currentPage, setCurrentPage] = useState(1);
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        dispatch(getPostsByPage(currentPage));
    }, [dispatch, currentPage]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleSearch = () => {
         dispatch(filterPostsByKeyword(keyword));
     };

    return (



        <div className="post-list">
            <div className="search-bar">
                <span>"Hello"</span>
                <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Search posts"
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch();
                        }
                    }}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className="posts">
                {posts.map((post) => (
                    <Post key={post.id} post={post} userId={userId} loggedInUser={loggedInUser} />
                ))}
            </div>
            <div className="pagination">
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    Previous Page
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    Next Page
                </button>
            </div>
        </div>
        
    )
};

export default PostList;