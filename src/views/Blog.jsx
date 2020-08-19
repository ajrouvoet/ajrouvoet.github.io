import React, {Component} from 'react'

import style from './Blog.css'
import codestyle from '../content/blog/shaken-not-made.css'
import shake from '../content/blog/shaken-not-made.html'
import news  from './News.css'

export function BlogIndex() {
  return (
    <ol className={style.BlogHeader}>
      <li><a href="#shaken">August 19 2020 &ndash; Shaken not Made</a></li>
    </ol>
  )
}

export default function Blog() {
    return (
      <div className={style.Blog}>
        <div className={style.Wrapper}>
          <div dangerouslySetInnerHTML={{__html: shake}} className={codestyle.WithCode} />
        </div>
      </div>
    )
}

