import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { setUserName, setUserId, setUserList } from '../reducers/login-reducer/actions';
import { useNavigate } from 'react-router-dom';
import { getUsersFromLocalStorage, isUserFoundInLocalStorage, 
    getLocalStorageUserId, saveNewUserInLocalStorage } from '../localStorage/localStorage-utils';
import './login.css';

const WARNING_FILL = 1;
const WARNING_USER_NOT_FOUND = 2;
const WARNING_USER_DUPLICATED = 3;
const WARNING_USER_CREATED = 4;

export interface LoginProps {
    isNew: boolean;
}

interface PageProps extends LoginProps {
    isNew: boolean;
};

export const Login: React.FC<PageProps> = ({ isNew }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [credenialsCreated, setCredenialsCreated] = useState(false);
    const [warning, setWarning] = useState(0);
    const dispatch = useDispatch();
    //localStorage.clear(); //uncomment to clean up data

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(setUserId(''));
        setUsername('');
        setPassword('');
    }, 
    []);

    useEffect(() => {
        if(credenialsCreated) {
            navigate('/');
        }
    }, 
    [credenialsCreated, navigate]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (username.trim() === '' || password.trim() === '') {
            setUserWarning(WARNING_FILL);
            return;
        }

        isNew ? registerUser(event) : findUser(event);
    };

    const findUser = (event: React.FormEvent<HTMLFormElement>) => {
        if (isUserFoundInLocalStorage(username, password)) {
            const lsUserId = getLocalStorageUserId(username, password);
            dispatch(setUserName(username));
            dispatch(setUserId(lsUserId));
            dispatch(setUserList(getUsersFromLocalStorage()));

            navigate('/algorithms');
        } else {
            setUserWarning(WARNING_USER_NOT_FOUND);
            setUsername('');
            setPassword('');
        }
    };

    const registerUser = (event: React.FormEvent<HTMLFormElement>) => {
        if (!isUserFoundInLocalStorage(username, password)) {
            saveNewUserInLocalStorage(username, password);
            setUserWarning(WARNING_USER_CREATED);
            setCredenialsCreated(true);
        }
        else {
            setUserWarning(WARNING_USER_DUPLICATED);
        }

        setUsername('');
        setPassword('');
    };

    const handleChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setUsername(event.target.value);
    };

    const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setPassword(event.target.value);
    };

    const setUserWarning = (warn: number) => {
        setWarning(warn);
        setTimeout(() => {
            setWarning(0);
        }, 3000);
    }

    return (
        <div className='screen'>
            <div className='title'>DEMO APPLICATION: USERS & ALGORITHMS</div>
            <div className='space2'></div>
            <div>
                <div className='login'>{isNew ? 'Register: ' : 'Enter login:'}</div>
                <form onSubmit={event => handleSubmit(event)} className='form'>
                    <div>
                        <label htmlFor="userName">Your user name:&nbsp;&nbsp;
                            <input type="text" className='input' id="userName" onChange={event => handleChangeUsername(event)} value={username}/>
                        </label>
                    </div>
                    <div>
                        <label htmlFor="password">Your password:&nbsp;&nbsp;&nbsp;
                            <input type="password" className='input' id="password" onChange={event => handleChangePassword(event)} value={password}/>
                        </label>
                    </div>
                    <button className='submit'>Submit</button>
                </form>
            </div>
            <div>
                {!isNew && (<button className='register' onClick={() => {window.location.href = '/newuser'}}>Register a new user</button>)}
            </div>
            <div>
                {warning === WARNING_FILL && <div className='warning'>Fill in username and password.</div>}
                {warning === WARNING_USER_NOT_FOUND && <div className='warning'>User {username} has not been found. Try to enter the credentials again.</div>}
                {warning === WARNING_USER_DUPLICATED && <div className='warning'>Cannot be saved. Enter different credentials.</div>}
                {warning === WARNING_USER_CREATED && <div className='warning'>User {username} has been created.</div>}
            </div>
        </div>
    );
}		
