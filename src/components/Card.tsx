type CardProps = {
  id: number; // 図鑑番号を追加
  name: string;
  image: string;
  types: string[];
};
const Card = ({ id, name, image, types }: CardProps) => {
  return (
    <div
      style={{
        position: "relative",
        border: "1px solid #ccc",
        borderRadius: 8,
        padding: 12,
        background: "#fff",
        boxShadow: "0 2px 8px #eee",
        width: 160,
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 8,
          left: 8,
          fontWeight: "bold",
          fontSize: 14,
          color: "#888",
        }}
      >
        #{id}
      </span>
      <img
        src={image}
        alt={name}
        style={{
          width: "100%",
          height: 80,
          objectFit: "contain",
          marginBottom: 8,
        }}
      />
      <h2 style={{ fontSize: 18, margin: "8px 0 4px 0" }}>{name}</h2>
      <p style={{ fontSize: 14, color: "#555" }}>Types: {types.join(", ")}</p>
    </div>
  );
};

export default Card;
