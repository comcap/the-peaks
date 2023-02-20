import React from 'react'
import styled from 'styled-components'

import searchWhite from 'assets/search-icon@2x.svg'

type IPropsSearchComponent = {
  showSearch: boolean
  onSearch: (val: string) => void
  onOpen: () => void
  onBlur: () => void
}

const InputButton = styled.div`
  cursor: pointer;
  text-align: center;
  align-self: flex-end;
  width: 80px;
  border-bottom: 2px solid var(--white);
  padding-bottom: 6px;
`

const InputSearch = styled.div`
  align-self: flex-end;
  input {
    &::placeholder {
      color: #5e82bc;
    }
    color: var(--white);

    align-self: flex-end;
    background-color: var(--secondary);
    width: 300px;
    height: 44px;
    border: none;
    border-bottom: 2px solid var(--white);
    padding: 0px 12px;
  }

  .input-icon {
    position: absolute;
    right: 40px;
    bottom: 36px;
  }
`

const SearchComponent: React.FC<IPropsSearchComponent> = ({
  showSearch,
  onOpen,
  onBlur,
  onSearch
}) => {
  return showSearch ? (
    <InputSearch>
      <input
        type="text"
        onChange={(e) => {
          onSearch(e.target.value)
        }}
        autoFocus
        onBlur={onBlur}
        placeholder="Search all news"
      />
      <img className="input-icon" src={searchWhite} alt="searchWhite" />
    </InputSearch>
  ) : (
    <InputButton onClick={onOpen}>
      <img src={searchWhite} alt="searchWhite" />
    </InputButton>
  )
}

export default SearchComponent
