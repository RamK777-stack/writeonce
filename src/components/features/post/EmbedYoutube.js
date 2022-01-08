import React, {useState, useRef, useEffect} from "react"
import Codepen from "react-codepen-embed"

const EmbedYoutube = props => {
  // https://codepen.io/Sanja_kaz/pen/ZEXRpLO
  // const url = props.url
  console.log(props)
  let embedId = new URL(props.url).searchParams.get("v")
  return (
    // <Codepen hash={hash} user={user} />
    <iframe
      width="853"
      height="480"
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  )
}

export default EmbedYoutube
