import React from 'react';
import { State } from '../reducers/reducer';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getStoriesFromLocalStorageByUserId } from '../localStorage/localStorage-utils';
import { getUserNameByUserId } from '../localStorage/localStorage-utils';
import './users.css';

export const UsersPage: React.FC = () => {
    const navigate = useNavigate();
    const connectedUserId = useSelector((state: State) => state.loginReducer.userId);
    const users = useSelector((state: State) => state.loginReducer.users);

    const handleProfile = (id: string) => {
        navigate('/profile/' + id);
    }
    
    const handleStories = (id: string) => {
        navigate('/stories/' + id);
    }
        
    return (
        <div>
            <div>
                <div>My user name: <b>{getUserNameByUserId(connectedUserId)}</b> </div>
                <div className='space'></div>
                <div>
                    <button onClick={() => handleProfile(connectedUserId)}>Open my profile</button>&nbsp;&nbsp;
                    <button onClick={() => handleStories(connectedUserId)}>Open my stories</button>
                </div>
                <div className='space'></div>
            </div>
            <div>
                Registered users:
                <table className='table'>
                    <thead>
                    <tr>
                        <th>User name</th>
                        <th>View profile</th>
                        <th>View stories</th>
                        <th>Number of stories</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map(user => 
                    <tr key={user.userId}>
                        <td>{user.username}</td>
                        <td><button onClick={() => handleProfile(user.userId)}>Open profile</button></td>
                        <td><button onClick={() => handleStories(user.userId)}>Open stories</button></td>
                        <td className='storynumber'>{getStoriesFromLocalStorageByUserId(user.userId).length}</td>
                    </tr>)}
                    </tbody>    
                </table>
            </div>
        </div>
    );
};

////export const UsersPageContainer = connect
//export const UsersPageContainer = connect<UsersProps, any, any, State>
//(mapStateToProps)(UsersPage);

