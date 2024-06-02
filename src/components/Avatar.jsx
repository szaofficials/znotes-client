import React from "react";
import { useAuth } from "../api/auth";

const Avatar = ({
  children,
  px,
  py,
  color,
  borderRadius,
  fontSize,
  cursor,
  border
}) => {
  const { user } = useAuth();
  // Generate a unique color based on the user ID
  const userColor = `#${user.name ? user.name.slice(0, 6) : '000000'}`; // Take the first 6 characters of the user ID and prepend "#"

  const style = {
    backgroundColor:userColor, // Use the provided color or the generated user color
    padding: `${py} ${px}`,
    color: "white", // Always use white text for better contrast
    borderRadius,
    fontSize,
    textAlign: "center",
    cursor,
    textDecoration: "none",
    border:"0.5px solid black"
   
  };

  return <div style={style}>{children}</div>;
};

export default Avatar;




















// import React from "react";

// const Avatar = ({
//   children,
//   backgroundColor,
//   px,
//   py,
//   color,
//   borderRadius,
//   fontSize,
//   cursor,
// }) => {
//   const style = {
//     backgroundColor,
//     padding: `${py} ${px}`,
//     color: color || "black",
//     borderRadius,
//     fontSize,
//     textAlign: "center",
//     cursor: cursor || null,
//     textDecoration: "none",
//   };

//   return <div style={style}>{children}</div>;
// };

// export default Avatar;
