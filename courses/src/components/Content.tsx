interface Part {
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  parts: Part[];
}

const Content = (props: ContentProps) => {

  return (
    <div>
      {props.parts.map(part =>
        <p>
          {part.name} {part.exerciseCount}
        </p>
      )}
    </div>
  )
}

export default Content;
