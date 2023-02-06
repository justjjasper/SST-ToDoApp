import { trpc } from '../App'
import axios from 'axios';

interface TaskProp {
  task: string;
  completed: boolean
};

interface TotalProp {
  task: TaskProp,
  delTaskFunc: (task: string) => void
}

export default function Task( {task, delTaskFunc} : TotalProp) {
  const delTask = trpc.delTask.useMutation()
  const updateTask = trpc.updateTask.useMutation();

  const handleDelete = () => {
    delTask.mutate(task.task)
    // axios.delete(`${process.env.REACT_APP_API_URL}/${task.task}` as string)
    delTaskFunc(task.task)
  }

  const handleChange = () => {
    task.completed = !task.completed
    updateTask.mutate(task)
  }

  return (
    <div
      style = {task.completed ? {textDecorationLine:'line-through'} : {}}
     >
      <input
      type="checkbox"
      onChange = {handleChange}
      checked = {task.completed}
      />
      {task.task}
      <button
      onClick={handleDelete}>
        Delete
      </button>
    </div>
  )
}