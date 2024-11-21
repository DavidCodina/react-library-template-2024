import './App.css'

import { Square /*, sum */ } from 'dc-react-ts-test-library'

function App() {
  return (
    <div className='justify-content flex flex-col items-center gap-6'>
      <Square
        style={{
          // backgroundColor: 'gray',
          border: '2px solid rgba(0,0,0,0.25)',
          borderRadius: 10,
          boxShadow: '0px 4px 8px rgba(0,0,0,0.5)'
        }}
        // className='bg-lime-500'
      />

      <div className='square' />
    </div>
  )
}

export default App
