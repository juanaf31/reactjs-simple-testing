import React, { useState } from 'react';
import './App.css';
import {api} from './api'

interface IItems{
  id:number,
  item:string
}

function App() {
  const [items,setItems]=useState<IItems[]>([])
  const [text,setText]=useState('')
  const [isHovered, setIsHovered]=useState(false)
  const handleSubmit=(e:any)=>{
    e.preventDefault()
    const newItem = {id:items.length+1,item:text}
    api.createItem('/item',newItem).then((res)=>{
      console.log(res)
      setItems((prev)=>[...prev,res])
      setText('')
    }
    )
  }
  const handleChange=(e:any)=>{
    setText(e.target.value)
  }
  const handleClear=()=>{
    setItems([])
  }
  return (
    <div className='App'>
      <div className='wrapper'>
        <h1>Nusantech TODOs</h1>
      
        <form onSubmit={handleSubmit}>
            <label htmlFor="data-input">What you want to do?</label>
            <br/>
            <input id='data-input' onChange={handleChange} value={text}/>
            <button data-testid='buttonSubmit' className={isHovered?'hovered':''} onMouseEnter={()=>setIsHovered(true)} onMouseLeave={()=>setIsHovered(false)}>
              {`Add #${items.length+1}`}
            </button>
            <button type='button' onClick={handleClear}>clear</button>
        </form>
        <ul>
          {items.map((item)=>(
            <li key={item.id}>{item.item}</li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
