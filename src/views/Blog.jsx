import React from 'react'
import {Route, Link, Switch, useRouteMatch, useParams} from 'react-router-dom'
import _ from 'lodash'

import style from './Blog.css'
import codestyle from '../content/blog/shaken-not-made.css'
import shake from '../content/blog/shaken-not-made.html'
import news  from './News.css'

let posts = [
  [ "shaken-not-made", 
    { date: "August 19 2020"
    , title: "Shaken not Made"
    , content: shake
    }
  ]
]
let postsMap  = _.fromPairs(posts)

export function BlogIndex() {
  return (
    <ol className={style.BlogHeader}>
    { _.map(posts, ([path, {date, title, content}]) => (
        <li key={path}>
          <Link to={`/blog/${path}`}><span>{title}</span> <i>({date})</i></Link>
        </li>
      ))
    }
    </ol>
  )
}

function PostBody({content}) {
  return <div dangerouslySetInnerHTML={{__html: content}} 
              className={codestyle.WithCode} />
}

function Post() {
  let {post} = useParams()

  if(postsMap[post]) {
    let content = postsMap[post].content
  
    return (
      <PostBody content={content} />
    )
  } else {
    return <div>404</div>
  }
}

export default function Blog() {
    let { path, url } = useRouteMatch();

    return (
      <div className={style.Blog}>
        <div className={style.Wrapper}>
          <Switch>
            <Route exact path={path}>
              { _.map(posts, ([ path, {content} ]) => (
                  <PostBody content={content} />
                ))
              }
            </Route>
            <Route exact path={`${path}/:post`}>
              <Post />
            </Route>
          </Switch>
        </div>
      </div>
    )
}

