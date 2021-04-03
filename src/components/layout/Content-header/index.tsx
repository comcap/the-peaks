import styled from 'styled-components'
import bookMark from 'assets/bookmarkon-icon@2x.svg'
import { Button } from 'components/input'
import React from 'react'

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
  onFilter?: (val: string) => void
}

const ContentHeader: React.FC<IPropsLayoutHeader> = ({
  title,
  showBookMark,
  showFilter,
  onFilter,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilter && onFilter(e.target.value)
  }

  return (
    <LayoutHeader>
      <h1>{title}</h1>
      <div className='filter'>
        {showBookMark && (
          <Button>
            <img src={bookMark} alt='bookMark' />
            <span> VIEW BOOKMARK</span>
          </Button>
        )}

        {showFilter && (
          <select onChange={handleChange}>
            <option value='new'>Newest first</option>
            <option value='old'>Oldest first</option>
            <option value='most'>Most popular</option>
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
  onFilter: () => {},
}

export default ContentHeader
