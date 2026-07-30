import React from 'react'

function IconButton({ icon, text, onClick }) {
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
        <img src={icon}  width="40" height="40"></img>
        <span>{text}</span>
    </button>
  )
}

export default IconButton