import { MealForm } from 'core/diets'
import useScrollTo from 'general/useScrollTo'
import { RefObject, useCallback } from 'react'

type Params = {
  getMealNameInputRefById: (id: string) => RefObject<HTMLInputElement>
  scrollTargetRef: RefObject<HTMLDivElement>
}

function useScrollToAndFocusMeal({
  getMealNameInputRefById,
  scrollTargetRef,
}: Params) {
  const scrollTo = useScrollTo()

  const onScrollToMeal = useCallback(
    async (mealForm: MealForm) => {
      const mealNameInputRef = getMealNameInputRefById(mealForm.fieldId)

      if (scrollTargetRef.current) {
        await scrollTo(scrollTargetRef.current)
      }

      if (mealNameInputRef.current) {
        mealNameInputRef.current.focus()
      }
    },
    [getMealNameInputRefById, scrollTo, scrollTargetRef]
  )

  return { onScrollToMeal }
}

export default useScrollToAndFocusMeal
