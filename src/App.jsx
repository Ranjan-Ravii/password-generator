import { useCallback, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numsAllowed, setNumsAllowed] = useState(false)
  const [charsAllowed, setCharsAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    let requiredChars = ""

    if (numsAllowed) {
      str += '0123456789'
      requiredChars += '012346789'.charAt(Math.floor(Math.random() * 10))
    }

    if (charsAllowed) {
      str += '@$%-'
      requiredChars += '@$%-'.charAt(Math.floor(Math.random() * 4))
    }

    const totalLength = length - requiredChars.length

    for (let i = 1; i <= totalLength; i++) {
      let randomIndex = Math.floor(Math.random() * str.length)
      pass += str.charAt(randomIndex)
    }

    pass += requiredChars

    pass = pass.split('').sort(() => Math.random() - 0.5).join('');


    setPassword(pass)

  }, [length, numsAllowed, charsAllowed, setPassword])


  const copyPassword = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numsAllowed, charsAllowed])



  return (
    <>
      <div className='flex justify-center '>
        <div className='my-10 w-1/2  flex flex-col items-center rounded-2xl shadow-2xl shadow-slate-900'>
          <h1 className='text-3xl text-center font-black text-white m-10'>Password Generator</h1>
          <div className='flex justify-center items-center m-5'>
            <input className='h-12 w-60 rounded-xl text-center '
              type="text"
              value={password}
              placeholder='password'
              readOnly
              ref={passwordRef}
            />
            <button
            onClick={copyPassword}
              className='text-white text-xl m-5 bg-black p-3 rounded-xl '>
              Copy</button>
          </div>
          <div className='flex flex-col justify-center items-center m-5'>
            <div className='flex items-center'>
              <input
                type="range"
                min={6}
                max={12}
                value={length}
                onChange={(e) => { setLength(parseInt(e.target.value)) }}
              />
              <label className='text-white text-xl m-2' >Length : {length}</label>
            </div>

            <div className='flex items-center h-12'>
              <input
                type="checkbox"
                checked={numsAllowed}
                onChange={() =>
                  setNumsAllowed((prev) => !prev)}
              />

              <label className='text-white text-xl m-5'>Numbers</label>
              <input type="checkbox"
                checked={charsAllowed}
                onChange={() =>
                  setCharsAllowed((prev) => !prev)}
              />
              <label className='text-white text-xl m-5'>Characters</label>
            </div>

          </div>
        </div>
      </div>
    </>

  )
}

export default App
