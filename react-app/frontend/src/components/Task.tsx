import { useState } from 'react';

interface TaskProp {
  task: string,
  completed: boolean
};

export default function Task ( {task}: {task: TaskProp} ) {

  return (
    <div>
      {task.task}
    </div>
  )
}