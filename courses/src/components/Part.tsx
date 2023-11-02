import { PartProps } from '../types';

const Part = ({ part }: PartProps) => {
  const { name, exerciseCount, kind } = part;

  switch (kind) {
    case 'basic':
      return (
        <div>
          <p><strong>{name} {exerciseCount}</strong></p>
          <p><em>{part.description}</em></p>
        </div>
      )

    case 'group':
      return (
        <div>
          <p><strong>{name} {exerciseCount}</strong></p>
          <p>project exercises {part.groupProjectCount}</p>
        </div>
      )

    case 'background':
      return (
        <div>
          <p><strong>{name} {exerciseCount}</strong></p>
          <p><em>{part.description}</em></p>
          <p>submit to {part.backgroundMaterial}</p>
        </div>
      )

    case 'special':
      return (
        <div>
          <p><strong>{name} {exerciseCount}</strong></p>
          <p><em>{part.description}</em></p>
          <p>required skills: {part.requirements.join(', ')}</p>
        </div>
      )

    default:
      return null;
  }
}

export default Part;
