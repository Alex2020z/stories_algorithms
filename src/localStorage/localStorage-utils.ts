//USERS:
export interface User {
    username: string,
    password: string,
    userId: string,
}

export interface UsersProps {
	users: User[];
	connectedUserName: string;
	connectedUserId: string;
}


export const getLocalStorageUserId = (username: string, password: string): string => {
    //example: 'user-username|password'
    const userId = 'user-' + username.trim().toLowerCase() + '|' + password;
    return userId;
};

export const getUserNameByUserId = (userId: string): string => {
    if (userId === '') {
        console.log('empty user id');
        return '';
    }
    const arr2 = userId.split('-')[1].split('|');
    return arr2[0];
};


export const isUserFoundInLocalStorage = (username: string, password: string): boolean => {
    for(let key in localStorage) {
        if (!localStorage.hasOwnProperty(key)) {
          continue; // пропустит такие ключи, как "setItem", "getItem" и так далее
        }

        const res = key.split('-');
        if (res.length === 2) {
        
            const keyVal = localStorage.getItem(key);
            const obj = JSON.parse(keyVal ? keyVal : '');
            if (obj.username === username && obj.password === password) {
                return true;
            }
        }
    }

    return false;
};

export const getUsersFromLocalStorage = (): any[] => {
    //user in Local Sorage: key = 'user-usernamepassword', item is User
        const users = [];

        for(let key in localStorage) {
            if (!localStorage.hasOwnProperty(key)) {
              continue; // пропустит такие ключи, как "setItem", "getItem" и так далее
            }

            const res = key.split('-'); //for 'user-username|password' keep ['user', 'username|password']
   
            if (res.length === 2) {
                const keyVal = localStorage.getItem(key);
                const user = JSON.parse(keyVal ? keyVal : '');
                users.push(user);
            }
        }
        return users;
    }

export const saveNewUserInLocalStorage = (username: string, password: string) => {
        const lsUserId = getLocalStorageUserId(username, password);

        const user: User = {
            username: username,
            password: password,
            userId: lsUserId, 
        };

        const packedUser = JSON.stringify(user);
        localStorage.setItem(lsUserId, packedUser);
    }

//STORIES: =====================================================================
export interface Story {
    storyText: string,
    storyNumber: number, //N
    userId: string, //'user-username|password'
    date: number,
    storyId: string,
}

const isStory = (key: string): boolean => {
    const keyArr = key.split('-');
    return keyArr[0] === 'story';
};

const getUserIdByStoryUserId = (key: string): string => {
    const keyArr = key.split('/');
    return keyArr[1]; //user-username|password
};

export const getStoriesFromLocalStorageByUserId = (userId: string): any[] => {
    //story in Local Sorage: key = 'story-N/user-usernamepassword', item is Story
    const stories = [];

    for(let key in localStorage) {
        if (!localStorage.hasOwnProperty(key)) {
          continue; // пропустит такие ключи, как "setItem", "getItem" и так далее
        }

        if (isStory(key)) {
            if (getUserIdByStoryUserId(key) === userId) {
                const packedStory = localStorage.getItem(key);
                const story = JSON.parse(packedStory ? packedStory : '');

                stories.push(story);
            }
        }
    }

    const storiesSorted = stories.sort((a, b) => {return b.storyNumber - a.storyNumber});

    return storiesSorted;
};

export const getStoryTextFromLocalStorageByStoryId = (storyId: string): string => {
    //story in Local Sorage: key = 'story-N/user-username|password', item is Story
    const packedStory = localStorage.getItem(storyId);
    if (packedStory) {
        const story: Story = JSON.parse(packedStory);
        return story.storyText;
    }
    return '';
};


const getLocalStorageStoryId = (userId: string, count: number): string => {
    const res = 'story-' + count + '/' + userId;
    return res;
};

export const saveNewStoryInLocalStorage = (userId: string, storyText: string) => {
    //story in Local Sorage: key = 'story-N/user-usernamepassword', item is Story

    //find number of stories:
    let storyCount = 0;
    for(let key in localStorage) {
        if (!localStorage.hasOwnProperty(key)) {
          continue; // пропустит такие ключи, как "setItem", "getItem" и так далее
        }

        if (isStory(key)) {
            storyCount ++;
        }
    }

    const currStoryNumber = storyCount + 1;

    const lsStoryId = getLocalStorageStoryId(userId, currStoryNumber);

    const story: Story = {
        storyText: storyText,
        storyNumber: currStoryNumber,
        userId: userId, 
        date: Date.now(),
        storyId: lsStoryId,
    };

    const packedStory = JSON.stringify(story);
    localStorage.setItem(lsStoryId, packedStory);
};

export const saveUpdatedStoryInLocalStorage = (storyId: string, storyText: string) => {
    const packedStory = localStorage.getItem(storyId);
    const story: Story = JSON.parse(packedStory ? packedStory : '');
    story.storyText = storyText;
    const updatedStory = JSON.stringify(story);
    localStorage.setItem(storyId, updatedStory);
};

export const deleteStoryFromLocalStorage = (storyId: string) => {
    //console.log('before: storyId=', storyId);
    //console.log('before: packedStory=', localStorage.getItem(storyId));
    localStorage.removeItem(storyId);
    //console.log('after: packedStory=', localStorage.getItem(storyId));
};


//COMMENTS:
export const getLocalStorageCommentId = (commentNumber: number, storyNumber: number, userId: string): string => {
    const commentId = 'comment-' + commentNumber + '/' +  storyNumber + '/' + userId;
    return commentId;
};
