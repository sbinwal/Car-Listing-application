"use client"
import React from 'react'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const PaginationComponent = ({totalPageCount,onPageChange,currentPage}) => {
  return (
    <Stack spacing={2}>
      <Pagination count={totalPageCount} page={currentPage} onChange={(event, page) => onPageChange(page)} color="primary" />
     </Stack>
  )
}

export default PaginationComponent
