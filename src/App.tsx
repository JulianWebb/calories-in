import { ChakraProvider } from '@chakra-ui/react'
import MainLayout from 'components/layout/MainLayout'
import DietEditor from 'components/DietEditor'
import { DndRespondersStoreProvider, DndProvider } from 'general/dndResponders'
import builInFoods from 'core/foods/builtIn.json'
import 'focus-visible/dist/focus-visible'
import theme from 'components/theme'
import smoothscroll from 'smoothscroll-polyfill'
import { OneTimeCheckProvider } from 'general/oneTimeCheck'
import ScreenSizeProvider from 'components/general/ScreenSizeProvider'
import { FoodsByIdProvider } from 'core/foods'

smoothscroll.polyfill()

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ScreenSizeProvider>
        <DndRespondersStoreProvider>
          <DndProvider>
            <FoodsByIdProvider initialFoods={builInFoods}>
              <OneTimeCheckProvider>
                <MainLayout>
                  <DietEditor />
                </MainLayout>
              </OneTimeCheckProvider>
            </FoodsByIdProvider>
          </DndProvider>
        </DndRespondersStoreProvider>
      </ScreenSizeProvider>
    </ChakraProvider>
  )
}

export default App
