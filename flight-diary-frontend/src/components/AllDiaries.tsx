import { DiaryEntry } from '../types';
import Diary from './Diary';

interface AllDiariesProps {
  diaries: DiaryEntry[];
}

const AllDiaries = ({ diaries }: AllDiariesProps) => {

  return (
    <div>
      <h2>Diary Entries</h2>
      <ul>
        {diaries.map(diary =>
          <Diary key={diary.id} diary={diary} />
        )}
      </ul>
    </div>
  )
}

export default AllDiaries;
