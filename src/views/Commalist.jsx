import React, {Component} from 'react'
import _ from 'lodash'

import css from './Commalist.css'

export default function Commalist({children}) {
    return <ol className={css.Commalist}>{children}</ol>
}
