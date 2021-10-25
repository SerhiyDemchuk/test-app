import React, { useState } from 'react'
import { useAppSelector } from '../hooks/redux';
import { RootState } from '../store/store';
import { makeStyles } from '@mui/styles';
import { ISquaresArray } from '../models/IMode';
import { Stack } from '@mui/material';
import { useDispatch } from 'react-redux';
import { modeSlice } from '../store/reducers/modeSlice';

interface Props {

}

const useStyles = makeStyles({
    square: {
        padding: 30,
        borderBottom: '1px solid #1f1f1f',
        borderLeft: '1px solid #1f1f1f',
    },
    squareHovered: {
        padding: 30,
        background: '#6ba6ff',
        borderBottom: '1px solid #1f1f1f',
        borderLeft: '1px solid #1f1f1f',
    },
    row: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        flexDirection: 'column',
        borderTop: '1px solid #1f1f1f',
        '&:last-child': {
            borderRight: '1px solid #1f1f1f',
        }
    },
    squareBlock: {
        display: 'flex',

    },
    container: {
        display: 'flex',
        justifyContent: 'space-around'
    }
});

interface SquareProps {
    id: number;
    rowIndex: number;
    colIndex: number;
    setSquaresArray: (v: any) => void;
    squaresArray: Array<ISquaresArray>;
}

const Square: React.FC<SquareProps> = ({ id, rowIndex, colIndex, setSquaresArray, squaresArray }) => {
    const classes = useStyles();
    const [isHovered, setIsHovered] = useState(false);
    const dispatch = useDispatch();

    const handleColor = () => {
        setIsHovered(!isHovered);
        setSquaresArray([{ col: colIndex, row: rowIndex }, ...squaresArray]);
        dispatch(modeSlice.actions.setSquares([{ col: colIndex, row: rowIndex }, ...squaresArray]))
    }

    return (
        <div
            onMouseOver={handleColor}
            className={isHovered ? classes.squareHovered : classes.square}>
        </div>
    );
};

const SquareBox: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { fieldAmount } = useAppSelector((store: RootState) => store.modeReducer);
    const [squaresArray, setSquaresArray] = useState([]);

    return (
        <Stack spacing={3}>
            <div className={classes.container}>
                <div className={classes.squareBlock}>
                    {
                        [
                            ...Array(fieldAmount.field),
                        ].map((value: undefined, rowIndex: number) => (
                            <div key={rowIndex} className={classes.row}>
                                {
                                    [
                                        ...Array(fieldAmount.field),
                                    ].map((value: undefined, index: number) => (
                                        <Square
                                            squaresArray={squaresArray}
                                            setSquaresArray={setSquaresArray}
                                            colIndex={rowIndex + 1}
                                            rowIndex={index + 1}
                                            key={index} id={index + 1}
                                        />
                                    ))
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        </Stack>
    );
};

export default SquareBox;
