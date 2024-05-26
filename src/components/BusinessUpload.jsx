import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles, { layout, mobile } from "../style";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

const BusinessUpload = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState({ status: "", message: "", error: "" });
  const navigate = useNavigate();
  const [user, loadingUser] = useAuthState(auth);

  useEffect(() => {
    if (responseMsg.status === "success" && user) {
      navigate('/BusinessMode');
    }
  }, [responseMsg, user, navigate]);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (fileValidate(file)) {
      setImage(file);
      setResponseMsg({ ...responseMsg, error: "" });
    } else {
      setImage(null);
      setResponseMsg({ ...responseMsg, error: "File type allowed only png" });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);

    if (!image || !fileValidate(image)) {
      setLoading(false);
      return;
    }

    const data = new FormData();
    data.append("file", image);

    axios.post("https://codeverse-backend-w4o3yqxq3a-uc.a.run.app/upload", data)
      .then((response) => {
        if (response.status === 201) {
          setResponseMsg({ status: response.data.status, message: response.data.message });
          setTimeout(() => {
            setImage(null);
            setResponseMsg({});
            setLoading(false);
          }, 1000);
          document.querySelector("#Upload").reset();
        }
      })
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.status === 401) {
          alert("Invalid credentials");
        }
        setLoading(false);
      });
  };

  const fileValidate = (file) => {
    return file && (file.type === "image/png");
  };

  const redirectToLogin = () => {
    navigate('/login');
  };

  return (
    <section id="" className={`${layout.section} flex-col relative`}>
      <div className="container mx-auto my-10 h-screen flex items-center justify-center">
        <div className="max-w-2xl w-full p-8 rounded-md shadow-md flex flex-col items-center">
          <div className="absolute z-[0] w-[80%] h-[30%] -left-[60%] rounded-full pink__gradient bottom-50" />
          <h1 className={styles.heading2} id="Upload">
            Upload a Photo <span className="text-gradient">Here</span>
          </h1>

          <div className="mb-6 py-8">
            <h1 className={styles.heading3}>Instructions & Limitations</h1>
            <p className="text-gray-400"><br />Please follow the instructions below before uploading your photo:</p>
            <p className="text-white py-4">
              1. Upload image should be in the type of .png / .jpg / .jpeg <br />
              2. Dataset is working with 200 images, accuracy is still in the minimum condition <br />
              3. Only predicts 6 elements in HTML components <br />
              4. Try out with this sample image{" "}
              <a href="/imagecheck1.png" download="sampleimage.png" className="text-blue-500 underline">Download Sample Image</a>
            </p>
          </div>

          {responseMsg.status === "success" ? (
            <div className="alert alert-success">{responseMsg.message}</div>
          ) : responseMsg.status === "failed" ? (
            <div className="alert alert-danger">{responseMsg.message}</div>
          ) : (
            ""
          )}

          <form onSubmit={submitHandler} encType="multipart/form-data" className="w-full max-w-lg">
            <div className="mb-6">
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="mt-1 p-4 border rounded-md w-full text-gray-50"
              />
              <span className="text-red-500">{responseMsg.error}</span>
            </div>
            <div className="mt-6">
              {user ? (
                <button
                  type="submit"
                  className={`bg-purple-500 hover:bg-purple-600 text-white py-4 px-6 rounded-md w-full ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  disabled={loading}
                >
                  {loading ? (
                    <span>
                      Uploading...{' '}
                      <i className="animate-spin inline-block h-4 w-4 border-t-2 border-b-2 border-white rounded-full"></i>
                    </span>
                  ) : (
                    "Upload"
                  )}
                </button>
              ) : (
                <div className="flex flex-col items-center border border-purple-500 p-4 rounded-md">
                  <p className="text-white py-2 text-m">
                    To upload an image, please{" "}
                    <span className="underline cursor-pointer hover:text-purple-600" onClick={redirectToLogin}>
                      log in
                    </span>.
                  </p>
                  <p className="text-m text-gray-400">
                    Don't have an account?{" "}
                    <Link to="/signup" className="underline hover:text-purple-600">
                      <span className="">Sign up here</span>
                    </Link>
                  </p>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BusinessUpload;
