import React, { useState } from 'react';
import './App.css';
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '../../services/functions/lambda';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import Form from './components/Form'
import Tasks from './components/Tasks'

export const trpc = createTRPCReact<AppRouter>();

function AppContent() {

  const getTask = trpc.getTasks.useQuery().data;

  return (
    <div className="App">
      <h4> To Do App </h4>
      <Form/>
      {getTask && <Tasks tasks={getTask}/>}
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
