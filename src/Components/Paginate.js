import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationControlled({ count, currentPage, handleChange }) {

    return (
        <div className='flex justify-center'>
            <Stack spacing={2}>
                <Pagination count={count} page={currentPage} onChange={handleChange} />
            </Stack>
        </div>
    );
}