import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from './Home'
import { CreateItem } from "./CreateItem";
import { EditItem } from "./EditItem";
import { UserSettings } from "./UserSettings";

import { GoogleLogin } from '@react-oauth/google';
import { Login } from "./Login";
import ProtectedRoutes from "./ProtectedRoutes";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Home></Home>}></Route>
          </Route>

          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/create_item" element={<CreateItem></CreateItem>}></Route>
          <Route path="/edit_item/:id" element={<EditItem></EditItem>}></Route>
          <Route path="/user_settings" element={<UserSettings></UserSettings>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App