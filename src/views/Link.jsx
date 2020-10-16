import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

export default function Link(props) {
  let {href, type} = props

  let icon
  if (type === 'pdf') {
    icon = <span><span className="fa fa-file"></span> PDF</span>
  } else if (type === 'code') {
    icon = <span><span className="fa fa-code"></span> Code</span>
  } else {
    icon = <span><span className="fa fa-link"></span> {type}</span>
  }

  return (<a target="_blank" href={href}>{icon}</a>)
}

