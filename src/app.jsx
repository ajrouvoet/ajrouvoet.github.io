import './style/reset.css'

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
import News from './views/News.jsx'

// content
import pubs_2013 from './content/publications/2013.yaml'
import pubs_2016 from './content/publications/2016.yaml'
import pubs_2017 from './content/publications/2017.yaml'
import pubs_2018 from './content/publications/2018.yaml'
import pubs_2019 from './content/publications/2019.yaml'

import news from './content/news.yaml'

function CodePage() {
    return (
        <div>
            <div className={css.Section}>
                <h2 className={css.SectionTitle}>Public Repositories</h2>

                <h2 className={css.SectionTitle}>Agda Formalizations</h2>
                <h2 className={css.SectionTitle}>Other Projects</h2>
            </div>
        </div>
    )
}

function PublicationsSection() {
    return (
        <div className={css.Section}>
            <h2 className={css.SectionTitle}>Publications</h2>

            <h3 className={css.PubYear}>2019</h3>
            <Publications pubs={pubs_2019} />

            <h3 className={css.PubYear}>2018</h3>
            <Publications pubs={pubs_2018} />

            <h3 className={css.PubYear}>2017</h3>
            <Publications pubs={pubs_2017} />

            <h3 className={css.PubYear}>2016</h3>
            <Publications pubs={pubs_2016} />

            <h3 className={css.PubYear}>2013</h3>
            <Publications pubs={pubs_2013} />
        </div>
    )
}

function Menu({}) {
    // <li><Link to="/blog">Blog</Link></li>
    // <li><Link to="/cv">Curriculum Vitae</Link></li>
    return (
        <ol className={css.Menu}>
            <li><Link to="/">News & Publications</Link></li>
            <li><Link to="/code">Code</Link></li>
        </ol>
    )
}

function NewsSection({}) {
    return (
        <div className={css.Section}>
            <h2 className={css.SectionTitle}>
                Updates
            </h2>
            <News news={news} />
        </div>
    )
}

function Home({}) {
    return (
        <div>
            <NewsSection />
            <PublicationsSection />
        </div>
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
                            <a taret="_blank" href="https://www.bible.com/bible/116/PSA.139">Ps. 139</a>
                        </p>
                    </div>
                    <div className={css.right}>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/code" component={CodePage} />
                    </div>
                </div>
            </Router>
        )
    }
}

render(<App />, document.getElementById("root"))
