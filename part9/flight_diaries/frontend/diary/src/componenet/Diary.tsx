import { Diary as DiaryType} from "../type";

const Diary = ({ diary }:  { diary : DiaryType }) => {
  return (
    <div>
      <h3>{diary.date}</h3>
      <p>visibility: {diary.visibility}</p>
      <p>weather: {diary.weather}</p>
    </div>
  );
};

export default Diary;