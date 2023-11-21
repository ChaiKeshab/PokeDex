import { Route, Routes } from "react-router-dom"
import TeamPanel from './layout/TeamPanel'
import { Home, MyTeam } from './pages/index'
// import { Link } from "react-router-dom"

const App = () => {
  return (
    <>

      {/* <div className="flex justify-center gap-3 p-2">
        <Link className="py-2 px-4 bg-gray-300 rounded-lg" to="/">Home</Link>
        <Link className="py-2 px-4 bg-gray-300 rounded-lg" to="/myteam">MyTeam</Link>
      </div> */}

      <TeamPanel />


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/myteam" element={<MyTeam />} />

      </Routes>
    </>
  )
}

export default App