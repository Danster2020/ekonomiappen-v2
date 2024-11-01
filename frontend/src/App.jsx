import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from './Home'
import { CreateItem } from "./CreateItem";
import { EditItem } from "./EditItem";
import { UserSettings } from "./UserSettings";
import { Login } from "./Login";
import ProtectedRoutes from "./ProtectedRoutes";
import { ExamplePage } from "./ExamplePage";
import { useEffect, useState } from "react";

function App() {

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/create_item" element={<CreateItem></CreateItem>}></Route>
            <Route path="/edit_item/:id" element={<EditItem></EditItem>}></Route>
            <Route path="/user_settings" element={<UserSettings toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode}></UserSettings>}></Route>
          </Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/example_page" element={<ExamplePage></ExamplePage>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App