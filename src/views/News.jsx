import React, {Component} from 'react'
import _ from 'lodash'

import css from './News.css'

export default function News({news}) {
    return (
        <ol className={css.News}>
          {
              _.map(_.take(news, 3), ({title, date}, key) => (
                <li key={key} className={css.NewsItem}>
                    <div className={css.NewsItemBorder}></div>
                    <div className={css.NewsItemBody}>
                        <h1>{title}</h1>
                        <p className={css.NewsDate}>{date}</p>
                    </div>
                </li>
              ))
          }
        </ol>
    )
}
