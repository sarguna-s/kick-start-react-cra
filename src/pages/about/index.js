import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  const { state, search, pathname } = useLocation();

  console.log("State passed from navigate: >>>>>>>>>>>>>>>>>: ", state);
  console.log("PATHNAME passed from navigate: >>>>>>>>>>>>>>>>>: ", pathname);
  console.log(
    "QUERY PARAM passed from navigate: >>>>>>>>>>>>>>>>>: ",
    search,
    new URLSearchParams(search).get("query")
  );

  //   const goToAbout = () => {
  //     navigate("/about");
  //   };

  const gobackHome = () => {
    navigate(-1);
  };
  return (
    <section>
      <nav>
        <button onClick={gobackHome}>go back Home</button>
      </nav>
    </section>
  );
};
export default About;
