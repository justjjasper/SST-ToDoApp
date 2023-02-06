import Task from './Task';

interface TaskProp {
  task: string;
  completed: boolean
};

interface Props {
  tasks: TaskProp[],
  delTaskFunc: (task: string) => void
};

export default function Tasks ( {tasks, delTaskFunc}: Props) {
  return (
    <div>
      {tasks.map( (each, i) => (
        <Task key={i} task={each} delTaskFunc={delTaskFunc}/>
      ))}
    </div>
  )
}