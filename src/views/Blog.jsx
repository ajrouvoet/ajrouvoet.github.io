import React, {useRef, useEffect} from 'react'
import {Route, Link, useParams} from 'react-router-dom'
import _ from 'lodash'

import style     from './Blog.css'
import codestyle from '../content/blog/shaken-not-made.css'

import shake from '../content/blog/shaken-not-made.html'
import qemu  from '../content/blog/artifact-vm.html'
import videotalks from '../content/blog/video-talks.html'

let posts = [
  [ "artifact-vms",
    { date: "August 25 2020"
    , title: "Preparing Software Artifacts using QEMU"
    , content: qemu
    , draft: true
    }
  ], 
  [ "video-talks",
    { date: "January 2021"
    , title: "Video Talk Prepping"
    , content: videotalks
    , draft: true
    }
  ],
  [ "shaken-not-made",
    { date: "August 19 2020"
    , title: "Shaken not Made"
    , content: shake
    }
  ]
];

let postsMap  = _.fromPairs(posts)

export function BlogIndex() {
  return (
    <ol className={style.BlogHeader}>
    { _.map(posts, ([path, {draft, date, title, content}]) => (
        draft ? null : <li key={path}>
          <Link to={`/blog/${path}`}><span>{title}</span> <i>({date})</i></Link>
        </li>
      ))
    }
    </ol>
  )
}

function PostBody({content}) {
  const ref = useRef(null)
  useEffect(() => {
    // clear
    while(ref.current.firstChild) {
      ref.current.removeChild(ref.current.firstChild)
    }
    // append the fragment
    ref.current.appendChild(content.cloneNode(true))
  }, [ref, content])

  return (
    <div className={style.Blog}>
      <div className={style.Wrapper}>
        <div ref={ref} className={`${codestyle.WithCode} ${style.PostBody}`} />
      </div>
    </div>
  )
}

export function PostPage() {
  let {post} = useParams()

  console.log("Visiting", post)
  if(postsMap[post]) {
    let content = postsMap[post].content

    return (
      <PostBody content={content} />
    )
  } else {
    return <div>404</div>
  }
}

export function AllPosts() {
  return (<div>
      {
        posts.map(([ path, {content, draft} ]) => (
          draft ? null : (
            <div key={path}>
              <PostBody content={content} />
              <hr className={style.PostSeparator}/>
            </div>
          )
        ))
      }
  </div>)
}
