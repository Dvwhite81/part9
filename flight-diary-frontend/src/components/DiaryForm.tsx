import React, { useState } from 'react';
import { DiaryEntry, Visibility, Weather } from '../types';
import { FormProps } from '../types';
import diaryService from '../services/diaryService';

const DiaryForm = ({ diaries, setDiaries, setErrorMessage }: FormProps) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [comment, setComment] = useState('');

  const notify = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage('');
    }, 5000);
  };

  const isInvalid =
    date === '' ||
    weather === undefined ||
    visibility === undefined ||
    comment === '';

  const resetFields = () => {
    setDate('');
    setVisibility(Visibility.Great);
    setWeather(Weather.Sunny);
    setComment('');
  };

  const handleSubmit =async (event:React.SyntheticEvent) => {
    event.preventDefault();

    const newEntry: DiaryEntry = {
      id: diaries.length + 1,
      date,
      visibility,
      weather,
      comment
    };

    try {
      await diaryService.create(newEntry);
      setDiaries(diaries => [...diaries, newEntry as DiaryEntry]);
      resetFields();
    } catch (error) {
      if (error instanceof Error) {
        notify(error.message);
      }
      else {
        notify('Something bad happened.');
      }
    }
  };

  return (
    <div>
      <h2>Add New Entry</h2>
      <form onSubmit={handleSubmit}>
        <div className='flex-column'>
          Date: <input type='date' value={date} onChange={(event) => setDate(event.target.value)} />
        </div>
        <div className='flex-column'>
          Visibility:
          <div className='flex-row'>
            {Object.values(Visibility).map(v =>
              <div key={v}>
                <label>{v}</label>
                <input
                  type='radio'
                  name='visibility'
                  value={v}
                  checked={visibility === v}
                  onChange={({ target }) => setVisibility(target.value as Visibility)}
                />
              </div>
            )}
          </div>
        </div>
        <div className='flex-column'>
          Weather:
          <div className='flex-row'>
            {Object.values(Weather).map(w =>
              <div key={w}>
                <label>{w}</label>
                <input
                  type='radio'
                  name='weather'
                  value={w}
                  checked={weather === w}
                  onChange={({ target }) => setWeather(target.value as Weather)}
                />
              </div>
            )}
          </div>
        </div>
        <div className='flex-column'>
          Comments: <input type='text' value={comment} onChange={(event) => setComment(event.target.value)} />
        </div>
        <button type='submit' disabled={isInvalid}>Add</button>
      </form>
    </div>
  )
}

export default DiaryForm;
