import { makeStyles } from '@mui/styles';
import React from 'react'
import { ISquaresArray } from '../models/IMode';

interface Props {
    squaresArray: Array<ISquaresArray>
}

const useStyles = makeStyles({
    block: {
        backgroundColor: '#f5ebae',
        color: '#887247',
        borderRadius: 8,
        display: 'flex',
        margin: '5px 0',
        padding: '0 10px',
    },
    items: {
        height: 400,
        width: 150,
        padding: '0 10px', 
        overflow: 'auto',
    },
})

const List: React.FC<Props> = ({ squaresArray }) => {
    const classes = useStyles();
    return (
        <div>
            <h2>
                Hover squares
            </h2>
            <div className={classes.items}>
                {
                    squaresArray.map((item, index) => (
                        <div key={index} className={classes.block}>
                            <h5> row {item.row} col {item.col}</h5>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default List;
