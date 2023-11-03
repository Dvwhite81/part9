import { useEffect, useState } from 'react';
import { DiaryEntry } from './types';
import AllDiaries from './components/AllDiaries';
import DiaryForm from './components/DiaryForm';
import Notification from './components/Notification';
import diaryService from './services/diaryService';
import './App.css';

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchDiaryList = async () => {
      const diaries = await diaryService.getAll();
      setDiaries(diaries);
    };
    void fetchDiaryList();
  }, []);

  return (
    <div>
      <Notification errorMessage={errorMessage} />
      <DiaryForm diaries={diaries} setDiaries={setDiaries} setErrorMessage={setErrorMessage} />
      <AllDiaries diaries={diaries} />
    </div>
  );
}

export default App;
