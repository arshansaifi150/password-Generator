import { useCallback, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setlength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [characterAllowed, setCharacterAllowed] = useState(false)
  const [password, setPassword] = useState('')

  const passwordGenerator = useCallback(()=>{
    let pass=""
    let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str += "0123456789"
    if(characterAllowed) str+="!@#$%^&*-_+=[]{}~`"

    for (let i = 0;  i <=length ; i++) {
      let char = Math.floor((Math.random()*str.length) +1)
      pass+= str.charAt(char)
      
    }
    setPassword(pass)

  },[length,characterAllowed,numberAllowed,setPassword])

  useEffect(()=>{

    passwordGenerator()

  },[length,characterAllowed,numberAllowed,passwordGenerator])

  let passwordReff = useRef(null)

  const copyPasswordToClipBoard = useCallback(()=>{
    passwordReff.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  return (
    <>
      <div style={{backgroundColor:'#212121'}} className='w-full h-screen flex flex-col justify-start text-orange-500'>
        <div className='w-auto flex justify-center'>
          <div className='flex flex-col bg-gray-700 mt-10 p-5 justify-between rounded-lg'>
            <div className='flex justify-center mb-2'>
              <input type="text" value={password} className='rounded-lg p-1 m-1 w-full' ref={passwordReff} placeholder='Password' readOnly />
              <button className='bg-blue-500 rounded-xl text-md text-white px-2' onClick={copyPasswordToClipBoard}>Copy</button>
            </div>
            <div className='flex justify-around gap-3'>
              <input type="range" min={6} max={40} className='cursor-pointer' onChange={(e)=>{setlength(e.target.value)}} value={length} /> <label >Length: {length}</label>
              <input type="checkbox"  onChange={()=> setNumberAllowed((prev) => !prev )}/><label >Numbers</label>
              <input type="checkbox" onChange={()=> setCharacterAllowed((prev) => !prev)} /> <label >Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
