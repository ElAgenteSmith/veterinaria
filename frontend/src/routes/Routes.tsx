import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes as Switch,
  Navigate,
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
import MainLayout from 'layouts/MainLayout'
import { AuthProvider } from 'state/AuthState'
import { RequireAuth } from 'state/RequiteAuth'

const Routes: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <MainLayout>
          <Switch>
            <Route path="" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/home"
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            <Route
              path="/users"
              element={
                <RequireAuth>
                  <Users />
                </RequireAuth>
              }
            />
            <Route
              path="/users/:userId"
              element={
                <RequireAuth>
                  <UserDetail />
                </RequireAuth>
              }
            />
            <Route
              path="/veterinarians"
              element={
                <RequireAuth>
                  <Veterinarians />
                </RequireAuth>
              }
            />
            <Route
              path="/veterinarians/:veterinarianId"
              element={
                <RequireAuth>
                  <VeterinarianDetail />
                </RequireAuth>
              }
            />
            <Route
              path="/pets"
              element={
                <RequireAuth>
                  <Pets />
                </RequireAuth>
              }
            />
            <Route
              path="/pets/:petId"
              element={
                <RequireAuth>
                  <PetDetail />
                </RequireAuth>
              }
            />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Switch>
        </MainLayout>
      </AuthProvider>
    </Router>
  )
}

export default Routes
