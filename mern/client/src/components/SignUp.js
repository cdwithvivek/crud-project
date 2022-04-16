import React, { useState } from "react";
import navImage from "../images/reg_img.jpg";
import { Link, useNavigate } from "react-router-dom";
const SignUp = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
  });

  //navigation
  let navigate = useNavigate();

  // send user data to database
  let name, value;
  const handleInputs = (e) => {
    // console.log(e.target.name);
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const postData = async (e) => {
    try {
      e.preventDefault();
      const { name, email, phone, work, password, cpassword } = user;
      const res = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phone, work, password, cpassword }),
      });
      const data = await res;
      const json = data.json();
      console.log(json);
      console.log(res.status, data);
      if (!data || data.status >= 300) {
        window.alert("Invalid Registeration");
        console.log("invalid register");
        navigate("/SignUp");
      } else {
        window.alert("sucessfully register");
        console.log("successfully register");
        navigate("/Login");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <section className="vh-100 pt-3" style={{ backgroundColor: "#eee" }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Sign up
                    </p>

                    <form method="POST" className="mx-1 mx-md-4">
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="text"
                            id="form3Example1c"
                            className="form-control"
                            placeholder="Enter your name"
                            autoComplete="off"
                            name="name"
                            value={user.name}
                            onChange={handleInputs}
                          />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="email"
                            id="form3Example3c"
                            className="form-control"
                            placeholder="Enter you email"
                            autoComplete="off"
                            name="email"
                            value={user.email}
                            onChange={handleInputs}
                          />
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fa-solid fa-mobile fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="text"
                            id="form3Example1c"
                            className="form-control"
                            placeholder="Enter your Mobile Number"
                            autoComplete="off"
                            name="phone"
                            value={user.phone}
                            onChange={handleInputs}
                          />
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-solid fa-chalkboard-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="text"
                            id="form3Example1c"
                            className="form-control"
                            placeholder="Enter your Profession"
                            autoComplete="off"
                            name="work"
                            value={user.work}
                            onChange={handleInputs}
                          />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="password"
                            id="form3Example4c"
                            className="form-control"
                            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
                            autoComplete="off"
                            name="password"
                            value={user.password}
                            onChange={handleInputs}
                          />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="password"
                            id="form3Example4cd"
                            className="form-control"
                            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
                            autoComplete="off"
                            name="cpassword"
                            value={user.cpassword}
                            onChange={handleInputs}
                          />
                        </div>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg"
                          onClick={postData}
                        >
                          Register
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-none d-md-flex align-items-center order-1 order-lg-2 ">
                    <figure className="signup-figure">
                      <img
                        src={navImage}
                        alt="registration_img"
                        className="img-fluid"
                      />
                      <Link to="/login" className="signup-image-link">
                        I am already register
                      </Link>
                    </figure>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
