import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {fetchFilteredPosts, fetchPosts} from '../actions/postActions';

const SearchInput = () => {
    const [searchText, setSearchText] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        if (searchText.trim() === '') {
            dispatch(fetchPosts());
        } else {
            const delayDebounceFn = setTimeout(() => {
                dispatch(fetchFilteredPosts(searchText));
            }, 300);

            return () => clearTimeout(delayDebounceFn);
        }
    }, [searchText, dispatch]);

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    return (
        <input
            type="text"
            placeholder="Search posts..."
            value={searchText}
            onChange={handleSearch}
        />
    );
};

export default SearchInput;
