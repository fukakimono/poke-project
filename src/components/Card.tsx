type CardProps = {
  id: number; // 図鑑番号を追加
  name: string;
  image: string;
  types: string[];
};

const typeColors: { [key: string]: string } = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

const Card = ({ id, name, image, types }: CardProps) => {
  return (
    <div
      style={{
        position: "relative",
        border: "none",
        borderRadius: 16,
        padding: 16,
        background: "linear-gradient(135deg, #f8fafc 60%, #e0e7ff 100%)",
        boxShadow: "0 4px 16px #b6b6b6a0",
        width: 180,
        transition: "transform 0.2s, box-shadow 0.2s",
        cursor: "pointer",
      }}
      onMouseOver={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform =
          "translateY(-6px) scale(1.04)";
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 8px 24px #a5b4fc99";
      }}
      onMouseOut={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "none";
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 4px 16px #b6b6b6a0";
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 12,
          left: 16,
          fontWeight: "bold",
          fontSize: 13,
          color: "#64748b",
          letterSpacing: 1,
        }}
      >
        #{id}
      </span>
      <img
        src={image}
        alt={name}
        style={{
          width: "100%",
          height: 90,
          objectFit: "contain",
          marginBottom: 10,
          filter: "drop-shadow(0 2px 8px #a5b4fc33)",
        }}
      />
      <h2
        style={{
          fontSize: 20,
          margin: "10px 0 6px 0",
          fontWeight: 700,
          color: "#334155",
          textAlign: "center",
          letterSpacing: 1,
        }}
      >
        {name}
      </h2>
      <div
        style={{
          display: "flex",
          gap: 6,
          justifyContent: "center",
          margin: "6px 0",
        }}
      >
        {types.map((type) => (
          <span
            key={type}
            style={{
              background: typeColors[type.toLowerCase()] || "#e5e7eb",
              color: "#fff",
              borderRadius: 12,
              padding: "2px 10px",
              fontSize: 13,
              fontWeight: 600,
              textTransform: "capitalize",
              boxShadow: "0 1px 4px #0001",
            }}
          >
            {type}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Card;
