import React from "react";
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook
import styles, { layout } from "../style"; // Importing styles and layout from style file
import { FaBriefcase, FaGraduationCap } from 'react-icons/fa'; // Importing icons from react-icons

// ButtonCard component for rendering a card with a button
const ButtonCard = ({ mode, description, onClick, Icon }) => (
  <div className="flex flex-col items-center justify-center p-8 rounded-lg shadow-lg bg-dimBlue">
    <Icon className="text-white text-4xl mb-4" />
    <h4 className="font-poppins font-semibold text-white text-lg leading-6 text-center mb-4">
      {mode} Mode
    </h4>
    <p className="font-poppins font-normal text-dimWhite text-base leading-6 text-center mb-6">
      {description}
    </p>
    <button
      className="py-2 px-6 bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold rounded-lg shadow-md transition-transform transform hover:from-purple-700 hover:to-violet-900 focus:outline-none hover:scale-105"
      onClick={onClick}
    >
      Enter {mode} Mode
    </button>
  </div>
);

// BusinessEducationMode component for rendering the section with two button cards
const Mode = () => {
  const navigate = useNavigate(); // Using useNavigate hook

  const handleBusinessModeClick = () => {
    // Navigate to BusinessLanding page
    navigate('/BusinessLanding');
  };

  const handleEducationModeClick = () => {
    // Navigate to EducationLanding page
    navigate('/EducationLanding');
  };

  return (
    <section className={`${layout.section} flex flex-col items-center justify-center relative`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ButtonCard
          mode="Business"
          description="Access tools and resources tailored for business use."
          onClick={handleBusinessModeClick}
          Icon={FaBriefcase}
        />
        <ButtonCard
          mode="Education"
          description="Explore features and materials designed for educational purposes."
          onClick={handleEducationModeClick}
          Icon={FaGraduationCap}
        />
      </div>
    </section>
  );
};

export default Mode;
