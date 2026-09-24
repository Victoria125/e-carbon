import type { ElementPropsWithElementRef } from 'react-scrollbars-custom/dist/types/types'
import type { MaterialProduct, MaterialsTableConfig } from '@/types/materialsTable'
import { useMemo } from 'react'
import { Scrollbar } from 'react-scrollbars-custom'
import { getFollowUpConfig, getProductName } from '@/constants/healthcareData'
import useLanguage from '@/hooks/useLanguage'
import {
  calculateFinalQuantity,
  calculateProductEmissions,
  consolidateProducts
} from '@/utils/materialsTableHelpers'

type ScrollbarElementProps = ElementPropsWithElementRef<HTMLDivElement>

interface ProductsTableProps {
  products: MaterialProduct[]
  config: MaterialsTableConfig
}

/**
 * Componente reutilizável de tabela de produtos/materiais
 * Usado tanto na jornada individual quanto na jornada coletiva
 *
 * Features:
 * - Consolida produtos (agrupa por nome+categoria, soma quantidades)
 * - Ordena por quantidade (decrescente)
 * - Calcula emissões considerando frequência de acompanhamento
 * - Scrollbar customizado
 * - Badges coloridos de follow-up
 */
export function ProductsTable({ products, config }: Readonly<ProductsTableProps>) {
  const {
    followUpType,
    showFinalQuantityColumn = false,
    title,
    showFollowUpTypeColumn = true,
    considerFrequencyMultiplier = true
  } = config
  const { t, language } = useLanguage()

  // Obter configuração de follow-up traduzida
  const followUpConfig = useMemo(() => getFollowUpConfig(language), [language])

  // Consolidar e ordenar produtos
  const consolidatedProducts = consolidateProducts(products)

  // Verificar se algum produto tem emissões >= 1 kg para determinar a unidade
  const hasKgEmissions = consolidatedProducts.some((product) => {
    const finalEmissions = calculateProductEmissions(product, followUpType)
    return finalEmissions >= 1
  })

  // Definir unidade e fator de conversão
  const emissionUnit = hasKgEmissions ? 'kg CO₂e' : 'g CO₂e'
  const emissionMultiplier = hasKgEmissions ? 1 : 1000

  // Renderizar scrollbar thumb (vertical)
  const renderThumbY = (props: ScrollbarElementProps) => {
    const { elementRef, ...restProps } = props
    return (
      <div
        {...restProps}
        ref={elementRef}
        style={{
          ...restProps.style,
          width: '35px',
          height: '35px',
          minWidth: '35px',
          minHeight: '35px',
          maxWidth: '35px',
          maxHeight: '35px',
          backgroundImage: 'url(ui/thumb2.svg)',
          backgroundSize: '35px 35px',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          border: '0.5px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '50%',
          overflow: 'visible',
          display: 'flex',
          opacity: '0.8',
          justifyContent: 'center',
          position: 'relative',
          left: '-13.5px',
          zIndex: 10
        }} />
    )
  }

  // Renderizar scrollbar track (vertical)
  const renderTrackY = (props: ScrollbarElementProps) => {
    const { elementRef, ...restProps } = props
    return (
      <div
        {...restProps}
        ref={elementRef}
        style={{
          ...restProps.style,
          width: '10px',
          borderRadius: '100px',
          height: '99.5%',
          marginTop: '-11.5px',
          marginRight: '-25px',
          overflow: 'visible',
          backgroundColor: 'rgba(0, 0, 0, 0.15)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }} />
    )
  }

  return (
    <div className="py-6 pl-6 pr-0 w-full h-full overflow-y-hidden">
      {/* Tabela com Scrollbar */}
      <div className="overflow-x-hidden overflow-y-hidden pt-2 pr-10 w-full h-full">
        <Scrollbar
          thumbYProps={{ renderer: renderThumbY }}
          trackYProps={{ renderer: renderTrackY }}
          minimalThumbYSize={35}
          maximalThumbYSize={35}
          disableTrackYWidthCompensation={true}>
          {/* Título */}
          <div className="flex items-center justify-center bg-black/30">
            <h3 className="text-xs font-light text-white uppercase p-1">
              {title}
            </h3>
          </div>

          <table className="w-full">
            <thead className="border-b-1 border-white">
              <tr>
                <th className="text-xs w-[40%] pb-1 font-light text-left uppercase text-white">
                  {t('table.product')}
                </th>
                {/*
                <th className="text-[9px] w-[10%] pb-1 font-light text-right uppercase text-white">
                  Categoria
                </th>
                */}
                {showFollowUpTypeColumn && (
                  <th className="text-[10px] w-[25%] pb-1 font-light text-center uppercase text-white">
                    {t('table.followUp')}
                  </th>
                )}
                {followUpType !== 'none' && (
                  <th className="text-[10px] w-[20%] pb-1 font-light text-center uppercase text-white">
                    {t('table.quantity')}
                  </th>
                )}
                <th className="text-[10px] pb-1 font-light text-center text-white">
                  <span className="uppercase">
                    {t('table.total')}
                  </span>
                  <span>
                    <br />
                    {emissionUnit}
                  </span>
                </th>
                {showFinalQuantityColumn && (
                  <th className="text-[10px] pb-1 font-light text-right text-white">
                    Final
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {consolidatedProducts.map((product) => {
                const finalQuantity = calculateFinalQuantity(product.quantity, followUpType)
                const finalEmissions = calculateProductEmissions(product, followUpType)
                const productFollowUpType = product.followUpType || followUpType

                return (
                  <tr
                    key={`${product.name}-${product.category}-${product.emissionFactor}`}
                    className="hover:bg-white/5">
                    <td className="py-3 text-xs font-light text-white text-left">
                      {getProductName(product.name, language)}
                    </td>
                    {/*
                    <td className="py-3 text-right text-xs font-light text-white">
                      {product.category === 'material' ? t('category.material') : t('category.service')}
                    </td>
                    */}
                    {showFollowUpTypeColumn && (
                      <td className="py-3 text-center text-xs font-light text-white">
                        <span
                          className={`
                          px-1.5 py-1 rounded-full text-[11px] font-light
                          ${followUpConfig[productFollowUpType]?.badgeClass || 'bg-gray-500'}
                        `}>
                          {followUpConfig[productFollowUpType]?.text || productFollowUpType}
                          {(followUpType !== 'none'
                            && (
                              <span className="opacity-50 text-[9px]">
                                {` x${followUpConfig[productFollowUpType].frequencyMultiplier}`}
                              </span>
                            ))}
                        </span>
                      </td>
                    )}
                    {followUpType !== 'none' && (
                      <td className="py-3 text-center text-xs text-white">
                        {
                          considerFrequencyMultiplier
                            ? followUpConfig[productFollowUpType].frequencyMultiplier * product.quantity
                            : product.quantity
                        }
                        {` ${product.category === 'material' ? 'und' : ''}`}
                      </td>
                    )}
                    <td className="py-3 text-xs font-bold text-[#C8FF3C] text-center">
                      {(emissionMultiplier * finalEmissions).toFixed(3)}
                    </td>
                    {showFinalQuantityColumn && (
                      <td
                        className="py-3 text-[10px] text-white text-right"
                        title={`${product.quantity} (und.) x ${followUpConfig[productFollowUpType]?.frequencyMultiplier} (${productFollowUpType}) = ${finalQuantity} (und.) x ${product.emissionFactor} (emissão) = ${finalEmissions.toFixed(2)}`}>
                        Hover
                      </td>
                    )}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </Scrollbar>
      </div>
    </div>
  )
}
