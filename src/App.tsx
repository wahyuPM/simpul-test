import './App.css'
import LayoutDefault from './layout/LayoutDefault'
import { FloatingButton } from './components/buttons'
import { InboxComponent } from './components/inbox'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/react-query'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LayoutDefault>
        <InboxComponent />
        <FloatingButton />
      </LayoutDefault>
    </QueryClientProvider>
  )
}

export default App
