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
  display: flex;
  justify-content: center;
  cursor: pointer;
  text-align: center;
  align-self: flex-end;
  width: 80px;
  border-bottom: 2px solid var(--white);
  height: 44px;
  align-items: center;

  .input-icon {
    height: 18px;
  }
`

const InputSearch = styled.div`
  align-self: flex-end;
  width: 100%;
  display: flex;

  input {
    &::placeholder {
      color: #5e82bc;
    }
    color: var(--white);

    align-self: flex-end;
    background-color: var(--secondary);
    width: 100%;
    height: 44px;
    border: none;
    border-bottom: 2px solid var(--white);
    padding: 0px 12px;
  }

  .input-icon {
    height: 18px;
    position: absolute;
    right: 40px;
    bottom: 36px;
  }

  @media screen and (min-width: 1024px) {
    width: auto;
    display: block;

    input {
      width: 300px;
    }
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
      <img className="input-icon" src={searchWhite} alt="searchWhite" />
    </InputButton>
  )
}

export default SearchComponent
