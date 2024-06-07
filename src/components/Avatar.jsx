import React from "react";

const Avatar = ({ userId, size, borderRadius, children }) => {
  const generateColor = (str) => {
    return "#" + Math.floor(Math.abs(Math.sin(parseInt(str, 36)) * 16777215) % 16777215).toString(16);
  };

  const style = {
    backgroundColor: generateColor(userId),
    width: size,
    height: size,
    borderRadius,
    border:'1px solid black',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  };

  return <div style={style}>{children}</div>;
};

export default Avatar;






















// const Avatar = ({
//   children,
//   px,
//   py,
//   color,
//   borderRadius,
//   fontSize,
//   cursor,
//   border
// }) => {
//   // Function to generate a hash code from a string (user ID)
//   const hashCode = (str) => {
//     let hash = 0;
//     for (let i = 0; i < str.length; i++) {
//       hash = str.charCodeAt(i) + ((hash << 12) - hash);
//     }
//     return hash & 0xffffff; // Convert the hash to a 6-digit hexadecimal color
//   };

//   const { user } = useAuth();

//   // Generate a unique color based on the user's unique identifier (like user ID or email)
//   const userId = user._id; 
//   const userColor = `#${hashCode(userId)}`; 
//   const style = {
//     backgroundColor: userColor,
//     padding: `${py} ${px}`,
//     color: "white", // Always use white text for better contrast
//     borderRadius,
//     fontSize,
//     textAlign: "center",
//     cursor,
//     textDecoration: "none",
//     border: "0.5px solid black"
//   };

//   return <div style={style}>{children}</div>;
// };

// export default Avatar;




















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
