// pages/index.js
import Link from 'next/link'

function Home() {
  return (
    <div>
      Click{' '}
      <Link href="/about">
        <a>here</a>
      </Link>{' '}
      to read more
      <Link href="/post?slug=something" > post</Link>
    </div>
  )
}

export default Home