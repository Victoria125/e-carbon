export interface MaterialProduct {
  id?: string
  name: string
  category: 'material' | 'service'
  emissionFactor: number
  quantity: number
  followUpType?: string
}

export interface MaterialsTableConfig {
  examType: 'conventional' | 'pointOfCare'
  followUpType: 'none' | 'annual' | 'semiannual'
  showFinalQuantityColumn?: boolean
  showFollowUpTypeColumn?: boolean
  maxHeight?: string
  title?: string
  considerFrequencyMultiplier?: boolean
}

export interface FollowUpConfig {
  text: string
  badgeClass: string
  frequencyMultiplier: number
}
