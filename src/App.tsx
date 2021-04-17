import { ChakraProvider } from '@chakra-ui/react'
import MainLayout from 'components/layout/MainLayout'
import DietEditor from 'components/DietEditor'
import { DragAndDropRespondersProvider } from 'core/dndResponders'
import { DietStatsProvider } from 'core/stats'
import Sidebar from 'components/Sidebar'
import { FoodsListProvider } from 'core/foods'
import builInFoods from 'core/foods/builtIn.json'

function App() {
  return (
    <ChakraProvider>
      <DragAndDropRespondersProvider>
        <FoodsListProvider initialFoods={builInFoods}>
          <DietStatsProvider>
            <MainLayout sidebarElement={<Sidebar />}>
              <DietEditor />
            </MainLayout>
          </DietStatsProvider>
        </FoodsListProvider>
      </DragAndDropRespondersProvider>
    </ChakraProvider>
  )
}

export default App
