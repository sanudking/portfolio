import React from 'react'
import Navbar from '../components/Navbar'
import { color } from 'framer-motion'
import "../styles/journal.css"; 

function Journal() {
  return (
    <>
    
    <h1>Journal</h1>
    <div id='flex'>
        <div style={{}}>
            <h2>Thu Aug 6</h2>
            Learnt LLD concepts today from <a href="https://www.youtube.com/watch?v=UsNl8kcU4UA&list=PLQEaRBV9gAFvzp6XhcNFpk1WdOcyVo9qT&index=5">Coder Army.</a>
        </div>
        <div style={{}}>
            <h2>Thu Aug 5</h2>
            Copleted CSS playlist from <a href="https://www.youtube.com/watch?v=Xv-gTGw4i_Y&list=PLQEaRBV9gAFvNWnpaGZOeRbt-CMr6z7t5&index=6">Coder Army</a><br></br>
            Started learning LLD  today from <a href="https://www.youtube.com/watch?v=UsNl8kcU4UA&list=PLQEaRBV9gAFvzp6XhcNFpk1WdOcyVo9qT&index=5">Coder Army.</a>
        </div>

    </div>
    </>
  )
}

export default Journal