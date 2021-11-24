import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import style from './CV.css'

function MyFunction({what, where, text}) {
  return (<Fragment>
     <tr>
      <td>{where}</td> 
      <td>{what}</td> 
    </tr>
    <tr>
      <td></td>
      <td>{text}</td>
    </tr>
  </Fragment>)
}

export function Education() {
  return (
    <div className={style.Subsection}>
      <table>
        <MyFunction 
          where={"TU Delft"}
          what={"PhD Computer Science (cum laude, awarded to top ~3% of CS promovendi)"}
          text={"My research at the TU Delft is published in multiple papers at top international journals of computer science."}
        />
      </table>
    </div>
  )
}

export function Dashboard() {
  return (
    <div className={style.Dashboard}>
      <div className={style.DashboardItem}>
      </div>
    </div>
  )
}

export default function CV() {
    // <img src="/files/me.jpg" className={style.ProfilePic} />
    return (
      <div className={style.Body}>
      <div className={style.CVWrapper}>
        <div className={style.HCardSection}>
          <img src="/files/defense.jpg" className={style.ImgCard} height={250} />
          <div className={style.WhiteCard}>
            <h1 className={style.Larger}>Curriculum Vitae</h1>
            Hi
          </div>
        </div>
        <div className={style.Section}>
          <h1>Profile</h1>
          <p>
            I enjoy problem solving in the space of software. I work best in BIG
            problem spaces with many challenges on the road ahead and
            opportunities for innovation and applying research in industry. To
            make this work, I like teaching and mentoring people, as well as
            coordinating and cooperating with teams. I believe that organization
            and transfer of knowledge is a key challenge in the fast-paced world
            of software engineering.
            <br />
            <br />
            My research at the TU Delft was about using programming languages to
            increase software reliability, by formal verification of software
            safety. Using a computer assisted method we develop mathematical
            proof that certain software is safe to execute. Unlike testing, this
            approach can guarantee the absence of certain errors and is
            especially useful for critical software and in domains where testing
            is very difficult.
          </p>
        </div>
        <div className={style.Section}>
          <h1>Education & Work</h1>
          <Education />
        </div>
        <div className={style.Section}>
          <h1>Looking for</h1>
          <p>
          </p>
        </div>
      </div>
      </div>
    )
}
