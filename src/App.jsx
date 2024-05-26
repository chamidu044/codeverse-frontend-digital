import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import styles from "./style"; // Importing styles for component styling
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"
import {
  Navbar,
  Hero,
  Mode,
  Testimonials,
  Footer,
  EducationMode,
  BusinessMode,
  UploadImageForm,
  Services,
  ServiceTeam,
  LoginPage,
  SignupPage,
  BusinessLanding,
  EducationLanding
} from "./components";

// Main App component
const App = () => (
  <Router>
    {/* Main container with background color, width, and overflow */}
    <div className="bg-primary w-full overflow-hidden">
      <Routes>
        {/* Route for the homepage */}
        <Route
          path="/"
          element={
            // Container for the homepage content
            <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
              {/* Inner container limiting content width */}
              <div className={`${styles.boxWidth}`}>
                {/* Components rendered on the homepage */}
                <Navbar/>
                <Hero/> 
                <Mode/> 
                {/* <UploadImageForm/>  */}
                <Testimonials/> 
                <Services/> 
                <Footer/> 
                <Analytics/>
                <SpeedInsights/>
              </div>
            </div>
          }
        />
        {/* Routes for various pages */}
        <Route path="/EducationMode" element={<EducationMode />} /> 
        <Route path="/BusinessMode" element={<BusinessMode />} /> 
        <Route path="/serviceteam" element={<ServiceTeam />} /> 
        <Route path="/login" element={<LoginPage />} /> 
        <Route path="/signup" element={<SignupPage />} /> 
        <Route path="/BusinessLanding" element={<BusinessLanding />} /> 
        <Route path="/EducationLanding" element={<EducationLanding />} /> 


      </Routes>
    </div>
  </Router>
);

export default App; 
