import React from 'react'
import Link from 'next/link'

const NewsPage = () => {
  return (
    <>
      <h1>News Page</h1>
      <br />
      <ul>
        <li>
          <Link href='/news/nextjs-is-a-great-framework'>Javascript Mastery</Link>

        </li>
        <li>BMW Vlogs</li>
      </ul>
    </>
  )
}

export default NewsPage
