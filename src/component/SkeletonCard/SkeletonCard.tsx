import styles from './SkeletonCard.module.scss';

const SkeletonCard = () => {
  return (
    <div className={styles.SkeletonCard}>
      <div className={styles.SkeletonCard__image}></div>

      <div className={styles.SkeletonCard__title}></div>

      <div className={styles.SkeletonCard__type}></div>

      <div className={styles.SkeletonCard__info}></div>
    </div>
  );
};

export default SkeletonCard;
