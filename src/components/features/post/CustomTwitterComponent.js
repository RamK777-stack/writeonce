import React from "react"
import {TwitterTweetEmbed} from "react-twitter-embed"
export default function CustomTwitterComponent({url}) {
  url = url.split("/")
  return (
    // <blockquote class="twitter-tweet">
    //   <a href={url}></a>
    // </blockquote>
    <TwitterTweetEmbed tweetId={url[url.length - 1]} />
  )
}
