import React from 'react'
import { Circles } from 'react-loader-spinner'

export const SpinnerComponent = ({ message }) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <Circles
        height="80"
        width="80"
        radius="9"
        color="#4fa94d"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
      <p className="text-lg text-center">{message}</p>
    </div>
  )
}
