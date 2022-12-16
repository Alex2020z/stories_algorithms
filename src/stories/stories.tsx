//https://www.newline.co/@dmitryrogozhny/how-to-display-modal-dialog-in-react-with-react-modal--dbf46cda
import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import Modal from "react-modal";
import { getStoriesFromLocalStorageByUserId, saveNewStoryInLocalStorage, 
    getStoryTextFromLocalStorageByStoryId, saveUpdatedStoryInLocalStorage, 
    deleteStoryFromLocalStorage, Story } from '../localStorage/localStorage-utils';
import { getUserNameByUserId } from '../localStorage/localStorage-utils';
import '../users/users.css';

export interface UserStoriesProps {
    selectedUserId: string;
}

export const UserStories: React.FC<UserStoriesProps> = (props: UserStoriesProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedStoryId, setSelectedStoryId] = useState('');
    const [stories, setStories] = useState<Story[]>([]);
    const [storyToBeDeleted, setStoryToBeDeleted] = useState('');
    const ref = React.useRef(null);
    const currUserId = React.useRef('');
    let { userId } = useParams();
    currUserId.current = userId ? userId : '';

    useEffect(() => {
        setStories(getStoriesFromLocalStorageByUserId(currUserId.current));
    }, [setStories, isOpen, selectedStoryId]);

    useEffect(() => {
        if (storyToBeDeleted) {
            deleteStoryFromLocalStorage(storyToBeDeleted);
            setStories(getStoriesFromLocalStorageByUserId(currUserId.current));
        }
        
        setStoryToBeDeleted('');
    }, [storyToBeDeleted, setStories, setStoryToBeDeleted]);

    function toggleModal(isSave?: boolean) {
        if (isOpen) {
            //const text = document.getElementsByTagName("textarea")[0].value; //2nd method
            if (ref.current && isSave === true) {
                const textArea: HTMLTextAreaElement = ref.current;
                //setStoryText(textArea.value);
                if (selectedStoryId) {
                    saveUpdatedStoryInLocalStorage(selectedStoryId, textArea.value);
                    setSelectedStoryId('');
                } else {
                    saveNewStoryInLocalStorage(props.selectedUserId, textArea.value);
                }
            }
        }

        setIsOpen(!isOpen);
    }

    const getStoryAsArray = (text: string): string[] => {
        const arr = text.match(/[^\r\n]+/g);
        return arr ? arr : [''];
    };
    const getStoryAsLineWithBreaks = (text: string): string => {
        return getStoryAsArray(text).join("\n");
    };

    const canShow = (): boolean => {
        return currUserId.current === props.selectedUserId;
    };

    const handleAddEditStory = (storyId: string): void => {
        setSelectedStoryId(storyId);
        toggleModal();
    };

    const handleDeleteStory = (storyId: string): void => {
        setStoryToBeDeleted(storyId);
    };

    const getStories = (): JSX.Element[] => {
        return (
            stories.map((story, ind) => 
                <div  key={ind}>
                    <textarea 
                        value={getStoryAsLineWithBreaks(story.storyText)}
                        style={{height: '70px', width: '400px'}}  
                        readOnly
                    >
                    </textarea>
                    &nbsp;
                    {canShow() && (
                        <div>
                            <div className='space'></div>
                            <button onClick={() => handleAddEditStory(story.storyId)}>Edit Story</button>&nbsp;
                            <button onClick={() => handleDeleteStory(story.storyId)}>Delete Story</button>
                        </div>
                    )}
                    &nbsp;
                </div>
                )
        );
    };

    const getModalDialog = () => {
        const text = selectedStoryId ? getStoryTextFromLocalStorageByStoryId(selectedStoryId) : '';

        return (<Modal isOpen={isOpen} contentLabel="Story" ariaHideApp={false}>
            <div className='screen'>
            <div className='inside'>
                <div><b>Story:</b></div>
                <div className='space'></div>
                <div>
                    <textarea 
                        ref={ref} 
                        defaultValue={text}
                        style={{width: '400px', height: '400px'}}>
                    </textarea>
                </div>
                <div className='space'></div>
                <div>
                    <button onClick={() => toggleModal(true)}>Save</button>
                    &nbsp;
                    <button onClick={() => toggleModal(false)}>Cancel</button>
                </div>
            </div>
            </div>
        </Modal>)
    };
    
    return (
        <div>
            <div className='space'></div>
            <div><b>Stories by user {getUserNameByUserId(currUserId.current)}:</b></div>
            <div className='space'></div>
            {stories.length > 0 && (<div>{getStories()}</div>)}
            {canShow() && (<button onClick={() => handleAddEditStory('')}>Add Story</button>)}
        `   <div>
                {getModalDialog()}
            </div>`
        </div>
    );
};
