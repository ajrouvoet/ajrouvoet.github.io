import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import css from './Author.css'

export default class Author extends Component {
    static propTypes = {
        author: PropTypes.object.isRequired,
        full:   PropTypes.bool
    }
    
    static defaultProps = {
        full: false
    }

    render() {
        let {full, author} = this.props

        return (
            <div className={css.Author} style={{display: "inline"}}>
            { author.site
                ? <a target="_blank" href={author.site}>{author.who}</a>
                : <span>{author.who}</span>
            }
            { (full && author.affiliation)
                ? <span>, {author.affiliation}</span>
                : null
            }
            </div>
        )
    }
}

