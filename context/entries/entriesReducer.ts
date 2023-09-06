import { EntriesState } from ".";

type EntriesActionType = 
    | { type: '[Entries] - ActionNAme' }

export const entriesReducer = ( state: EntriesState, action: EntriesActionType ): EntriesState => {
    switch (action.type) {
        default:
            return state;
    }
}