import { Route, Routes } from "react-router-dom"
import { Home } from './pages/index'

const App = () => {
  return (
    <>
      <Routes>

        <Route path="/" element={<Home />} />

        {/* <Route exact path='/'>
          <Route index element={<Home />} />
          <Route exact path={':id'} element={<Home />} />
        </Route> */}

      </Routes>
    </>
  )
}

export default App