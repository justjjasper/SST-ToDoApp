import React, { useState } from 'react';
import './App.css';
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '../../services/functions/lambda';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';


export const trpc = createTRPCReact<AppRouter>();

function AppContent() {

  const getTask = trpc.getTasks.useQuery().data

  return (
    <div className="App">
      {getTask?.map((each, i) => {
        return (
          <div key={i}>
            {each.task}
          </div>
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
function each(each: any, arg1: (i: any) => JSX.Element): React.ReactNode {
  throw new Error('Function not implemented.');
}

