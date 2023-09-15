import './style/reset.css'

import React from 'react'
import {createRoot} from 'react-dom/client'
import {HashRouter, Routes, Route, Outlet, Link} from 'react-router-dom'

import css from './app.css'


// fonts
// import './style/fonts/families-cdn.css'
// import 'font-awesome/css/font-awesome.css'

// view components
import Profile from './views/Profile.jsx'
import Background from './views/Background.jsx'
import Publication, {Publications} from './views/Publication.jsx'
import News from './views/News.jsx'
import {AllPosts, BlogIndex, PostPage} from './views/Blog.jsx'
import Notes from './views/Notes.jsx'
import Kwta from './content/papers/Kwta.jsx'
import Popl21 from './content/papers/Popl21.jsx'
import Vitae from './views/Vitae.jsx'

// content
import pubs_2013 from './content/publications/2013.yaml'
import pubs_2016 from './content/publications/2016.yaml'
import pubs_2017 from './content/publications/2017.yaml'
import pubs_2018 from './content/publications/2018.yaml'
import pubs_2020 from './content/publications/2020.yaml'
import pubs_2021 from './content/publications/2021.yaml'

import news from './content/news.yaml'

function PublicationsSection() {
    return (
        <div className={css.Section}>
            <h2 className={css.SectionTitle}>Publications</h2>

            <h3 className={css.PubYear}>2021</h3>
            <Publications pubs={pubs_2021} />

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

function BlogLayout() {
    return (
       <div className={css.Section} style={{background: 'transparent'}}>
         <h2 className={css.SectionTitle}>
           Blog
         </h2>
         <BlogIndex />
         <Outlet />
       </div>
    )
}

function NotePage() {
    return (
       <div className={css.Section} style={{background: 'transparent'}}>
         <h2 className={css.SectionTitle}>
           Notes for PhD students
         </h2>
         <p className={css.HeaderPar} >
           Gathering notes on subjects that took me too long to learn by osmosis.
         </p>
         <Notes />
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

function Layout() {
    return (<>
        <style dangerouslySetInnerHTML={{__html: `
            body {
            background: linear-gradient(to bottom right, darkcyan, #232839 75%);
            }`
        }} />
        <div className={css.columns}>
            <div className={css.left}>
                <Profile />

                <p>
                    {"<>< "}
                    <a taret="_blank" href="https://www.bible.com/bible/116/PSA.139">Ps. 139</a>
                </p>
            </div>
            <div className={css.right}>
                <Menu />
                <Outlet />
            </div>
        </div>
    </>)
}

function App() {
    return (
        <HashRouter>
            <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap" rel="stylesheet" />
            <Routes>
                <Route path="/vitae" element={<Vitae />} />
                <Route path="/papers">
                    <Route exact path="knowing-when-to-ask" element={<Kwta />} />
                    <Route exact path="typesafe-compilation" element={<Popl21 />} />
                    <Route>404</Route>
                </Route>
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/blog" element={<BlogLayout />}>
                        <Route path="" element={<AllPosts />} />
                        <Route path=":post" element={<PostPage />}/>
                    </Route>
                    <Route path="/notes-for-promovendi" element={<NotePage />} />
                </Route>
            </Routes>
        </HashRouter>
    )
}

createRoot(document.getElementById("root")).render(<App />)
