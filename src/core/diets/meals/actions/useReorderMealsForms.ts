import { MealsFieldArray } from '../useMealsFieldArray'
import { useDragAndDropResponder } from 'general/dndResponders'
import { useUndoRedoMethods } from 'general/undoRedo'
import { DropResult } from 'react-beautiful-dnd'

type Params = {
  mealsFieldArray: MealsFieldArray
}

function useReorderMealsForms({ mealsFieldArray }: Params) {
  const { saveLastChange } = useUndoRedoMethods()

  useDragAndDropResponder('onDragEnd', (result: DropResult) => {
    const { source, destination, type } = result

    if (!destination || type !== 'mealsList') {
      return
    }

    mealsFieldArray.moveMealForm(source.index, destination.index)

    saveLastChange()
  })
}

export default useReorderMealsForms
