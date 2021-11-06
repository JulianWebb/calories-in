import { Text, StyleSheet, View } from '@react-pdf/renderer'
import { roundMacrosPercents, Stats, StatsTree, getMacrosPercents } from 'stats'
import PdfStat from 'stats/PdfStat'
import PdfStatsLayout from 'stats/PdfStatsLayout'
import { Style } from '@react-pdf/types/style'
import { VariantForm } from 'variants'
import { Food } from 'foods'
import { getComputedColorFromChakra } from 'theme'
import PdfMealsList from 'meals/PdfMealsList'
import { useMemo } from 'react'
import { Portion } from 'portions'

type Props = {
  name?: string
  variantForm: VariantForm
  stats: Stats
  mealsFormsStatsTrees: StatsTree[]
  style?: Style
  foodsById: Record<number, Food>
  portionsById: Record<string, Portion>
  index: number
}

function PdfVariantItem({
  name,
  variantForm,
  stats,
  mealsFormsStatsTrees,
  foodsById,
  portionsById,
  style = {},
}: Props) {
  const { mealsForms } = variantForm

  const { proteinPercent, carbsPercent, fatPercent } = useMemo(
    () => roundMacrosPercents(getMacrosPercents(stats)),
    [stats]
  )

  return (
    <View style={[style]}>
      <PdfStatsLayout
        nameElement={
          <Text
            style={[
              styles.name,
              { color: getComputedColorFromChakra('teal.600') },
            ]}
          >
            {name || variantForm.name}
          </Text>
        }
        energyElement={
          <PdfStat variant="dietEnergy" label="Energy" value={stats.energy} />
        }
        proteinElement={
          <PdfStat
            variant="diet"
            label="Protein"
            value={stats.protein}
            valueDetail={`${proteinPercent}%`}
          />
        }
        carbsElement={
          <PdfStat
            variant="diet"
            label="Carbs"
            value={stats.carbs}
            valueDetail={`${carbsPercent}%`}
          />
        }
        fatElement={
          <PdfStat
            variant="diet"
            label="Fat"
            value={stats.fat}
            valueDetail={`${fatPercent}%`}
          />
        }
      />

      <PdfMealsList
        mealsForms={mealsForms}
        mealsFormsStatsTrees={mealsFormsStatsTrees}
        foodsById={foodsById}
        portionsById={portionsById}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  name: {
    fontSize: 18,

    fontWeight: 'semibold',
  },
})

export default PdfVariantItem
