import React from 'react';
import { State } from '../reducers/reducer';
import { useSelector } from 'react-redux';
import './algorithms.css';

const EmptyPage: React.FC = () => {
    const isLoading = useSelector((state: State) => state.loginReducer.isLoading); //see call of thunk in Login

    if (isLoading) {
        return (
            <div>
                <div className='space'></div>
                <div className='loading'>Loading...</div>
            </div>
        )
    }

    return (
        <div>
            <div className='space'></div>
            <div><b>Users and Stories</b> - добавьте свои истории или прочитайте истории других пользователей</div>
            <div><b>Algorithms</b> - Выберите один из алгоритмов для тестирования</div>
        </div>
    )
}

export default EmptyPage;