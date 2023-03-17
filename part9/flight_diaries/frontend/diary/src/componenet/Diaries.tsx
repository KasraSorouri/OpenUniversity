import { Diary as DiaryType } from "../type";
import Diary from "./Diary";

const Diaries = ({ diaries } : { diaries : DiaryType[] }) => {

  if (!diaries) {
    return null;
  }

  return (
    <div>
      <h1>Diary entries</h1>
      {diaries.map(diary => (
        <Diary key={diary.id}   diary={diary} />
      ))}

    </div>
  );
};

export default Diaries;