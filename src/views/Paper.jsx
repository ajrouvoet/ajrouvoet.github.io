import React, {Component} from 'react'
import _ from 'lodash'

import style from './Paper.css'
import Nl2br from './Nl2br.jsx'
import Author from './Author.jsx'
import Link from './Link.jsx'

export default function Paper({pub, children}) {
    let {title, subtitle, abstract} = pub;
    return (
      <div className={style.PaperContainer}>
        <div className={style.Paper} >
          <h1>{title}</h1>
          <h2>{subtitle}</h2>
          <ol className={style.Authors}>
            {_.map(pub.authors, (x, i) => <li key={i}><Author author={x} full /></li>)}
          </ol>
          <ul className={style.Links}>
             {_.map(pub.links, (li, key) =>
                (key != "site")
                    ? <li key={key}><Link type={key} href={li} /></li>
                    : null
             ) }
          </ul>

          <div className={style.Abstract}>
              <h4>Abstract</h4>
              <Nl2br>{abstract}</Nl2br>
          </div>

          <div className={style.Abstract}>
              {children}
          </div>
        </div>
      </div>
    )
}
