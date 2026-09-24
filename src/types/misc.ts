import type { ElementPropsWithElementRef } from 'react-scrollbars-custom/dist/types/types'

export interface WidthContextType {
  referenceWidth: number
  setReferenceWidth: (width: number) => void
}

export type ScrollbarElementProps = ElementPropsWithElementRef<HTMLDivElement>
