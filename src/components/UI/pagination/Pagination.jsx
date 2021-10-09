import React from 'react'
import { usePagination } from '../../../hooks/usePagination';
import cl from './Pagination.module.css'

function Pagination({ totalPages, page, changePage }) {
  const pagesArray = usePagination(totalPages);

  return (
    <div className={cl.pageWrapper}>
      {pagesArray.map(p =>
        <span className={p === page ? [cl.page, cl.pageCurrent].join(' ') : cl.page} key={p} onClick={e => changePage(p)}>{p}</span>
      )}
    </div>
  )
}

export default Pagination
