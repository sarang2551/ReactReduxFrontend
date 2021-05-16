import React from "react";
export default function AboutInfo() {
  const colorWord = (word, color) => <font style={{ color }}>{word} </font>;
  return (
    <div
      style={{ position: "absolute", textAlign: "center", marginLeft: "20%" }}
    >
      <h1>Hello</h1>
      <span>I'm Sarang Nirwan.</span>
      <br />
      <span>
        I am a coding enthusiast who loves to learn new programming languages
        and programming concepts.
      </span>
      <br />
      <br />
      <span>
        This is my attempt at a small prototype online shop. This project is
        using {colorWord("React", "blue")} and {colorWord("Redux", "blue")} for
        frontend components. The browser {colorWord("local storage", "red")} for
        session management and {colorWord("Axios", "red")}
        for API calls. ( Users are unable to purchase anything of course)
      </span>
      <br />
      <br />
      <span>
        This frontend code is complemented by a
        {colorWord(" backend server", "green")} using{" "}
        {colorWord("NodeJS", "green")} and {colorWord("Express", "blue")}{" "}
        together with {colorWord("MongoDB", "green")} as the database. The
        server can be cloned from another repository on my github
      </span>
      <br />
      <br />
      <div>
        <span>Current features on this project are:</span>
        <ol>
          <li>
            {" "}
            Allows the login and registration of users ( after which the product
            page is unlocked )
          </li>
          <li> Allows the user to upload local images for their product</li>
          <li>
            {" "}
            Allows the addition, editing and deletion of products using redux
            state management
          </li>
          <li>
            Stores user data and product information using mongoDb in the
            backend for the node express backend server
          </li>
        </ol>
        <span>Future features to add:</span>
        <ol>
          <li> More features in the headers </li>
          <li>
            {" "}
            Sidebar profile integration to provide a custom user experience
          </li>
        </ol>
        <span> and more......</span>
      </div>
    </div>
  );
}
