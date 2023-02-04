import { useState } from 'react';

interface TaskProp {
  task: string;
  completed: boolean
};

interface TotalProp {
  task: TaskProp,
  delTaskFunc: (task: string) => void
}

export default function Task( {task, delTaskFunc} : TotalProp) {

  const handleDelete = () => {
    delTaskFunc(task.task)
  }

  return (
    <div>
      {task.task}
      <button
      onClick={handleDelete}>
        Delete
      </button>
    </div>
  )
}