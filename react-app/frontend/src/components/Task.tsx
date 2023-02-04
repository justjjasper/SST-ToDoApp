import { useState } from 'react';

interface TaskProp {
  task: string,
  completed: boolean
};

export default function Task ( {task}: {task: TaskProp} ) {
  console.log('did taks go throug', task)
  return (
    <div>
      {task.task}
    </div>
  )
}