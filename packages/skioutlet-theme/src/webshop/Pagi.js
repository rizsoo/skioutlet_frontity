import React from 'react'
import Link from "@frontity/components/link"

import { connect, styled } from "frontity";

const Pagi = ({ state, sorting, totalPageNum, searchTerm, pageNum, handlePageClick, setPageNum }) => {

  let siblingCount = 1;
  let totalPageNumArray = Array.from(Array(totalPageNum + 1).keys()).slice(1);

  const leftSiblingIndex = Math.max(pageNum - siblingCount, 1);
  const rightSiblingIndex = Math.min(pageNum + siblingCount, totalPageNum);
  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPageNum - 2;
  const firstPageIndex = 1;
  const lastPageIndex = totalPageNum;

function specialPagination() {
  if(totalPageNum < 8) {
    return totalPageNumArray;
  } else if (!shouldShowLeftDots && shouldShowRightDots) {
    let leftItemCount = 3 + 2 * siblingCount;
    let leftRange = Array.from(Array(leftItemCount + 1).keys()).slice(1);
    return [...leftRange, "...", totalPageNum];
  } else if (shouldShowLeftDots && !shouldShowRightDots) {
      
    let rightItemCount = 3 + 2 * siblingCount;
    let rightRange = Array.from(Array(totalPageNum + 1).keys()).slice(totalPageNum - rightItemCount + 1);
    return [firstPageIndex, "...", ...rightRange];
  } else if (shouldShowLeftDots && shouldShowRightDots) {
    let middleRange = Array.from(Array(rightSiblingIndex + 1).keys()).slice(leftSiblingIndex);
    return [firstPageIndex, "...", ...middleRange, "...", lastPageIndex];
  }
}

  return (
    <Pagination>
      {specialPagination().map((el, index) => {
        return (
          <Link key={index} link={`/shop/oldal/${el}${sorting == undefined ? "" : `?orderby=${sorting}`}${searchTerm.length > 0 ? `${sorting !== undefined ? "&" : "?"}s=${searchTerm}` : ""}`}>
            <PageNumber 
              onClick={() => setPageNum(el)}  
              style={pageNum === el ?{backgroundColor: "#e1e1e1"} : null}>
            {String(el)}
            </PageNumber>
          </Link>
        )
      })}
    </Pagination>
  )
}
const Pagination = styled.div`
  display: flex;
  align-items: center;
`
const PageNumber = styled.p`
  font-size: 1rem;
  font-weight: 500;
  min-width: 40px;
  min-height: 40px;
  padding: 0 6px;
  margin: 0 3px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
  @media (max-width: 600px) {
    font-size: 1.3rem;
  }
`

export default connect(Pagi);