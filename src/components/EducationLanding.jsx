import React from 'react';
import styles from '../style';
import Header from '../components/Header';
import EducationUpload from '../components/EducationUpload';

const EducationLanding = () => {
  return (
    <div className={`bg-primary ${styles.paddingX} ${styles.flexTop}`}>
      <Header />
      <div className="container mx-auto my-10 h-screen flex flex-col items-center justify-center">
        <h1 className={styles.heading2}>Welcome to Education Mode</h1>
        <p className="text-white text-center mt-4 mb-8">
          Here you can explore features and materials designed for educational purposes.
        </p>
        <EducationUpload />
      </div>
    </div>
  );
};

export default EducationLanding;
