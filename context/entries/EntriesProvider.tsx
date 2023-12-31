import { FC, useReducer, PropsWithChildren, useEffect } from 'react';
import { EntriesContext, entriesReducer } from '.';
import { useSnackbar } from 'notistack';
import { Entry } from '@/interfaces';
import { entriesApi } from '@/apis';

export interface EntriesState {
    entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: [],
}

export const EntriesProvider:FC<PropsWithChildren> = ({ children }) => {

    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);
    const { enqueueSnackbar } = useSnackbar();

    const addNewEntry = async( description: string ) => {

        const { data } = await entriesApi.post<Entry>('/entries', { description });
        dispatch({ type: '[Entry] Add-Entry', payload: data })

    }

    const updateEntry = async( entry: Entry, showSnackbar = false ) => {

        try {

            const { data } = await entriesApi.put<Entry>(`/entries/${ entry._id }`, entry);
            dispatch({ type: '[Entry] Update-Entry', payload: data })

            if ( showSnackbar ) {
                enqueueSnackbar('Entry updated', {
                    variant: 'success',
                    autoHideDuration: 2000,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    }
                });
            }

        } catch (error) {
            console.log({ error });
        }

        
    }

    const refreshEntries = async() => {
        const { data } = await entriesApi.get<Entry[]>('/entries');
        dispatch({ type: '[Entry] Refresh-Entries', payload: data });
    }

    useEffect(() => {
        refreshEntries();
    }, []);

    return (
        <EntriesContext.Provider value={{
            ...state,
            //Methods
            addNewEntry,
            updateEntry,
        }}>
            { children }
        </EntriesContext.Provider>
    )
};