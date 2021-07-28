import { Input, HStack, chakra, VStack, Text } from '@chakra-ui/react'
import { useDietForm, useDietFormActions } from 'core/diets'
import { ChangeEvent } from 'react'
import { ArrowUpCircle, ArrowDownCircle, AlertCircle } from 'react-feather'

const ArrowUpCircleStyled = chakra(ArrowUpCircle)
const ArrowDownCircleStyled = chakra(ArrowDownCircle)
const AlertCircleStyled = chakra(AlertCircle)

type Props = {
  diff: number
}

function Name({ diff }: Props) {
  const dietForm = useDietForm()
  const dietFormActions = useDietFormActions()

  function onNameChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target
    dietFormActions.updateDietForm({ name: value })
  }

  return (
    <VStack height="100%" alignItems="flex-start" spacing={1}>
      <Input
        placeholder="Meal plan name"
        size="md"
        fontSize="md"
        autoComplete="off"
        onChange={onNameChange}
        bg="white"
        value={dietForm.name}
      />

      <HStack display={{ base: 'none', md: 'flex' }} width="100%" spacing={4}>
        <HStack spacing={1}>
          <AlertCircleStyled color="gray.400" size="16px" />
          <Text fontSize="xs" textColor="gray.400">
            Unsaved changes
          </Text>
        </HStack>

        {diff !== 0 && (
          <HStack spacing={1}>
            {diff < 0 && <ArrowDownCircleStyled color="gray.400" size="16px" />}
            {diff > 0 && <ArrowUpCircleStyled color="gray.400" size="16px" />}

            <Text fontSize="xs" textColor="gray.400">
              {diff}kcal
            </Text>
          </HStack>
        )}
      </HStack>
    </VStack>
  )
}

export default Name
