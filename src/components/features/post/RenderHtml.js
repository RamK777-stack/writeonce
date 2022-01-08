import React from "react"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import gfm from "remark-gfm"
import slug from "remark-slug"
import headings from "remark-autolink-headings"
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter"
import {dracula} from "react-syntax-highlighter/dist/cjs/styles/prism"
// import { onClickCopy } from "../../utils/Utility"
import rehypeHighlight from "rehype-highlight"
import CustomTwitterComponent from "./CustomTwitterComponent"
import EmbedCodepen from "./EmbedCodepen"
import EmbedYoutube from "./EmbedYoutube"

export const syntaxHighlightComponents = {
  code({node, inline, className, children, ...props}) {
    const match = /language-(\w+)/.exec(className || "")
    console.log("children", children)
    console.log("className", className)
    console.log("inline", inline)
    console.log("match", match)
    console.log(!inline && match, "matching///")
    return !inline && match ? (
      <div className="relative group">
        <SyntaxHighlighter
          style={dracula}
          useInlineStyles={true}
          customStyle={{margin: 0}}
          language={match[1]}
          showLineNumbers={false}
          PreTag="div"
          children={String(children).replace(/\n$/, "")}
          {...props}
        />
        <button
          title="Click to copy"
          onClick={() => alert(String(children).replace(/\n$/, ""))}
          className="absolute opacity-0 focus:text-green-500 group-hover:opacity-100 top-1 right-3"
        >
          <i className="fal fa-clipboard" />
        </button>
      </div>
    ) : (
      <code className={`${className}`} {...props}>
        {children}
      </code>
    )
  },
  // blockquote(props){
  //   console.log(props)
  //   return <blockquote>{props.children}</blockquote>
  // },
  a(props) {
    console.log(props, props.href.startsWith("https://twitter.com"))
    if (props.href.startsWith("https://twitter.com")) {
      return <CustomTwitterComponent url={props.href} />
    } else if (props.href.startsWith("https://codepen.io")) {
      return <EmbedCodepen url={props.href} />
    } else if (props.href.startsWith("https://www.youtube.com")) {
      return <EmbedYoutube url={props.href} />
    } else {
      return <a href={props.href}>{props.children}</a>
    }
  },
  // blockquote({}){}
}

const RenderHtml = ({markdown}) => {
  console.log(markdown)
  return (
    <ReactMarkdown
      remarkPlugins={[gfm]}
      // linkTarget={href => {
      //   if (href && href.substring(0, 1) !== "#") return "_blank"
      // }}
      rehypePlugins={[rehypeRaw]}
      components={syntaxHighlightComponents}
      children={markdown}
      // renderers={{
      //   link: props => {
      //     console.log(props)
      //     return props.href.startsWith("https://twitter.com") ? (
      //       <CustomTwitterComponent url={props.href} /> // Render Twitter links with custom component
      //     ) : (
      //       <a href={props.href}>{props.children}</a> // All other links
      //     )
      //   },
      // }}
    />
  )
}

export default RenderHtml