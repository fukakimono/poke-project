type PaginationProps = {
  onPrev: () => void;
  onNext: () => void;
  prevDisabled: boolean;
  nextDisabled: boolean;
};

const buttonStyle: React.CSSProperties = {
  padding: "8px 20px",
  borderRadius: 20,
  border: "1px solid #1976d2",
  background: "#fff",
  color: "#1976d2",
  fontWeight: "bold",
  fontSize: 16,
  cursor: "pointer",
  transition: "background 0.2s, color 0.2s",
  outline: "none",
};
const buttonDisabledStyle: React.CSSProperties = {
  ...buttonStyle,
  color: "#aaa",
  border: "1px solid #eee",
  cursor: "not-allowed",
  background: "#f5f5f5",
};

const Pagination = ({
  onPrev,
  onNext,
  prevDisabled,
  nextDisabled,
}: PaginationProps) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: 16,
        marginBottom: 16,
      }}
    >
      <button
        onClick={onPrev}
        disabled={prevDisabled}
        style={prevDisabled ? buttonDisabledStyle : buttonStyle}
      >
        前へ
      </button>
      <button
        onClick={onNext}
        disabled={nextDisabled}
        style={nextDisabled ? buttonDisabledStyle : buttonStyle}
      >
        次へ
      </button>
    </div>
  );
};

export default Pagination;
