import BoardsInterface from "@/components/PageComponents/boards/BoardsInterface";
import { BoardsDataProvider } from "@/core/context/BoardsDataProvider";
import BoardsPageHead from "@/components/PageComponents/boards/BoardsPageHead";

export default function Boards() {
  return (
    <>
      <BoardsPageHead />
      <BoardsDataProvider>
        <BoardsInterface />
      </BoardsDataProvider>
    </>
  );
}
