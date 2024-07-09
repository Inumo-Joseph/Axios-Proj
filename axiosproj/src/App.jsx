import { useState } from 'react'
import React from "react"
import Counter from './components/Counter'
import Table from './components/Table'
import './App.css'
import { Provider } from 'react-redux'
import store from './store/store.js';


function App() {


  return (
    <>
      <div className=''>
        {/* Table component is added to app.jsx */}
       
        <Table/>
        
      </div>
      
    </>
  )
}

export default App
