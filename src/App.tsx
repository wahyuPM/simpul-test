import './App.css'
import LayoutDefault from './layout/LayoutDefault'
import { FloatingButton } from './components/buttons'
import { InboxComponent } from './components/inbox'

function App() {
  return (
    <LayoutDefault>
      <InboxComponent />
      <FloatingButton />
    </LayoutDefault>
  )
}

export default App
