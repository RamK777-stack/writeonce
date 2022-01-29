import React, {useState, useRef, useEffect} from "react"
import Codepen from "react-codepen-embed"

const EmbedCodepen = props => {
  const SCRIPT_URL = "https://static.codepen.io/assets/embed/ei.js" // new embed
  const LOAD_STATE = {
    booting: "__booting__",
    error: "__error__",
    loading: "__loading__",
    loaded: "__loaded__",
  }

  const [loadState, setLoadState] = useState(LOAD_STATE.booting)
  const [error, setError] = useState()
  const _isMounted = useRef(false)

  const loadScript = () => {
    // load the codepen embed script
    const script = document.createElement("script")
    script.src = SCRIPT_URL
    script.async = 1
    script.onload = () => {
      // do not do anything if the component is already unmounted.
      if (!_isMounted.current) return
      setLoadState(LOAD_STATE.loaded)
    }
    script.onerror = () => {
      if (!_isMounted.current) return
      setLoadState(LOAD_STATE.error)
      setError("Failed to load the pen")
    }

    setLoadState(LOAD_STATE.loading)
    document.body.appendChild(script)
  }

  useEffect(() => {
    if (_isMounted.current === false) _isMounted.current = true
    loadScript()
    return () => (_isMounted.current = false)
  }, [])

  let url = props.url
  url = url.replace("https://codepen.io/", "")
  url = url.replace("/pen/", " ")
  const [user, hash] = url.split(" ")
  const penLink = `https://codepen.io/${user}/pen/${hash}/`
  const userProfileLink = `https://codepen.io/${user}`
  return (
    // <Codepen hash={hash} user={user} />
    <p
      data-height={props.height || 400}
      data-theme-id={props.themeId || 'dark'}
      data-slug-hash={hash}
      data-default-tab={props.defaultTab || 'css,result'}
      data-user={user}
      data-pen-title={props.title}
      data-preview={props.preview || true}
      data-editable={props.editable || false}
      className="codepen"
      data-embed-version={props.version || 2}
      style={{width: '100%'}}
    >
      See the Pen <a href={penLink}>{props.title}</a>
      by {user} (<a href={userProfileLink}>@{user}</a>) on
      <a href="https://codepen.io">CodePen</a>.
    </p>
  )
}

export default EmbedCodepen