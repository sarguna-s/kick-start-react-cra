import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const goToAbout = () => {
    navigate("/about?query=param", {
      state: { name: "Sarguna", age: 19, gender: "Female" },
    });
  };

  // const goBack = () => {
  //   navigate(-1);
  // }
  return (
    <section>
      <nav>
        <button onClick={goToAbout}>go To About</button>
      </nav>
    </section>
  );
};

export default Home;
