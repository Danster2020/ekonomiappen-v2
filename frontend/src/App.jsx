import React, { useEffect, useState } from 'react'

function App() {
  const [data, setData] = useState([])
  useEffect(() => {
    fetch("http://localhost:8081/items")
      .then(res => res.json())
      .then(data => setData(data))
      // .then(data => console.log(data))
      .catch(err => console.log(err))
  }, [])
  return (
    <div className='text-red-700 text-xl'>
      <div>
        <h1>App</h1>
        {data.map((d, i) => (
          <div key={i}>
            <p>{d.id}</p>
            <p>{d.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App