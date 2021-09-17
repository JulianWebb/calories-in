import {
  createContext,
  ReactElement,
  ReactNode,
  RefObject,
  useRef,
} from 'react'
import { Box } from '@chakra-ui/react'
import useHasSideNavigation from './useHasSideNavigation'

export type MainLayoutProps = {
  sidebarElement?: ReactElement
  children: ReactNode
}

const ContentBoxRefContext = createContext<RefObject<HTMLDivElement | null>>({
  current: null,
})

function MainLayout({ children }: MainLayoutProps) {
  const hasSideNavigation = useHasSideNavigation()
  const contentBoxRef = useRef<HTMLDivElement>(null)

  return (
    <Box>
      {hasSideNavigation && (
        <Box
          top="0"
          height="100vh"
          position="fixed"
          width="200px"
          bg="teal.600"
        />
      )}

      <ContentBoxRefContext.Provider value={contentBoxRef}>
        <Box ref={contentBoxRef} px={3} ml={hasSideNavigation ? '200px' : 0}>
          {children}
        </Box>
      </ContentBoxRefContext.Provider>
    </Box>
  )
}

export { ContentBoxRefContext }

export default MainLayout
