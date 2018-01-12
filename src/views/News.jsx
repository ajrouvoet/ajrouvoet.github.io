import React, {Component} from 'react'
import css from './News.css'

export default function News({}) {
    return (
        <ol className={css.News}>
            <li className={css.NewsItem}>
                <div className={css.NewsItemBorder}></div>
                <div className={css.NewsItemBody}>
                    <h1>Attending POPL 2018!</h1>
                    <p className={css.NewsDate}>January 2018</p>
                </div>
            </li>
        </ol>
    )
}
