import { Flex, Text, FormControl, FormLabel, Link } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { Food, FoodForm } from 'foods'
import { useFormContext } from 'react-hook-form'

type Props = {
  canEdit: boolean
  food?: Food
}

function UrlField({ canEdit, food }: Props) {
  const { register } = useFormContext<FoodForm>()

  return (
    <Flex
      minHeight={canEdit ? '200px' : undefined}
      flexDirection="column"
      alignItems="center"
    >
      <Text fontSize="md" mb={6} color="gray.600">
        Links allow you to show a specific web page for a food. They work both
        on the web editor and in the exported pdf files.
      </Text>

      <FormControl id="email">
        <Flex justifyContent="center" alignItems="center">
          <FormLabel mb={0} flexShrink={0}>
            Link:
          </FormLabel>
          {canEdit ? (
            <Input
              {...register('url')}
              placeholder="http://example.com"
              type="email"
              maxWidth="250px"
            />
          ) : (
            <Link
              href={food?.url}
              target="_blank"
              maxWidth="250px"
              noOfLines={1}
              color="teal.500"
            >
              {food?.url}
            </Link>
          )}
        </Flex>
      </FormControl>
    </Flex>
  )
}

export default UrlField
