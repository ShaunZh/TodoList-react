import React, {Component} from 'react'

export default function(props) {
  return(
    <div className="HeaderTitleToolbar">
      <h1>{props.folderName}</h1>
    </div>
  )
}