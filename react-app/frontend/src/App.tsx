import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '../../services/functions/lambda';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';


export const trpc = createTRPCReact<AppRouter>();

function AppContent() {

  const [task, setTask] = useState<any>([]);

  const getTask = trpc.getTasks.useQuery("GO RUN BOI")

  console.log('what is a task', getTask.data)

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL as string)
    .then((response) => setTask(response.data))
  },[])

  return (
    <div className="App">
      {task.map( (each: { task: string }) => {
        return (
          <div>{each.task} </div>
        )
      })}
    </div>
  );
}

const App = () => {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${process.env.REACT_APP_API_URL}/trpc`
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
