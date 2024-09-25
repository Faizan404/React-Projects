import { useState } from "react";

const styleExpandToggler = {
  marginLeft: ".5rem",
  textDecoration: "none",
};

export default function TextExpander({
  text = "Add your text...",
  displayWords = 50,
  backgroundColor = "transparent",
  textColor = "black",
}) {
  const textExpanderContainer = {
    backgroundColor,
    color: textColor,
    padding: "1rem",
  };
  const [expandStatus, setExpandStatus] = useState(false);

  return (
    <div style={textExpanderContainer}>
      <p>
        {expandStatus
          ? text
          : text.slice(0, displayWords).padEnd(displayWords + 5, ".")}
        <a
          style={styleExpandToggler}
          href="#"
          onClick={() => setExpandStatus(!expandStatus)}
        >
          Show {expandStatus ? "Less" : "More"}
        </a>
      </p>
    </div>
  );
}
