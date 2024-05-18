
// export const getCookie = (name) => {
//     const value = `; ${document.cookie}`;
//     console.log("value --> ", value);
//     console.log("name --> ", name);
//     const parts = value.split(`; ${name}=`);
//     console.log("parts--> ", parts);
//     if (parts.length === 2) return parts.pop().split(';').shift();
//     return null;
//   };


export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};
