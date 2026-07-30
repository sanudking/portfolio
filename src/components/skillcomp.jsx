import React from 'react'

function skillcomp({ icon, text, onClick }) {
  return (
    <button 
      onClick={onClick} 
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 16px',
        cursor: 'pointer'
      }}
    >
        <img src="{icon}"></img>
        <span>{text}</span>
    </button>
  )
}

export default skillcomp