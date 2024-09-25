import React, { useState } from "react";
import ReactDOM from "react-dom/client";
// import './index.css';
// import App from './App';
// import StarRating from "./StarRating";
import TextExpander from "./challanges/TextExpander";

// function TestRatingComponent() {
//   const [movieRating, setMovieRating] = useState(0);

//   return (
//     <div>
//       <StarRating maxRating={10} onSetRating={setMovieRating} />
//       <p>The Movie have {movieRating} starts of rating</p>
//     </div>
//   );
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <TextExpander
      text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      dispayWords={50}
      backgroundColor="crimson"
      textColor="white"
    />
    <TextExpander
      text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      textColor="cornflowerblue"
    />
    {/* <StarRating
      // maxRating={10}
      message={["Terrible", "Bad", "Fine", "Good", "Excellent"]}
    />
    <StarRating maxRating={5} size={18} color={"crimson"} />
    <StarRating maxRating={10} color={"cornflowerblue"} defaultRating={6} />
    <TestRatingComponent /> */}
  </React.StrictMode>
);
