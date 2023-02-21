import React, { LegacyRef } from 'react'

import { Spiner } from './loader.style'

type IPropsLoader = {
  ref?: LegacyRef<HTMLDivElement>
}

const DefaultLoader: React.FunctionComponent<IPropsLoader> = () => {
  return (
    <Spiner>
      <div className="loader"></div>
    </Spiner>
  )
}

export default DefaultLoader
