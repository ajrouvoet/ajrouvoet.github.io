import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import cn from 'classnames'

import css from './Publications.css'

import Commalist from './Commalist.jsx'
import Nl2br from './Nl2br.jsx'
import Author from './Author.jsx'
import Link from './Link.jsx'

class Abstract extends Component {
    static propTypes = {
        text: PropTypes.string.isRequired
    }

    constructor(props) {
        super(props)

        this.state = {
            fold: false,
            hover: false,
        }

        this.toggle = () => {
            // this.setState({fold: !this.state.fold})
        }

        this.onHover = () => {
            this.setState({hover: true})
        }
        this.onHoverOut = () => {
            // this.setState({hover: false})
        }
    }

    render() {
        let {text} = this.props
        let cls = cn(
            css.Abstract,
            {
                [css.fold]: this.state.fold,
                [css.unfold]: !this.state.fold,
                [css.hover]: this.state.hover
            }
        )

        return (
            <div className={cls} onMouseOver={this.onHover} onMouseOut={this.onHoverOut} onClick={this.toggle} >
                <Nl2br>{text}</Nl2br>
            </div>
        )
    }
}

export default class Publication extends Component {
    static propTypes = {
        pub: PropTypes.object.isRequired
    }

    render() {
        let {pub} = this.props

        return (
            <li className={css.Publication}>
                <h3>{pub.title}</h3>
                <h4>{pub.subtitle}</h4>
                <p></p>
                <Commalist>
                    {_.map(pub.authors, (x, i) => <li key={i}><Author author={x} /></li>)}
                </Commalist>
                <Abstract text={pub.abstract} />
                <ul className={css.Links}>
                  {_.map(pub.links, (li, key) => <li key={key}><Link type={key} href={li} /></li> ) }
                </ul>
            </li>
        )
    }
}

export class Publications extends Component {
    static propTypes = {
        pubs: PropTypes.arrayOf(PropTypes.object)
    }

    render() {
        let {pubs} = this.props

        return (
            <ol>{
                _.map(pubs, (pub, i) =>
                    <Publication key={i} pub={pub}/>
                )
            }</ol>
        )
    }
}
