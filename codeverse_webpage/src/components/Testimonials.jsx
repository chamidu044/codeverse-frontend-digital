import { feedback } from "../constants";
import styles from "../style";
import FeedbackCard from "./FeedbackCard";

const Testimonials = () => (
  <section id="Plans" className={`${styles.paddingY} ${styles.flexCenter} flex-col relative `}>
    <div className="absolute z-[0] w-[80%] h-[80%] -right-[50%] rounded-full blue__gradient bottom-40" />

    <div className="w-full flex justify-between items-center md:flex-row flex-col sm:mb-16 mb-6 mt-14 relative z-[1]">
      <h2 className={styles.heading2}>
        Select a plan <br className="sm:block hidden" /> 
        <span className="text-gradient"> you desire</span>{" "}
        <p className={`${styles.paragraph} text-left max-w-[450px] py-6`}>
          Select a plan to turn your visions into relality...
        </p>
      </h2>

    </div>

    <div className="flex flex-wrap sm:justify-start justify-center w-full feedback-container relative z-[1]">
      {feedback.map((card) => <FeedbackCard key={card.id} {...card} />)}
    </div>
  </section>
);

export default Testimonials;
