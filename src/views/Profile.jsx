import React, {Component} from 'react'
import PropTypes from 'prop-types'

import Modal from './Modal.jsx'

import css from './Profile.css'

export function MailModal({onClose}) {
    let computeEmail = () => {
        let name = "a.j.rouvoet"
        let domain = "gmail.com"

        return `${name}@${domain}`
    }

    return (
        <Modal>
            <div className={css.MailModal}>
                You can contact me using the following address:
                <br/>
                <input type="text" value={computeEmail()} readOnly />
                <br/>
                <div className={css.MailModalButtons}>
                    <button className={css.MailModalClose} onClick={onClose}>Close</button>
                </div>
            </div>
        </Modal>)
}

export function Contact({toggleMail}) {
  return (
    <div className={css.contact}>
        <h3>Contact</h3>
        <ul>
            <li>
                <a href="https://github.com/ajrouvoet">
                    <span className="fa fa-github"></span>
                </a>
            </li>
            <li>
                <a href="https://www.linkedin.com/in/arjen-rouvoet/">
                    <span className="fa fa-linkedin"></span>
                </a>
            </li>
            <li>
                <a onClick={toggleMail}><span className="fa fa-envelope"></span></a>
            </li>
        </ul>
    </div>
  )
}

export default class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            mailModal: false
        }

        this.toggleMailModal = () => {
            this.setState({mailModal: !this.state.mailModal})
        }
    }

    render() {
        return (
            <div className={css.Profile}>

                { this.state.mailModal && <MailModal onClose={this.toggleMailModal} /> }

                <h1 className={css.title}>Arjen Rouvoet</h1>
                <p>
                    I'm a senior software engineer on a mission to bring more state of the art
                    techniques from academia to practice.
                </p>

                <h3>Professional interests</h3>
                <ul className={css.interests}>
                    <li>functional programming</li>
                    <li>programming languages</li>
                    <li>proof assistants</li>
                    <li>language semantics</li>
                    <li>verification</li>
                    <li>web-dev</li>
                    <li>domain-specific languages</li>
                </ul>
                <h3>Personal interests</h3>
                <ul className={css.interests}>
                    <li>chess</li>
                    <li>bouldering</li>
                    <li>music</li>
                    <li>metaphysics & philosophy</li>
                </ul>
                <Contact toggleMail={this.toggleMailModal} />
            </div>
        )
    }
}
