import Header from './components/Header';
import Content from './components/Content';
import Total from './components/Total';
import { courseParts } from './data';
import './App.css';

const App = () => {
  const courseName = 'Half Stack application development';

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total total={totalExercises} />
    </div>
  );
};

export default App;
