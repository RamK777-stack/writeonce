import ReactGA from "react-ga4"
ReactGA.initialize(process.env.REACT_APP_G4_TRACKING_ID)

export const uid = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

export const objectId = () => {
  const timestamp = ((new Date().getTime() / 1000) | 0).toString(16)
  return (
    timestamp +
    "xxxxxxxxxxxxxxxx"
      .replace(/[x]/g, function () {
        return ((Math.random() * 16) | 0).toString(16)
      })
      .toLowerCase()
  )
}

export const setCaretToEnd = element => {
  if (
    typeof window.getSelection != "undefined" &&
    typeof document.createRange != "undefined"
  ) {
    const range = document.createRange()
    const selection = window.getSelection()
    range.selectNodeContents(element)
    range.collapse(false)
    selection.removeAllRanges()
    selection.addRange(range)
    element.focus()
  } else if (typeof document.body.createTextRange != "undefined") {
    let textRange = document.body.createTextRange()
    textRange.moveToElementText(element)
    textRange.collapse(false)
    textRange.select()
  }
}

export const getCaretCoordinates = e => {
  let x, y
  const selection = window.getSelection()
  if (selection.rangeCount !== 0) {
    const range = selection.getRangeAt(0).cloneRange()
    range.collapse(false)
    const rect = range.getClientRects()[0]
    const bodyRect = document.body.getBoundingClientRect()
    const offset = rect.top - bodyRect.top
    if (rect) {
      x = rect.left
      y = offset
    }
  }
  return {x, y}
}

export const pageViewAnalytics = path => {
  ReactGA.send({
    hitType: "pageview",
    page: path,
  })
}
