"use client"

import { ProductsList } from '@/components/products-list'
import { FilterBar } from '@/components/filter-bar'
import { styled } from 'styled-components'
import { DefaultPageLayout } from '@/components/default-page-layout'

const PageWrapper = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
   
`

export default function Home() {
  return (
    <DefaultPageLayout>
      <PageWrapper>
        <FilterBar />
        <ProductsList />
      </PageWrapper>
    </DefaultPageLayout>


  )
}
