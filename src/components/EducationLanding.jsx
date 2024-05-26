import React from 'react';
import styles from '../style';
import Header from '../components/Header';
import EducationUpload from '../components/EducationUpload';

const EducationLanding = () => {
  return (
    <div className={`bg-primary ${styles.paddingX} ${styles.flexTop}`}>
      <Header />
      <div className="container mx-auto my-10 h-screen flex flex-col items-center justify-center">

        <EducationUpload />
      </div>
    </div>
  );
};

export default EducationLanding;
