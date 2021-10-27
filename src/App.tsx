import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from './hooks/redux';
import { RootState } from './store/store';
import { fetchModes } from './store/reducers/actionCreators';
import Start from './components/Start';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Stack } from '@mui/material';

interface Props {

}

function CircularIndeterminate() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', top: '50%'}}>
      <CircularProgress />
    </Box>
  );
}

const App: React.FC<Props> = (props: Props) => {
    const { isLoading } = useAppSelector((store: RootState) => store.modeReducer);
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        dispatch(fetchModes());
    }, [dispatch]);

    return (
        <div>
            {
                isLoading ? (
                    <div style={{ height: '100vh'}}>
                        <CircularIndeterminate />
                    </div>
                ) : (
                    <Stack>
                        <Start />
                    </Stack>
                )
            }
        </div>
    );
};

export default App;
