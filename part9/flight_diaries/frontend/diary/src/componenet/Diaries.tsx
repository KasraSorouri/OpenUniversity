import { Diary as DiaryType } from "../type";
import Diary from "./Diary";

const Diaries = ({ diaries } : { diaries : DiaryType[] }) => {

  if (!diaries) {
    return null;
  }

  return (
    <div>
      {diaries.map(diary => (
        <Diary key={diary.id}   diary={diary} />
      ))}

    </div>
  );
};

export default Diaries;