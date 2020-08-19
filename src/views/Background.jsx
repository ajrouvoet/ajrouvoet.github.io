import React, {Component} from 'react'
import _ from 'lodash'

import css from './Background.css'

export default class Background extends Component {
    constructor(props) {
        super(props)
        let x = 0
        let y = 0
        let tris = []
    }

    render() {
        let style = {
          zIndex: -100,
          opacity: '20%',
          fill: 'white'
        }
        return (
            <svg className={css.Canvas} viewBox="0 0 100 100" preserveAspectRatio="none" 
                 style={style}>
              <path d='M0 60L120 0L50 100 Z' />
            </svg>
        )
    }
}
