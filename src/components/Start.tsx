import React, { useState } from 'react';

import { InputLabel, MenuItem, FormControl, Select, SelectChangeEvent, Stack, Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { RootState } from '../store/store';
import { modeSlice } from "../store/reducers/modeSlice";
import { makeStyles } from '@mui/styles';
import { useForm } from 'react-hook-form';
import List from './List';
import SquareBox from './SquareBox';

interface Props {

}

const useStyles = makeStyles({
    select: {
        display: 'flex',
        alignItems: 'center'
    }
})

const Start: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { handleSubmit } = useForm();
    const { modes, squaresHovered } = useAppSelector((store: RootState) => store.modeReducer);
    const dispatch = useAppDispatch();
    const [mode, setMode] = useState<string>('');
    const [choose, setChoose] = useState<boolean>(false);
    const [chooseMode, setChooseMode] = useState<any>('');

    const getValue = (item: string) => {
        setChooseMode(modes[item]);
    };

    const handleChange = (event: SelectChangeEvent) => {
        setMode(event.target.value as string);
        setChoose(true);

        if (event.target.value === '') {
            setChoose(false);
            dispatch(modeSlice.actions.setValue({ field: 0 }));
        }
    };

    const onSubmit = () => {
        dispatch(modeSlice.actions.setValue(chooseMode));
    }

    return (
        <Stack pl={1} pt={1} spacing={3} direction="row" alignItems="flex">
            <Stack spacing={3} direction="column">
                <form className={classes.select} onSubmit={handleSubmit(onSubmit)}>
                    <FormControl sx={{ mr: 1, minWidth: 190 }}>
                        <InputLabel id="demo-simple-select-helper-label">Pick mode</InputLabel>
                        <Select
                            size="small"
                            onChange={handleChange}
                            label="Pick mode"
                            value={mode}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {Object.keys(modes).map((item, index) => (
                                <MenuItem key={index} onClick={() => getValue(item)} value={item}>
                                    <em>{item}</em>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button type="submit" disabled={!choose} variant="contained">Start</Button>
                </form>
                <SquareBox />
            </Stack>
            <List squaresArray={squaresHovered} />
        </Stack>
    );
};

export default Start;
