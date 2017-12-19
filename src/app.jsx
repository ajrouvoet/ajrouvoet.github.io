import classes from './style/reset.css'
import msc_thesis from './content/publications/msc_thesis.pug'

import React, {Component} from 'react'
import {render} from 'react-dom'

import css from './app.css'

// fonts
import './style/fonts/families.css'
import 'font-awesome/css/font-awesome.css'

class Profile extends Component {
    render() {
        return (
            <div>
                <p>
                    <h3>Professional interests</h3>
                    <br />
                    type theory,
                    proof assistants,
                    language semantics,
                    verified compilation,
                    verification,
                    programming languages
                </p>
                <p>
                    <h3>Personal interests</h3>
                    <br />
                    chess,
                    bouldering,
                    music
                </p>
                <div className={css.contact}>
                    <h3>Contact</h3>
                    <ul>
                        <li>
                            <a href="https://github.com/elessarwebb"><span className="fa fa-github"></span></a>
                        </li>
                        <li>
                            <span className="fa fa-linkedin"></span>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

class App extends Component {
    render() {
        return (
            <div className={css.columns}>
                <div className={css.left}>
                    <h1 className={css.title}>Arjen Rouvoet</h1>
                    <p>Doctoral candidate at Technical University Delft</p>

                    <Profile />

                    <p>
                        {"<><"}
                    </p>
                </div>
                <div className={css.right}>
                    Hi!
                </div>
            </div>
        )
    }
}

render(<App />, document.getElementById("root"))
