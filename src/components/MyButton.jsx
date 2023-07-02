import { Button } from '@mui/material';
import React, { Children } from 'react';

const MyButton = (props) => {
    return (
        <Button className='p-4 bg-amber-500'>{props.children}</Button>
    );
};

export default MyButton;