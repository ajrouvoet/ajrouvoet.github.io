import React from 'react'
import _ from 'lodash'

import Paper from '../../views/Paper.jsx'

import pubs_2020 from '../publications/2020.yaml'

export default function Kwta() {
    let kwta = pubs_2020.find(pub => pub.oopsla)
    return [
        <style dangerouslySetInnerHTML={{__html: `
        body {
          background: linear-gradient(to bottom right, #80a32a, #232839 75%);
        }`
        }} />
      , <Paper pub={kwta}>
            <h4>Talk at OOPSLA (pre-recorded)</h4>
            <iframe width="560" height="315" 
                    src="https://www.youtube.com/embed/n9RmjfKnlp8" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen />
            <h4>Source Code</h4>
            <p>
                The implementation and the case studies are publically available
                on GitHub:
            </p>
            <ul>
                <li><a href="https://github.com/Metaborg/Ministatix.hs">MiniStatix</a></li>
                <li><a href="https://github.com/MetaborgCube/java.mstx">Java Specification</a></li>
                <li><a href="https://github.com/MetaborgCube/scala.mstx">Scala Specification</a></li>
                <li><a href="https://github.com/MetaBorgCube/metaborg-lmr/tree/master/lang.lmr.mstx">LMR/Rust modules Specifiation</a></li>
            </ul>
            <p>
                All these projects with their dependencies are also available
                packaged as a virtual machine.
            </p>
            <ul>
                <li><a href="https://doi.org/10.5281/zenodo.4068064">VM package</a></li>
            </ul>
        </Paper>
    ]
}
