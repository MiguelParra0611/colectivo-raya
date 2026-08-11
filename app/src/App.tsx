import { AppShell } from './components/layout/AppShell'
import { ShopProvider } from './state/ShopContext'

function App() {
  return (
    <ShopProvider>
      <AppShell />
    </ShopProvider>
  )
}

export default App
