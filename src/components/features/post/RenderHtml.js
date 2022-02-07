import React from "react"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import gfm from "remark-gfm"
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter"
import {nord} from "react-syntax-highlighter/dist/cjs/styles/prism"
// import { onClickCopy } from "../../utils/Utility"
import CustomTwitterComponent from "./CustomTwitterComponent"
import EmbedCodepen from "./EmbedCodepen"
import EmbedYoutube from "./EmbedYoutube"
import {FiCopy} from "react-icons/fi"
import copy from "copy-to-clipboard"

export const syntaxHighlightComponents = {
  code({node, inline, className, children, ...props}) {
    const match = /language-(\w+)/.exec(className || "")

    return !inline && match ? (
      <div className="relative grid group">
        <SyntaxHighlighter
          style={nord}
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
          onClick={() => copy(String(children).replace(/\n$/, ""))}
          className="absolute opacity-0 focus:text-green-500 group-hover:opacity-100 top-1 right-3"
        >
          <FiCopy className="h-5 w-5" />
        </button>
      </div>
    ) : (
      <code className={`${className}`} {...props}>
        {children}
      </code>
    )
  },
  img(props) {
    return <img className="rounded" src={props.src} alt={props.alt}></img>
  },
  // blockquote(props){
  //   console.log(props)
  //   return <blockquote>{props.children}</blockquote>
  // },
  a(props) {
    if (props.href.startsWith("https://twitter.com")) {
      return <CustomTwitterComponent url={props.href} />
    } else if (props.href.startsWith("https://codepen.io")) {
      return <EmbedCodepen url={props.href} />
    } else if (props.href.startsWith("https://www.youtube.com")) {
      return <EmbedYoutube url={props.href} />
    } else {
      return <a className="dark:text-slate-300" href={props.href} target="_blank" rel="noreferrer">{props.children}</a>
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
      className="dark:text-slate-300"
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
