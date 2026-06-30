import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/Home/homePage"
import HomeScreen from "./pages/Home/homeScreen"

import {ToastContainer} from 'react-toastify'





function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/homescreen" element={<HomeScreen />} />
      </Routes>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </BrowserRouter>
  )
}

export default App