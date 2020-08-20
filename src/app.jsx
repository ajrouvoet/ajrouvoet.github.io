import './style/reset.css'

import React, {Component} from 'react'
import {render} from 'react-dom'
import {HashRouter as Router, Route, Link} from 'react-router-dom'

import css from './app.css'

// fonts
import './style/fonts/families-cdn.css'
import 'font-awesome/css/font-awesome.css'

// view components
import Profile from './views/Profile.jsx'
import Background from './views/Background.jsx'
import Publication, {Publications} from './views/Publication.jsx'
import News from './views/News.jsx'
import Blog, {BlogIndex} from './views/Blog.jsx'

// content
import pubs_2013 from './content/publications/2013.yaml'
import pubs_2016 from './content/publications/2016.yaml'
import pubs_2017 from './content/publications/2017.yaml'
import pubs_2018 from './content/publications/2018.yaml'
import pubs_2020 from './content/publications/2020.yaml'

import news from './content/news.yaml'

function PublicationsSection() {
    return (
        <div className={css.Section}>
            <h2 className={css.SectionTitle}>Publications</h2>

            <h3 className={css.PubYear}>2020</h3>
            <Publications pubs={pubs_2020} />

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
    // <li><Link to="/cv">Curriculum Vitae</Link></li>
            // <li><Link to="/code">Code</Link></li>
    return (
        <ol className={css.Menu}>
          <li><Link to="/">News & Publications</Link></li>
          <li><Link to="/blog">Blog</Link></li>
        </ol>
    )
}

function NewsSection({}) {
    return (
        <div className={css.Section} style={{background: 'transparent'}}>
            <h2 className={css.SectionTitle}>
                Updates
            </h2>
            <News news={news} />
        </div>
    )
}

function BlogPage() {
    return (
       <div className={css.Section} style={{background: 'transparent'}}>
         <h2 className={css.SectionTitle}>
           Blog
         </h2>
         <BlogIndex />
         <Blog />
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
                        <Background />
                        <Profile />

                        <p>
                            {"<>< "}
                            <a taret="_blank" href="https://www.bible.com/bible/116/PSA.139">Ps. 139</a>
                        </p>
                    </div>
                    <div className={css.right}>
                        <Menu />
                        <Route exact path="/" component={Home} />
                        <Route path="/blog" component={BlogPage} />
                    </div>
                </div>
            </Router>
        )
    }
}

render(<App />, document.getElementById("root"))
