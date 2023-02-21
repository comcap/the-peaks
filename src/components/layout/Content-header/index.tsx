import React from 'react'
import styled from 'styled-components'

const LayoutHeader = styled.div`
  display: flex;
  justify-content: space-between;
  .filter {
    display: flex;
    align-items: center;
    span {
      display: none;
      margin-left: 7px;

      @media screen and (min-width: 768px) {
        display: block;
      }
    }

    select {
      margin-left: 10px;
      border: none;
      border-bottom: 1px solid var(--black);
      height: 40px;
      width: 100px;
      max-width: 200px;

      @media screen and (min-width: 1024px) {
        width: 200px;
      }
    }
  }
`

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
