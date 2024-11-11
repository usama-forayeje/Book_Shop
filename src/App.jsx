import Layout from "./components/layout/Layout"
import { StoreProvider } from "./context/StoreContext"

function App() {
  return (
    <>
    <StoreProvider>
       <Layout/>
    </StoreProvider>
   
    </>
  )
}

export default App