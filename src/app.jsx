import classes from './style/reset.css'

import React, {Component} from 'react'
import {render} from 'react-dom'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

import css from './app.css'

// fonts
import './style/fonts/families-cdn.css'
import 'font-awesome/css/font-awesome.css'

// view components
import Profile from './views/Profile.jsx'
import Publication, {Publications} from './views/Publication.jsx'

// content
import pubs_2013 from './content/publications/2013.yaml'
import pubs_2016 from './content/publications/2016.yaml'
import pubs_2017 from './content/publications/2017.yaml'

class PublicationsSection extends Component {
    render() {
        return (
            <div className={css.PublicationsSection}>
                <h2 className={css.SectionTitle}>Publications</h2>

                <h3 className={css.PubYear}>2017</h3>
                <Publications pubs={pubs_2017} />

                <h3 className={css.PubYear}>2016</h3>
                <Publications pubs={pubs_2016} />

                <h3 className={css.PubYear}>2013</h3>
                <Publications pubs={pubs_2013} />
            </div>
        )
    }
}

function Menu({}) {
    return (
        <ol className={css.Menu}>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/">Publications</Link></li>
            <li><Link to="/cv">Curriculum Vitae</Link></li>
        </ol>
    )
}

class App extends Component {
    render() {
        return (
            <Router>
                <div className={css.columns}>
                    <div className={css.left}>
                        <Profile />

                        <p>
                            {"<>< "}
                            <a taret="_blank" href="https://www.bible.com/bible/116/PSA.136">Ps. 136</a>
                        </p>
                    </div>
                    <div className={css.right}>
                        <Route exact path="/" component={PublicationsSection} />
                        <Route exact path="/cv" component={() => false} />
                        <Route exact path="/blog" component={() => false} />
                    </div>
                </div>
            </Router>
        )
    }
}

render(<App />, document.getElementById("root"))
