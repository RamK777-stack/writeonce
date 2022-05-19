import React from "react"

const EmbedYoutube = props => {
  // https://codepen.io/Sanja_kaz/pen/ZEXRpLO
  // const url = props.url
  let embedId = new URL(props.url).searchParams.get("v")
  return (
    // <Codepen hash={hash} user={user} />
    <iframe
      width="750"
      height="480"
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
      style={{borderRadius: "10px"}}
    />
  )
}

export default EmbedYoutube
