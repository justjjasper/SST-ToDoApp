import React, { useState, useEffect } from 'react';
import './App.css';
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '../../services/functions/lambda';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import Form from './components/Form'
import Tasks from './components/Tasks'

export const trpc = createTRPCReact<AppRouter>();

function AppContent() {

  const [tasks, setTasks] = useState<{task:string, completed: boolean}[]>([])
  const getTask = trpc.getTasks.useQuery().data;

  useEffect(()=> {
    if (getTask) setTasks(getTask)
    console.log('it is working')
  }, [getTask])

  const addTaskFunc = (task: string): void => {
    let present = false;
    tasks.forEach(each => {
      if (each.task === task) present = true
    })
    if (!present) {
      setTasks([...tasks, {task, completed: false}])
    }
  };

  const delTaskFunc = (task: string): void => {
    const newTasks = tasks.filter(each => each.task !== task)

    setTasks(newTasks)
  }

  return (
    <div className="App">
      <h4> To Do App </h4>
      <Form
      addTaskFunc={addTaskFunc}
      />
      {getTask &&
      <Tasks
      tasks={tasks}
      delTaskFunc={delTaskFunc}
      />}
    </div>
  );
}

const App = () => {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${process.env.REACT_APP_API_URL}/trpc`,
          // fetch(url, options) {
          //   return fetch(url, {
          //     ...options,
          //     credentials: 'include'
          //   })
          // }
        })
      ]
    })
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <AppContent/>
      </QueryClientProvider>
    </trpc.Provider>
  )
}

export default App;
