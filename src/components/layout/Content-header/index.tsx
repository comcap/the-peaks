import React from 'react'

import { LayoutHeader } from './contentHeader.style'

export type IPropsLayoutHeader = {
  title?: string
  showBookMark?: boolean
  showFilter?: boolean
  filterValue?: string
  onFilter?: (val: string) => void
}

const ContentHeader: React.FC<IPropsLayoutHeader> = ({
  title,
  showFilter,
  onFilter,
  filterValue
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilter && onFilter(e.target.value)
  }

  return (
    <LayoutHeader>
      <h1>{title}</h1>
      <div className="filter">
        {showFilter && (
          <select value={filterValue} onChange={handleChange}>
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        )}
      </div>
    </LayoutHeader>
  )
}

ContentHeader.defaultProps = {
  title: 'Title',
  showBookMark: true,
  showFilter: true,
  onFilter: () => {}
}

export default ContentHeader
