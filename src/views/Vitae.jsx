import React, {Component, Fragment, useState} from 'react'
import {render} from 'react-dom'
import {HashRouter as Router, Route, Link, Switch, useRouteMatch} from 'react-router-dom'

import app   from '../app.css'
import style from './Vitae.css'

import {MailModal, Contact} from './Profile.jsx'
import Nl2br from './Nl2br.jsx'

import vitae from './Vitae.yaml'

function Section({title, children}) {
  return (
    <div className={style.Section}>
      <h1>{title}</h1>
      {children}
    </div>
  );
}

function Subsection({title, children}) {
  return (
    <div className={style.Subsection}>
      <h3>{title}</h3>
      {children}
    </div>
  );
}

function MyFunction(fun) {
  let {when, what, where, text} = fun;
  return (<Fragment>
     <tr>
      <td className={style.FunWhen}>{when}</td>
      <td className={style.FunWhere}>{where}</td>
      <td className={style.FunWhat}>{what}</td>
      { fun.how ? <td className={style.FunHow}>{fun.how}</td> : <td></td> }
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td colSpan={2}><Nl2br>{text ? text : ""}</Nl2br></td>
    </tr>
  </Fragment>)
}

function Keywords({children}) {
  return (
    <div className={style.Keywords}>
      {children}
    </div>
  )
}

export function Education() {
  return (
    <Section title={"Education & Work"}>
      <div className={style.Subsection}>
        <table>
        <tbody>
        {_.map(vitae.functions, (fun, i) => (
          <MyFunction
            key={i}
            when={fun.when}
            where={fun.where}
            what={fun.what}
            how={fun.how}
            text={fun.description}
          />
        ))}
        </tbody>
        </table>
      </div>
    </Section>
  )
}

export default function Vitae() {
  const [showMailModal, setMailModal] = useState(false);
  function toggleMail() {setMailModal(!showMailModal)};

  return (
    <Fragment>
      <style dangerouslySetInnerHTML={{__html: `
        body {
          background: linear-gradient(to bottom right, darkcyan, #232839 75%);
        }`
      }} />
      <div className={app.columns}>
        <div className={app.left + " " + style.Profile}>
          { showMailModal && <MailModal onClose={toggleMail} /> }
          <div className={style.Me}>
            <img src="/files/defense.jpg" className={style.ProfilePic} height={250} />
          </div>

          <p>
            I enjoy solving problems with software. I work best in <strong>big
            problem spaces</strong> with many challenges on the road ahead and
            opportunities for <strong>innovation</strong> and applying
            state-of-the-art solutions in industry. To
            make this work, I like teaching and mentoring people, as well as
            coordinating and cooperating with teams. I believe that organization
            and transfer of knowledge is a key challenge in the fast-paced world
            of software engineering.
          </p>
          <h1 className={style.MeName}>Arjen Rouvoet</h1>
          <table><tbody>
            <tr>
              <td><span className="fa fa-linkedin"></span></td>
              <td><a href="https://www.linkedin.com/in/arjen-rouvoet/">Get in touch via LinkedIn</a></td>
            </tr>
            <tr>
              <td><span className="fa fa-envelope"></span></td>
              <td>Or sent an email to a.j.rouvoet on the domain gmail.com</td>
            </tr>
            <tr>
              <td><span className="fa fa-link"></span></td>
              <td><a href="/">My academic publications</a></td>
            </tr>
          </tbody></table>
        </div>
        <div className={app.right}>
          <Education />
          <Section title={"Looking for"}>
            <Subsection title={"Company profile"}>
              <p>
              I am looking to join an organization on a mission, with a clear idea of how it is contributing to society.
              They are facing interesting technological questions that require a new approach.
              They recognize the human challenges of developing and communicating sustainable high-tech solutions.
              </p>
              <Keywords>
                <span>Sustainable</span>
                <span>Social</span>
                <span>Health</span>
                <span>Positive impact</span>
                <span>Green</span>
                <span>Big open problems</span>
              </Keywords>
            </Subsection>

            <p>
            An important criterion for me is that the product or service that I will be working on is valuable and
            will push the boundary of what is possible today—technically or practically.
            </p>

            <Subsection title={"Role"}>
              <p>
              Although I have experience in industry (at @WalmartLabs, Occator, and at S&T), my most recent position
              was as a researcher (PhD candidate and postdoc at TU Delft).
              In such a role you learn to analyze large open problems and to prototype and communicate new solutions.
              I hope to find a position that values the skills that I developed in that time.
              </p>
              <br />
              Role requirements that match my profile are:
              <Keywords>
                <span>A strong conceptual thinker</span>
                <span>Capable of defining the scope and the problem domain in a structured way</span>
                <span>Capable of delivering a consolidated architecture</span>
                <span>Aware of latest technical developments</span>
                <span>Capable of structuring and sharing knowledge with and between teams</span>
                <span>Values quality and sustainable solutions</span>
                <span>Strong communicator and practiced writer in English and Dutch</span>
              </Keywords>
              <br />
            </Subsection>
          </Section>
          <Section>
            <h1>Skills</h1>
            <h3>Application domains</h3>
            See my experiences for brief summaries of the domains in which I worked.

            <h3>Skills</h3>
            I consider my most valuable skills to be the soft skills that one acquires during a PhD:

            <Keywords>
              <span>Acquiring new skills fast</span>
              <span>Structured problem solving</span>
              <span>Ability to understand state-of-the-art developments</span>
              <span>Written and spoken communication (in English and Dutch)</span>
              <span>Technical writing and documentation</span>
              <span>Presenting a convincing argument</span>
              <span>Communicating a message at different levels</span>
              <span>Mentoring and teaching</span>
              <span>Leading and cooperating in a team</span>
              <span>Organizing knowledge</span>
            </Keywords>

            <p>
            My research subject was the use programming languages to increase software reliability in various ways.
            For example, we developed new languages to model concepts from complicated domains more concisely and safely.
            We also study how to improve general purpose languages through language design and tooling to prevent common bugs and security leaks.
            This means I have a lot of experience with:
            </p>

            <Keywords>
              <span>Developing formal models</span>
              <span>Designing abstractions/APIs</span>
              <span>Evaluating designs</span>
              <span>Implementing software prototypes</span>
              <span>Conducting a case study</span>
            </Keywords>

            <p>
            Besides the understanding of programming languages and software development in the large that I
            acquired through my research at the TU Delft, I also have hands-on experience with software in
            industry. In all my jobs I have been a driving force behind innovation, architecting and
            prototyping change to more modern or capable technology. An important aspect of my work has always
            been to bring teams along with these changes, so I consider knowledge transfer an important and
            enjoyable part of innovation. Through these projects I obtained hands-on experience with various
            technologies, tools, and programming languages, such as:
            </p>

            <Keywords>
              <span>Relational databases (MySQL, MSSQL, PostgreSQL)</span>
              <span>Web frameworks (e.g., React, Angular, Django)</span>
              <span>Software deployment tools (e.g., using Nix)</span>
              <span>Cloud infrastructure (e.g., Docker)</span>
              <span>Version control (GIT, SVN)</span>
              <span>Python</span>
              <span>Java</span>
              <span>Scala</span>
              <span>C#</span>
              <span>C</span>
              <span>Typescript</span>
              <span>Javascript</span>
              <span>Haskell</span>
              <span>Nix</span>
              <span>Agda</span>
            </Keywords>

          </Section>
        </div>
      </div>
    </Fragment>
  )
}
