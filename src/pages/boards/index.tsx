import BoardsInterface from "@/components/PageComponents/boards/BoardsInterface";
import { BoardsDataProvider } from "@/core/context/BoardsDataProvider";

export default function Boards() {
  return (
    <BoardsDataProvider>
      <BoardsInterface />
    </BoardsDataProvider>
  );
}
