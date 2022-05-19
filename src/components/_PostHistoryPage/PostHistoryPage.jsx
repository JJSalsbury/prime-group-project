import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { List, Container } from '@mui/material'
import HistoryItem from '../_HistoryItem/HistoryItem';

function PostHistoryPage() {
    const history = useHistory();
    const dispatch = useDispatch();

    const user = useSelector(store => store.user);
    const postHistory = useSelector(store => store.postHistoryReducer);

    // dispatch will get the user's post history and set it in the postHistoryReducer
    useEffect(() => {
        dispatch({
            type: 'GET_POST_HISTORY'
        })
    }, [])

    return (
        <div>
            <h2>{user.username}'s Post History</h2>
            <Container>
                <List>
                    {/* map through the postHistoryReducer */}
                    {postHistory.map(post => {
                        return (
                            <HistoryItem
                                key={post.id}
                                post={post}
                            />
                        )
                    })}
                </List>
            </Container>

        </div>
    );
}

export default PostHistoryPage;