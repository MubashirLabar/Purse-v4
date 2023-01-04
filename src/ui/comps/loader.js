import React from "react";

function Loader(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ 
        margin: "auto",
        background: "#fff",
        width: props.width || 60,
        height: props.height || 60
      }}
      width="200"
      height="200"
      display="block"
      preserveAspectRatio="xMidYMid"
      viewBox="0 0 100 100"
    >
      <g transform="translate(50 50) scale(.7)">
        <circle r="50" fill="#dd4343"></circle>
        <circle cy="-28" r="15" fill="#fff">
          <animateTransform
            attributeName="transform"
            dur="1s"
            keyTimes="0;1"
            repeatCount="indefinite"
            type="rotate"
            values="0 0 0;360 0 0"
          ></animateTransform>
        </circle>
      </g>
    </svg>
  );
}

export default Loader;