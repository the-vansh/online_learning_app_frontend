import styles from "./ResultPanel.module.css";

const ResultPanel = ({ show, message, isSuccess, onClose }) => {
  if (!show) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={isSuccess ? styles.modalSuccess : styles.modalError}>
          {isSuccess ? "Success!" : "Error!"}
        </h2>
        <p>{message}</p>
        <button className={styles.closeButton} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ResultPanel;
