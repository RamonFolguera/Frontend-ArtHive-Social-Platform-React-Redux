import { Body } from './layout/Body/Body'
import { NavBar } from './components/Navbar/NavBar'
import './App.scss'

export const App = () => {
  return (
     <>
<NavBar/>

<div className="App">
      <Body/>
    </div>
      
      </>
  )
}
