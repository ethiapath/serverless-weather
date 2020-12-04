import Link from 'next/link'
import { useState } from 'react'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Index() {

  const [input, setInput] = useState('');

  const title = `The Weather`

  return (
    <div className="container">
      <h1>Welcome to {title}!</h1>
      <div className="city_input">
        <input 
          value={input}
          onChange={e => setInput(e.target.value)}
          type="text" placeholder="city"></input>

      <Link href={`/${input}`} >
        <button>Search</button>
      </Link>

      </div>
    </div>
  )
}

