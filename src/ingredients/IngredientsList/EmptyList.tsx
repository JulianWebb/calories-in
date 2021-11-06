import { Flex, Text } from '@chakra-ui/react'
import { ResponsiveButton } from 'general'

type Props = {
  onAddIngredients: () => void
}

function EmptyList({ onAddIngredients }: Props) {
  return (
    <Flex py={2} px={3} justifyContent="space-between" alignItems="center">
      <Text fontSize="md" textColor="gray.400" fontWeight="medium">
        No foods added yet
      </Text>

      <ResponsiveButton
        colorScheme="teal"
        variant="ghost"
        onClick={onAddIngredients}
      >
        Add foods
      </ResponsiveButton>
    </Flex>
  )
}

export default EmptyList
