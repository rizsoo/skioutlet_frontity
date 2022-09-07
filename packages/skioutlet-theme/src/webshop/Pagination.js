import React from 'react'
import { connect, styled } from "frontity"
import PaginationBox from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { generatePath } from 'react-router-dom';
import Link from "@frontity/components/link"

const Pagination = ({ sorting, searchTerm, handlePageClick, pageNum, totalPageNum }) => {
  return (
    <PaginationBox
        hidePrevButton hideNextButton
        className='paginationSettings topPagination'
        onClick={handlePageClick}  
        page={pageNum}
        count={totalPageNum}
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            link={generatePath(`/shop/oldal/${item.page}${sorting == undefined ? "" : `?orderby=${sorting}`}${searchTerm.length > 0 ? `${sorting !== undefined ? "&" : "?"}s=${searchTerm}` : ""}`)}
            {...item}
          />
        )}
      />
  )
}

export default connect(Pagination)