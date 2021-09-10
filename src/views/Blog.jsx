import React from 'react'
import {Route, Link, Switch, useRouteMatch, useParams} from 'react-router-dom'
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
  ]
  , [ "video-talks",
    { date: "January 2021"
    , title: "Video Talk Prepping"
    , content: videotalks
    }
  , [ "shaken-not-made",
    { date: "August 19 2020"
    , title: "Shaken not Made"
    , content: shake
    }
    ]
  ]
];

let postsMap  = _.fromPairs(posts)

export function BlogIndex() {
  return (
    <ol className={style.BlogHeader}>
    { _.map(posts, ([path, {draft, date, title, content}]) => (
        draft ? <li key={path}>
          <Link to={`/blog/${path}`}><span>{title}</span> <i>({date})</i></Link>
        </li> : null
      ))
    }
    </ol>
  )
}

function PostBody({content}) {
  return <div dangerouslySetInnerHTML={{__html: content}}
              className={`${codestyle.WithCode} ${style.PostBody}`} />
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
              { _.map(posts, ([ path, {content, draft} ]) => (
                  draft ? null : <PostBody key={path} content={content} />
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
