import React from 'react';
import Navbar from '../components/Navbar';
import '../styles/journal.css';

function Journal() {
  return (
    <>
      
      <h1>Journal</h1>
      <div id="flex">
        <div>
          <h2>Sun Aug 19</h2>
          Agentic AI using langchain , travily for web access 
        </div>
        <div>
          <h2>Sun Aug 16</h2>
          JS fundamental, DOM manipulation , WASM 
        </div>

        <div>
          <h2>Sat Aug 15</h2>
            Learnt JS Event Loop from Coder Army , ngrok .   
                 </div>

        <div>
          <h2>Fri Aug 14</h2>
          Learned API testing end-to-end using Postman (HTTP methods, collections, environment variables, and test scripts). Practiced React `useRef` hook features and custom CSS layouts.
        </div>

        <div>
          <h2>Thu Aug 13</h2>
           ReactJS  useRef management.
           </div>


        <div>
          <h2>Tue Aug 11</h2>
          Worked on LeetCode array and stack challenges (Prefix products, Sliding Window, Heap/Priority Queue logic).
        </div>

        <div>
          <h2>Mon Aug 10</h2>
          Explored building a custom web-based chess game using `python-chess` and custom interactive grid layouts. Practiced responsive CSS square layouts.
        </div>


        

        
        <div>
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
  );
}

export default Journal;
