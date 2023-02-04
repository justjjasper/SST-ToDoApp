import { useState } from 'react';
import Task from './Task';

interface TaskProp {
  task: string,
  completed: boolean
};

interface Props {
  tasks: TaskProp[]
};

export default function Tasks ( {tasks}: Props ) {

  return (
    <div>
      {tasks.map( (each, i) => (
        <Task task={each}/>
      ))}
    </div>
  )
}