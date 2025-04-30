import React from 'react'
import "../styles/SmartClue.css"

const SmartClue = ({promt, setMed1, setActive1}) => {
  if (!promt || promt.length === 0) return null;
  return (
    <div className='scroll-list'>
      {
        promt.map((el, idx) => (
            <button className='list__btn' key={idx} onClick={() => {setMed1(el._source.title); setActive1(false)}}>{el._source.title}</button>
        ))
    }
      
    </div>
  )
}

export default SmartClue;