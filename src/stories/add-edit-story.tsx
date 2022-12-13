 import React from 'react';
import { useParams } from 'react-router-dom';
import '../users/users.css';

export interface AddEditStoryProps {
    selectedUserId: string;
}

export const UserStories: React.FC<AddEditStoryProps> = (props: AddEditStoryProps) => {
    let { userId } = useParams();

    const handleAddStory = () => {
        alert('added');
    };

    return (
        <div className='screen'>
            <div>Stories:</div>
            <div>selectedUserId: {props.selectedUserId}</div>
            <div>userId: {userId}</div> 
            <button onClick={handleAddStory}>Add Story</button>
        </div>
    );
};

