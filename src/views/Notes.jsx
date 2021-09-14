import React, {Component} from 'react'
import _ from 'lodash'
import {Link} from 'react-router-dom'

import css from './Notes.css'

export default function Notes() {
    return (
      <ol className={css.Notes}>
        <li className={css.Note}>
          <a href="/files/notes/biblio.pdf">
            <div className={css.Thumb}>
              <img src="/files/images/bib.png" />
            </div>
            <span className={css.Notetitle}>Bibliographies using BibTeX</span>
            <span className={css.Date}>(14 Sept. 21)</span>
          </a>
        </li>
      </ol>
    )
}
