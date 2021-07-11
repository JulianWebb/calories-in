import Fuse from 'fuse.js'
import { useMemo } from 'react'
import { Food } from 'core/types'

const OPTIONS = { keys: ['name'] }

type FoodsFilter = {
  categoryId?: number
  onlyFoodsAddedbyUser?: boolean
  query: string
}

function groupFoodsByCategoryId(foods: Food[]) {
  const foodsByCategoryIdMap: Record<number, Food[]> = {}

  for (const food of foods) {
    const { categoryId } = food

    if (!foodsByCategoryIdMap[categoryId]) {
      foodsByCategoryIdMap[categoryId] = []
    }

    foodsByCategoryIdMap[categoryId].push(food)
  }

  return foodsByCategoryIdMap
}

function useFilterFoods(
  allFoods: Food[],
  userFoods: Food[],
  filter: FoodsFilter
) {
  const foodsToFilter = filter.onlyFoodsAddedbyUser ? userFoods : allFoods

  const fuse = useMemo(() => new Fuse(foodsToFilter, OPTIONS), [foodsToFilter])
  const foodsByCategoryId = useMemo(
    () => groupFoodsByCategoryId(foodsToFilter),
    [foodsToFilter]
  )

  const { query, categoryId } = filter
  if (!query) {
    return categoryId ? foodsByCategoryId[categoryId] || [] : foodsToFilter
  }

  const foodsForQuery = fuse.search(query, { limit: 5 }).map(({ item }) => item)
  if (!categoryId) {
    return foodsForQuery
  }

  return foodsForQuery.filter(food => food.categoryId === categoryId)
}

export type { FoodsFilter }

export default useFilterFoods
