import React from 'react'
import "../styles/SmartClue.css"

const SmartClue2 = ({promt, setMed2, setActive2}) => {
  if (!promt || promt.length === 0) return null;
  return (
    <div className='scroll-list'>
      {
        promt.map((el, idx) => (
            <button className='list__btn' key={idx} onClick={() => {setMed2(el._source.title); setActive2(false)}}>{el._source.title}</button>
        ))
        }
      
    </div>
  )
}

export default SmartClue2;