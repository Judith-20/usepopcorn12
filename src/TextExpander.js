import React, { useState } from 'react'

const TextExpanderStyle = {
    fontFamily:"sans-serif",
    padding:"10px",
    border:"1px solid #ccc",
    borderRadius:"7px",
    backgroundColor:"#f7f7f7",
    margin: "8px"
}

const TextExpander = ({
    collapsedNumWords = 10,
    expandButtonText = "Show more",
    collapsedButtonText = "Show less",
    buttonColor = "#1f09cd",
    expanded = false,
    className,
    children}) => {

    const buttonStyle = {
        background: "none",
        border:"none",
        font:"inherit",
        cursor:"pointer",
        marginLeft: "6px",
        color: buttonColor
    }

    const [isExpanded, setIsExpanded] = useState(expanded)
    const displayText = isExpanded ? children : children.split(" ").slice(0, collapsedNumWords).join(" ") + "..."
  return (
    <div style={TextExpanderStyle} className={className}>
      {/* <span>{children}</span> */}
      <span>{displayText}</span>
      <button style={buttonStyle} onClick={() => setIsExpanded(exp => !exp)}>{isExpanded ? collapsedButtonText : expandButtonText}</button>
    </div>
  )
}

export default TextExpander


// {/* <TextExpander>
// Space travel is the ultimate adventure! Imagine soaring the stars and exploring new worlds. It's the stuff of dreams and science fiction, but believe it or not, space travel is a real thing. Humans and robots are constantly venturing out into the cosmos to uncover its secrets and push the boundaries of what's possible.
// </TextExpander>
//  <TextExpander expandButtonText = "Show text"
// collapsedButtonText = "Collapse text"  collapsedNumWords = {20}  buttonColor="#ff6622" >
//   Space travel requires some seriously amazing technology and collaboration between countries, private companies, and international space organizations. And while it's not always easy (or cheap), the results are out of this world. think about the first time humans stepped foot on the moon or when rovers were sent to roam on Mars.
// </TextExpander>
// {/* <TextExpander expanded={true} className="box" >
//   Space missions have given us incredible insights into our universe and have inspired future generations to keep reaching for the stars. Space travel is a pretty cool thing to think about. Who knows what we'll discover next!
// </TextExpander> */}