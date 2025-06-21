import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ButtonGroup, Button, Box, Typography } from '@mui/material';
import { increment, clear, toggleDisable } from '../store/counterSlice';

const CounterButtonGroup = () => {
  const dispatch = useDispatch();
  const { count, isDisabled } = useSelector((state) => state.counter);

  const handleClick = () => {
    if (!isDisabled) {
      dispatch(increment());
    }
  };

  const handleClear = () => {
    dispatch(clear());
  };

  const handleToggleDisable = () => {
    dispatch(toggleDisable());
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
      <Typography variant="h4" component="h2" sx={{ mb: 4 }}>
        第一題：Material-UI ButtonGroup 操作邏輯
      </Typography>
      <ButtonGroup
        orientation="vertical"
        variant="outlined"
        aria-label="Vertical button group"
        sx={{
          '& .MuiButton-root': {
            width: '200px',
            height: '56px',
            fontSize: '18px',
            fontWeight: 'bold',
          },
        }}
      >
        <Button
          onClick={handleClick}
          disabled={isDisabled}
        >
          CLICK:{count}
        </Button>
        <Button
          onClick={handleClear}
        >
          CLEAR
        </Button>
        <Button
          onClick={handleToggleDisable}
        >
          {isDisabled ? 'ABLE' : 'DISABLE'}
        </Button>
      </ButtonGroup>
      
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          💡 使用 Redux 管理狀態
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ✅ 實現了所有需求功能
        </Typography>
      </Box>
    </Box>
  );
};

export default CounterButtonGroup; 