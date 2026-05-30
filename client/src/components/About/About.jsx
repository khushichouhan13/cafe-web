import useScrollAnimation from '../../hooks/useScrollAnimation';
import styles from './About.module.css';

const About = () => {
  const { ref: imgRef, isVisible: imgVisible } = useScrollAnimation(0.15);
  const { ref: textRef, isVisible: textVisible } = useScrollAnimation(0.15);

  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        <div
          ref={imgRef}
          className={`${styles.imageCol} ${imgVisible ? styles.imageVisible : ''}`}
        >
          <div className={styles.circleWrap}>
            <img
              src="/images/about_barista.png"
              alt="Barista crafting latte art with expert hands"
              className={styles.circleImg}
            />
            <div className={styles.badge}>
              <span className={styles.badgeNum}>Est.</span>
              <span className={styles.badgeYear}>2018</span>
            </div>
          </div>
        </div>

        <div
          ref={textRef}
          className={`${styles.textCol} ${textVisible ? styles.textVisible : ''}`}
        >
          <p className={styles.eyebrow}>Our Café</p>
          <h2 className={styles.title}>
            Artistry in Every<br />Drop
          </h2>
          <p className={styles.body}>
            At Brew Haven, we believe coffee is more than a drink — it is an
            experience. Every cup we serve is crafted with precision, care, and
            the finest ethically sourced beans from around the world.
          </p>

          <ul className={styles.features}>
            <li className={styles.feature}>
              <span className={styles.checkIcon}>✓</span>
              <div>
                <strong>100% Sustainably Sourced</strong>
                <p>Every bean is traceable to ethical farms.</p>
              </div>
            </li>
            <li className={styles.feature}>
              <span className={styles.checkIcon}>✓</span>
              <div>
                <strong>Local Artisanal Partners</strong>
                <p>Freshly baked goods from local producers daily.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;
