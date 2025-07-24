import Card from "./Card";

type BoardProps = {
  idList: number[]; // 追加: 図鑑番号リスト
  imageList: string[];
  nameList: string[];
  typesList: string[][]; // typesは配列の配列に
};
const Board = ({ idList, imageList, nameList, typesList }: BoardProps) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 24,
        justifyItems: "center",
        padding: 24,
      }}
    >
      {idList.slice(0, 6).map((id, i) => (
        <Card
          key={id}
          id={id}
          image={imageList[i]}
          name={nameList[i]}
          types={typesList[i]}
        />
      ))}
    </div>
  );
};

export default Board;
