import React, {Component} from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'

import css from './Modal.css'

const overlayArea = document.getElementById("overlay")

export default class Modal extends Component {
    render() {
        let {children} = this.props

        let modal = (
            <div className={css.ModalOverlay}>
                <div className={css.ModalBody}>
                    {children}
                </div>
            </div>
        )

        return ReactDom.createPortal(
            modal,
            overlayArea
        )
    }
}
