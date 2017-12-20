import React, {Component} from 'react'

export default function Nl2br({children}) {
    return (
        <div>
            {children.split('\n').map((p, i) => <p key={i}>{p}</p>)}
        </div>
    )
}
