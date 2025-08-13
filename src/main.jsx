import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { BrowserRouter, Route, Routes } from "react-router-dom"

import WelcomePage from './routes/WelcomePage.jsx'
import Layout from './routes/Layout.jsx'
// import App from './App.jsx'
import RabbitDisplayPage from './routes/RabbitDisplayPage.jsx'
// import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import RabbitDetail from './routes/RabbitDetail.jsx'
import PetSimulationPage from './routes/PetSimulationPage.jsx'
import SimulationInstructionPage from './routes/SimulationInstructionPage.jsx'

import Shelter from './components/shelter/Shelter.jsx'

import SavedRabbitsPage from './routes/SavedRabbitsPage.jsx';
import Article from './components/article/Article.jsx'
import UserProfile from './components/userProfile/UserProfile.jsx'
import Notification from './components/notification/Notification.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  {/* normal app route */}
    <Routes>
      <Route path='/' element={<WelcomePage/>}/>
      
      <Route path='/display' element={<Layout/>}>
        <Route index element={<RabbitDisplayPage/>}/>
        <Route path='detail/:id' element={<RabbitDetail/>}/>
        <Route path='simulation/:id' element={<PetSimulationPage/>}/>
        <Route path='simulation-instruction/:id/:name' element={<SimulationInstructionPage/>}/>
        <Route path='shelter' element={<Shelter/>}/>
        <Route path='saved' element={<SavedRabbitsPage />} />
        <Route path='article' element={<Article />} />
        <Route path='user-profile' element={<UserProfile />} />
        <Route path='notification' element={<Notification />} />
      </Route>
    </Routes>

    {/* only pet simulation page */}

    {/* <Routes>

      <Route path='/' element={<SimulationInstructionPage/>}/>
      
      <Route path='/display' element={<Layout/>}>
        <Route index element={<RabbitDisplayPage/>}/>
        <Route path='detail/:id' element={<RabbitDetail/>}/>
        <Route path='simulation/:id' element={<PetSimulationPage/>}/>
        <Route path='simulation-instruction/:id/:name' element={<SimulationInstructionPage/>}/>
      </Route>

    </Routes> */}
  </BrowserRouter>
)
