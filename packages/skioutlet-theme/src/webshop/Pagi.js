  import React from 'react'
import { generatePath } from 'react-router-dom';
import Link from "@frontity/components/link"

import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { connect } from "frontity";

const Pagi = ({ state, totalPageNum, searchTerm, pageNum, handlePageClick }) => {

  const data = state.source.get(state.router.link)

    // const location = state.router.link;
    // const query = new URLSearchParams(location.search);
    // const page = parseInt(query.get('page') || '1', 15);
  return (
    <Pagination
      className='paginationSettings topPagination'
      onClick={handlePageClick}  
      page={pageNum}
      count={totalPageNum}
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          link={generatePath(`/shop${item.page === 1 ? '' : `/page/${item.page}`}${searchTerm.length > 0 ? `?s=${searchTerm}` : ""}`)}
          {...item}
        />
      )}
    />
  )
}

export default connect(Pagi);