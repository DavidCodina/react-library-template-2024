import './App.css'

import { Square /*, sum */ } from 'dc-react-ts-test-library'

function App() {
  return (
    <div>
      <Square
        style={{
          // backgroundColor: 'gray',
          border: '2px solid rgba(0,0,0,0.25)',
          borderRadius: 10,
          boxShadow: '0px 4px 8px rgba(0,0,0,0.5)'
        }}
        className='bg-lime-500'
      />
    </div>
  )
}

export default App
