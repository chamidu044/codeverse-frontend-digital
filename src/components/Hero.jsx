import React, { useState } from "react";
import firebase from "firebase/compat/app"; // Import Firebase
import "firebase/firestore"; // Import Firestore
import styles from "../style";
import { robot } from "../assets";

// Initialize Firebase (make sure to replace with your Firebase config)
const firebaseConfig = {
  apiKey: "AIzaSyAdpNnIXuwQGe7LMjR4btQWtgB-_rJGq4I",
  authDomain: "login-register-5fd94.firebaseapp.com",
  projectId: "login-register-5fd94",
  storageBucket: "login-register-5fd94.appspot.com",
  messagingSenderId: "747615529808",
  appId: "1:747615529808:web:a94566381e7436f9cf9a55",
  measurementId: "G-1CXWR8SLT6"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const firestore = firebase.firestore(); // Firestore instance

const Hero = () => {
  const [feedback, setFeedback] = useState(""); // State to store feedback
  const [name, setName] = useState(""); // State to store user's name
  const [showFeedbackModal, setShowFeedbackModal] = useState(false); // State to control modal visibility

  const toggleFeedbackModal = () => {
    setShowFeedbackModal(!showFeedbackModal);
  };

  const handleFeedbackSubmit = async (event) => {
    event.preventDefault();

  const handleCloseModal = () => {
      setShowFeedbackModal(false);
  };
    try {
      // Add feedback to Firestore collection
      await firestore.collection("feedback").add({
        name, // Add user's name
        feedback,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });

      // Clear input fields
      setName("");
      setFeedback("");

      // Optionally, you can close the modal here
      toggleFeedbackModal();

      alert("Feedback submitted successfully!");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("An error occurred while submitting feedback. Please try again later.");
    }
  };

  const handleCloseModal = () => {
    setShowFeedbackModal(false);
  };

  return (
    <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100.8px] leading-[75px]">
            Visions <br className="sm:block hidden" />{" "}
            <span className="text-gradient"> Into Reality...</span>{" "}
          </h1>
        </div>
        <p className={`${styles.paragraph} max-w-[500px] mt-6`}>
          Elevate your web design game with CODEVERSE - effortlessly transform 
          hand-drawn sketches into functional websites. Simplify your journey into 
          web development and unleash creativity without the hassle of manual coding.
        </p>
        <div className="py-20 grid gap-8 items-start justify-center">
          <div className="relative group">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-100">
            </div>
            <button
              className="relative px-8 py-5 md:px-10 md:py-6 bg-black rounded-lg leading-none flex items-center divide-x divide-gray-600"
              onClick={toggleFeedbackModal}
            >
              <span className="flex items-center space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 md:h-8 md:w-8 text-gray-100 -rotate-6 animate-spin"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
                </svg>
                <span className="pr-4 md:pr-6 text-lg md:text-xl text-gray-400">Beta Release 2.0</span>
              </span>
              <span className="pl-4 md:pl-6 text-purple-500 md:text-xl lg:text-xl group-hover:text-purple-700 transition duration-100">Feedback &rarr;</span>
            </button>
          </div>
        </div>
      </div>

      {showFeedbackModal && (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-40 z-50">
        <div className="bg-black  p-8 md:p-10 rounded-lg">
          <h2 className="text-2xl text-white font-semibold mb-4">Leave your feedback</h2>
          <button
            className="relative bottom-11 left-72 text-white hover:text-gray-300 focus:outline-none"
            onClick={handleCloseModal}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <form onSubmit={handleFeedbackSubmit}>
              <div className="mb-4 text-dimWhite">
                <label htmlFor="name">Your Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border-gray-300 text-black rounded-lg focus:outline-none focus:border-purple-500 p-2"
                  required
                />
              </div>
              <div className="mb-4 text-dimWhite">
                <label htmlFor="feedback">Your Feedback:</label>
                <textarea
                  id="feedback"
                  name="feedback"
                  rows="4"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full border-gray-300 text-black rounded-lg focus:outline-none focus:border-purple-500 p-2"
                  required
                ></textarea>
              </div>
              <button
              type="submit"
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:bg-purple-700"
            >
              Submit Feedback
            </button>
          </form>
          </div>
        </div>
      )}

      <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
        <iframe
          id="aiHtmlIframe"
          src={"/globe.html"}
          title="GenAI-Bot"
          width="100%"
          height="600px"
          frameBorder="0"
          style={{ position: 'static', zIndex: '1', top: '35px' }}
        ></iframe>
        <div className="absolute z-[0] w-[60%] h-[60%] top-0 pink__gradient" />
        <div className="absolute z-[0] w-[80%] h-[60%] right-20 bottom-20 blue__gradient" />
      </div>
    </section>
  );
};

export default Hero;
