import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes as Switch,
} from 'react-router-dom'
import Welcome from 'pages/welcome/Welcome'
import SignUp from 'pages/singUp/SingUp'
import Login from 'pages/login/Login'
import Home from 'pages/home/Home'
import Users from 'pages/users/Users'
import UserDetail from 'pages/users/UserDetail'
import Veterinarians from 'pages/veterinarians/Veterinarians'
import VeterinarianDetail from 'pages/veterinarians/VeterinarianDetail'
import Pets from 'pages/pets/Pets'
import PetDetail from 'pages/pets/PetDetail'
import NotFound from 'pages/notFound/NotFound'
import MainLayout from 'layouts/MainLayout'

const Routes: React.FC = () => {
  return (
    <Router>
      <MainLayout>
        <Switch>
          <Route path="" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:userId" element={<UserDetail />} />
          <Route path="/veterinarians" element={<Veterinarians />} />
          <Route
            path="/veterinarians/:veterinarianId"
            element={<VeterinarianDetail />}
          />
          <Route path="/pets" element={<Pets />} />
          <Route path="/pets/:petId" element={<PetDetail />} />
          <Route path="*" element={<NotFound />} />
        </Switch>
      </MainLayout>
    </Router>
  )
}

export default Routes
