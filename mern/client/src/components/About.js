import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import profilePic from "../images/reg_img.jpg";
import about_bg from "../images/about_bg.jpeg";
const About = () => {
  const [userData, setUserData] = useState("");

  const navigation = useNavigate();
  //hooks for manage state
  const callAboutPage = async () => {
    try {
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res;
      const json = await data.json();
      setUserData(json);
      if (!(data.status === 200)) {
        const error = new Error(data.error);
        throw error;
      } else {
        navigation("/about");
      }
    } catch (e) {
      navigation("/login");
    }
  };

  useEffect(() => {
    callAboutPage();
  }, []);

  return (
    <>
      <div className="container-fluid d-flex justify-content-center align-items-center about-container">
        <div className="carding">
          <div className="upper">
            {" "}
            <img src={about_bg} classNameNa="img-fluid" alt="about-bg" />{" "}
          </div>
          <div className="user text-center">
            <div className="profile">
              {" "}
              <img
                src={profilePic}
                className="rounded-circle"
                width="80"
                alt="profile pic"
              />{" "}
            </div>
          </div>
          <div className="mt-5 text-center">
            <h4 className="mb-0">{userData.name}</h4>{" "}
            <span className="text-muted d-block mb-2">{userData.work}</span>{" "}
            <button className="btn btn-secondary btn-sm follow">
              <Link to="/contact">Follow</Link>
            </button>
            <div className="d-flex justify-content-between align-items-center mt-4 px-4">
              <div className="stats">
                <h6 className="mb-0">work</h6> <span>{userData.email}</span>
              </div>

              <div className="stats">
                <h6 className="mb-0">Phone</h6> <span>{userData.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
