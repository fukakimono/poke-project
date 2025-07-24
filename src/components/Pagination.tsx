type PaginationProps = {
  onPrev: () => void;
  onNext: () => void;
  prevDisabled: boolean;
  nextDisabled: boolean;
};

const Pagination = ({ onPrev, onNext, prevDisabled, nextDisabled }: PaginationProps) => {
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 16 }}>
      <button onClick={onPrev} disabled={prevDisabled}>
        前へ
      </button>
      <button onClick={onNext} disabled={nextDisabled}>
        次へ
      </button>
    </div>
  );
};

export default Pagination;
