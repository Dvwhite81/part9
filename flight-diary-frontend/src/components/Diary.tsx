import { DiaryEntry } from "../types";

interface DiaryProps {
  diary: DiaryEntry
}

const Diary = ({ diary }: DiaryProps) => {
  return (
    <div className="single-diary" key={diary.id}>
      <li key={diary.id}>
        <h3>{diary.date}</h3>
        <div>
          <p><strong>Visibility: </strong>{diary.visibility}</p>
          <p><strong>Weather: </strong>{diary.weather}</p>
          <p><strong>Comments: </strong><em>{diary.comment}</em></p>
        </div>
      </li>
    </div>
  )
}

export default Diary;
