import React, { useState } from 'react'

export const DropdownMenu = () => {
  const [dropdownState, setDropdownState] = useState(false);


  const showDropdown = () => {
    setDropdownState(!dropdownState);
  }




  return (
    <div className="dropdown">
      
      <div 
      className="dropdown-menu" 
      onClick = {() => showDropdown()}>

        <ul>
          <li></li>
        </ul>


      </div>
      
      
      </div>
  )
}
