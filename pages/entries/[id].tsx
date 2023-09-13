import { useState, useMemo, FC, useContext } from "react";
import { GetServerSideProps } from "next";
import { capitalize, Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, IconButton } from "@mui/material";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Layout } from "@/components/layouts"
import { Entry, EntryStatus } from "@/interfaces";
import { dbEntries } from "@/database";
import { EntriesContext } from "@/context/entries";


const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished']

interface Props {
    entry: Entry
}

export const EntryPage:FC<Props> = ( { entry } ) => {

    const { updateEntry } = useContext(EntriesContext);

    const [inputValue, setInputValue] = useState(entry.description);
    const [status, setStatus] = useState<EntryStatus>(entry.status);
    const [touched, setTouched] = useState(false);

    const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched]);

    const onInputValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const onStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStatus(event.target.value as EntryStatus);
    }

    const onSave = () => {
        if ( inputValue.trim().length === 0 ) return;

        const updatedEntry: Entry = {
            ...entry,
            description: inputValue,
            status
        }

        updateEntry(updatedEntry, true);
    }

    return (
        <Layout title={ inputValue.substring(0,15) + '...' }>
            <Grid
                container
                justifyContent='center'
                sx={{ marginTop: 2 }}
            >
                <Grid item xs={ 12 } sm={ 8 } md={ 6 }>
                    <Card>
                        <CardHeader 
                            title={`Entry:`}
                            subheader={ `Created at ...` }
                        />
                        <CardContent>
                            <TextField 
                                sx={{ marginTop: 2, marginBottom: 1 }}
                                fullWidth
                                placeholder="New entry"
                                autoFocus
                                multiline
                                label="New entry"
                                value={ inputValue }
                                onChange={ onInputValueChange}
                                helperText={ isNotValid && 'Description is required' }
                                onBlur={ () => setTouched(true)}
                                error={ isNotValid }
                            />

                            <FormControl>
                                <FormLabel>Status:</FormLabel>
                                <RadioGroup
                                    row
                                    value={ status }
                                    onChange={ onStatusChange }
                                >
                                    {
                                        validStatus.map( option => (
                                            <FormControlLabel 
                                                key={ option }
                                                value={ option }
                                                control={ <Radio /> }
                                                label={ capitalize(option) }
                                            />
                                        ) )
                                    }
                                </RadioGroup>
                            </FormControl>

                        </CardContent>

                        <CardActions>
                            <Button
                                startIcon={ <SaveOutlinedIcon /> }
                                variant="contained"
                                fullWidth
                                onClick={ onSave }
                                disabled={ inputValue.length <= 0 }
                            >
                                Save
                            </Button>
                        </CardActions>

                    </Card>
                </Grid>
            </Grid>
            <IconButton sx={{
                position: 'fixed',
                bottom: 30,
                right: 30,
                backgroundColor: 'red'
            }}>
                <DeleteOutlinedIcon />
            </IconButton>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async({ params }) => {
    
        const { id } = params as { id: string };

        const entry = await dbEntries.getEntryById(id);

        if (!entry) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false
                }
            }
        }
    
        return {
            props: {
                entry
            }
        }
    }

export default EntryPage;