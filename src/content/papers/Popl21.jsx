import React from 'react'
import _ from 'lodash'

import Paper from '../../views/Paper.jsx'

import pubs_2021 from '../publications/2021.yaml'
let popl = pubs_2021.popl

export default function Popl21() {
    return [
        <style dangerouslySetInnerHTML={{__html: `
        body {
          background: linear-gradient(to bottom right, #264870, #232839 75%);
        }`
        }} />
      , <Paper pub={popl}>
            <h4>Source Code</h4>
            <p>
                The Agda library and compiler are available on GitHub:
            </p>
            <ul>
                <li><a href="https://github.com/ajrouvoet/jvm.agda/tree/master">Agda compiler</a></li>
                <li><a href="https://github.com/ajrouvoet/ternary.agda">Agda library</a></li>
            </ul>
            <p>
                All these projects with their dependencies are also available
                packaged as a virtual machine.
            </p>
            <ul>
                <li><a href="https://doi.org/10.5281/zenodo.4071953">VM package</a></li>
            </ul>
        </Paper>
    ]
}
