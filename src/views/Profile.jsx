import React, {Component} from 'react'
import css from './Profile.css'

export default class Profile extends Component {
    render() {
        return (
            <div className={css.Profile}>
                <h3>Professional interests</h3>
                <ul className={css.interests}>
                    <li>type theory</li>
                    <li>proof assistants</li>
                    <li>language semantics</li>
                    <li>verified compilation</li>
                    <li>verification</li>
                    <li>programming languages</li>
                </ul>
                <h3>Personal interests</h3>
                <ul className={css.interests}>
                    <li>chess</li>
                    <li>bouldering</li>
                    <li>music</li>
                </ul>
                <div className={css.contact}>
                    <h3>Contact</h3>
                    <ul>
                        <li>
                            <a href="https://github.com/elessarwebb">
                                <span className="fa fa-github"></span>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/in/arjen-rouvoet/">
                                <span className="fa fa-linkedin"></span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
