import { Action } from 'redux';

export default interface ActionWithPayload extends Action {
    payload?: any;
}

