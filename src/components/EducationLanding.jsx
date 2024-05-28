import React from 'react';
import styles from '../style';
import Header from '../components/Header';
import EducationUpload from '../components/EducationUpload';
import '../index.css';

const EducationLanding = () => {
  return (
<div>
<Header />

        {/* Welcome Section */}
        <section className="text-center py-10 animate-fade-in-up">
          <h1 className="text-4xl font-bold text-white mb-4">Welcome to Our Education Platform</h1>
          <p className="text-lg text-gray-200 mb-6">Empowering your learning journey with innovative tools and resources.</p>
          <button className="bg-secondary text-white px-6 py-3 rounded-full shadow-lg hover:bg-secondary-dark transition duration-300">
            Get Started
          </button>
        </section>

        {/* Features Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 py-10 animate-fade-in-up w-full px-4">
          <div className="feature-card bg-secondary p-6 rounded-lg shadow-lg hover:scale-105 transform transition duration-300">
            <h2 className="text-2xl font-bold text-white mb-2">Interactive Courses</h2>
            <p className="text-gray-200">Engage with our interactive and comprehensive courses designed for effective learning.</p>
          </div>
          <div className="feature-card bg-secondary p-6 rounded-lg shadow-lg hover:scale-105 transform transition duration-300">
            <h2 className="text-2xl font-bold text-white mb-2">Expert Instructors</h2>
            <p className="text-gray-200">Learn from industry experts who are passionate about teaching and sharing knowledge.</p>
          </div>
          <div className="feature-card bg-secondary p-6 rounded-lg shadow-lg hover:scale-105 transform transition duration-300">
            <h2 className="text-2xl font-bold text-white mb-2">Flexible Schedule</h2>
            <p className="text-gray-200">Access your courses anytime, anywhere, and learn at your own pace.</p>
          </div>
        </section>


        {/* Video Guide Section */}
        <section 
          className="py-20 bg-cover bg-center bg-fixed animate-fade-in-up w-full px-4"
          style={{ backgroundImage: 'url(https://wwwwp-content/uploads/2021/03/florian-olivo-4hbJ-eymZ1o-unsplash-scaled-e1616631053918.jpg)' }}
        >
          <h2 className="text-3xl font-bold text-white mb-6 text-center">How It Works</h2>
          <div className="video-container flex justify-center">
            <iframe 
              className="rounded-lg shadow-lg w-full md:w-3/4 lg:w-1/2"
              height="315" 
              src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </section>

        {/* Testimonials Section */}
        <section 
          className="text-center py-20 bg-cover bg-center bg-fixed animate-fade-in-up w-full px-4"
          style={{ backgroundImage: 'url(https://www.iamthecode.org/wp-content/uploads/2021/03/florian-olivo-4hbJ-eymZ1o-unsplash-scaled-e1616631053918.jpg)' }}
        >
                  <h2 className="text-3xl font-bold text-white mb-6 text-center">What Our Students Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="testimonial-card bg-secondary p-6 rounded-lg shadow-lg hover:scale-105 transform transition duration-300">
              <p className="text-gray-200 mb-4">"This platform has transformed my learning experience. The courses are well-structured and the instructors are fantastic!"</p>
              <h3 className="text-xl font-bold text-white">- Student A</h3>
            </div>
            <div className="testimonial-card bg-secondary p-6 rounded-lg shadow-lg hover:scale-105 transform transition duration-300">
              <p className="text-gray-200 mb-4">"I love the flexibility and the quality of the content. It has made balancing work and study so much easier."</p>
              <h3 className="text-xl font-bold text-white">- Student B</h3>
            </div>
          </div>
        </section>

        {/* EducationUpload Component */}
        <section className="w-full py-10 animate-fade-in-up">
          <EducationUpload />
        </section>
      </div>
  );
};

export default EducationLanding;
