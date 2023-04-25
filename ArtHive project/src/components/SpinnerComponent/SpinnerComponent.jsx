import React from 'react'
import { ThreeDots } from 'react-loader-spinner'

export const SpinnerComponent = ({ message }) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <ThreeDots
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
