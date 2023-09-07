import { FC, useReducer, PropsWithChildren } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { EntriesContext, entriesReducer } from '.';
import { Entry } from '@/interfaces';

export interface EntriesState {
    entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: [
        {
            _id: uuidv4(),
            description: 'todo 1',
            status: 'pending',
            createdAt: Date.now(),
        },
        {
            _id: uuidv4(),
            description: 'todo 2',
            status: 'in-progress',
            createdAt: Date.now(),
        },
        {
            _id: uuidv4(),
            description: 'todo 3',
            status: 'finished',
            createdAt: Date.now(),
        }
    ],
}

export const EntriesProvider:FC<PropsWithChildren> = ({ children }) => {

    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

    const addNewEntry = ( description: string ) => {

        const newEntry: Entry = {
            _id: uuidv4(),
            description,
            createdAt: Date.now(),
            status:'pending'
        }

        dispatch({ type: '[Entry] Add-Entry', payload: newEntry })

    }

    return (
        <EntriesContext.Provider value={{
            ...state,
            //Methods
            addNewEntry,
        }}>
            { children }
        </EntriesContext.Provider>
    )
};