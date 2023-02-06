import { useRef } from 'react';
import { trpc } from '../App'

export default function Form ({ addTaskFunc = (task:string) => {}} ) {

  const formRef = useRef<HTMLInputElement | null>(null)
  const addTask = trpc.addTask.useMutation()

  const handleClick = () => {
    if (formRef.current?.value) {
      addTask.mutate(formRef.current.value)
      addTaskFunc(formRef.current.value)
      formRef.current.value = ''
    }
  }

  return (
    <div>
      <input
        ref = {formRef}
        type= 'text'/>
      <button
        onClick = {handleClick}>
        Add
      </button>
    </div>
  )
}