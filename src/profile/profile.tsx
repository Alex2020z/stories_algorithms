//https://stackoverflow.com/questions/45898789/react-router-pass-param-to-component

import React from 'react';
import { useParams } from 'react-router-dom';
import { getUserNameByUserId } from '../localStorage/localStorage-utils';

export interface UserProfileProps {
    selectedUserId: string;
}

export const UserProfile: React.FC = () => {
    let { userId } = useParams();

    return (
        <div>
            <div className='space'></div>
            <div><b>Profile:</b></div>
            <div>User name: <b>{userId ? getUserNameByUserId(userId) : ''}</b></div>
        </div>
    );
};

