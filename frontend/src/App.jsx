import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from './Home'
import { CreateItem } from "./CreateItem";
import { EditItem } from "./EditItem";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/create_item" element={<CreateItem></CreateItem>}></Route>
          <Route path="/edit_item/:user_id/:name" element={<EditItem></EditItem>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

{/* <div className='text-red-700 text-xl'>
<div>
  <h1>App</h1>
  {data.map((d, i) => (
    <div key={i}>
      <p>{d.id}</p>
      <p>{d.name}</p>
    </div>
  ))}
</div>
</div> */}