import React, {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Login } from "./login/login";
import { useSelector } from 'react-redux';
import { State } from './reducers/reducer';
import { UsersPage } from "./users/users";
import { UserProfile } from "./profile/profile";
import { UserStories } from "./stories/stories";
import EmptyPage from "./algorithms/emptyPage";
import AlgorithmHashTable from "./algorithms/algorithmHashTable";
import AlgorithmSort from "./algorithms/algorithmSort";
import AlgorithmSearchWordInString from "./algorithms/algorithmSearchWordInString";
import AlgorithmTree from "./algorithms/algorithmTree";
import AlgorithmGraph from "./algorithms/algorithmGraph";
import TaskPathNumber from "./algorithms/taskPathNumber";
import TaskSearchCelebrity from "./algorithms/taskSearchCelebrity";
import TaskFindPairEqualN from "./algorithms/taskFindPairEqualN";
import TaskStackTemperature from "./algorithms/taskStackTemperature";
import './App.css';
import './algorithms/algorithms.css';

const App: React.FC = () => {
    const [links, setLinks] = useState(false);
    const connectedUserId = useSelector((state: State) => state.loginReducer.connectedUserId);
    const handleClick = () => setLinks(false);

    return (
        <div className='screen'>
            <div className='inside'>
            <BrowserRouter>
                {connectedUserId && (
                <nav className={'nav'}>
                    <div>
                    <span>
                    <Link to='/users' className={'link'}  onClick={() => setLinks(false)}>Users and Stories</Link>
                    </span>
                    <span>
                    <Link to='/algorithms' className={'link'} onClick={() => setLinks(!links)}>Algorithms</Link>
                    <div>                    
                        {links && (
                            <ul>
                                <li><Link to="/algsort" onClick={handleClick}>Алгоритмы сортировки (метод пузырька, merge sort, insert sort)</Link></li>
                                <li><Link to="/alghashtable" onClick={handleClick}>Алгоритм: Хеш-таблица (метод цепочек)</Link></li>
                                <li><Link to="/algtree" onClick={handleClick}>Алгоритм: АВЛ-дерево</Link></li>
                                <li><Link to="/alggraph" onClick={handleClick}>Алгоритмы для графов (DFS, BFS, Дейкстры)</Link></li>
                                <li><Link to="/algsearchwordinstring" onClick={handleClick}>Алгоритм Бойера-Мура-Хорспула: найти слово во фразе</Link></li>
                                <li><Link to="/taskpathnumber" onClick={handleClick}>Задача: поиск максимального числа путей в прямоугольнике</Link></li>
                                <li><Link to="/tasksearchcelebrity" onClick={handleClick}>Задача: поиск знаменитости</Link></li>
                                <li><Link to="/taskfindpair" onClick={handleClick}>Задача: найти пару в сумме равную заданному числу</Link></li>
                                <li><Link to="/tasktemperature" onClick={handleClick}>Задача: вычислить сколько дней до ближайшего более теплого дня</Link></li>
                            </ul>
                        )}
                        </div>
                    </span>
                    </div>
                </nav>
                )}
                <Routes>
                    <Route path="/" element={<Login isNew={false} />} />
                    <Route path="/newuser" element={<Login isNew={true}  />} />
                    <Route path="/users" element={<UsersPage />} />
                    <Route path="/profile/:userId" element={<UserProfile  />} />
                    <Route path="/stories/:userId" element={<UserStories selectedUserId={connectedUserId} />} />
                    <Route path="/algorithms" element={<EmptyPage />} />
                    <Route path="/alghashtable" element={<AlgorithmHashTable />} />
                    <Route path="/algsort" element={<AlgorithmSort />} />
                    <Route path="/algsearchwordinstring" element={<AlgorithmSearchWordInString />} />
                    <Route path="/algtree" element={<AlgorithmTree />} />
                    <Route path="/alggraph" element={<AlgorithmGraph />} />
                    <Route path="/taskpathnumber" element={<TaskPathNumber />} />
                    <Route path="/tasksearchcelebrity" element={<TaskSearchCelebrity />} />
                    <Route path="/taskfindpair" element={<TaskFindPairEqualN />} />
                    <Route path="/tasktemperature" element={<TaskStackTemperature />} />
                </Routes>
            </BrowserRouter>
        </div>
    </div>
    );
}

export default App;

/*
//TASK FROM https://www.freecodecamp.org/news/5-react-projects-you-need-in-your-portfolio/
Build a Social Media App
If I had to recommend only one app for you to add to your portfolio, it would be a social media app. 
Twitter, Facebook, and Instagram are quite sophisticated, and include an ever-growing number of 
features to keep users engaged. On top of that, it's the kind of app you likely know best regarding 
how it should function.

There are a number of features common among almost all social media apps:

- the ability for users to make posts with text and/or media files,
- a live feed of those posts,
- enabling other users to like and comment on posts,
- as well as user authentication.
- And once you've got that down, you can add profiles for each of your users, 
  where they can personalize their account as well as manage the users they're following.

App examples: Instagram, Twitter, Snapchat, Reddit

Technologies to utilize:

Create React App or Next.js to make a dynamic UI of posts, likes, and messages
Firebase, AWS Amplify, or Hasura (using GraphQL with subscriptions) for real-time data
Serverless functions like AWS Lambda or Firebase Functions for notifications
Cloudinary or Firebase storage for uploading pictures or video  

//интересные аппликации - https://codesandbox.io/examples/package/react-redux-typescript
//https://learn.javascript.ru/localstorage
*/
