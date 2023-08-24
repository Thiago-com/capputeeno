"use client"

import { BackBtn } from "@/components/back-button"
import { DefaultPageLayout } from "@/components/default-page-layout"
import { ShopBagIcon } from "@/components/icons/shopping-bag-icon"
import { useProduct } from "@/hooks/useProduct"
import { formatPrice } from "@/utils/format-price"
import { styled } from "styled-components"


const Container = styled.div`
  align-items: flex-star;
  display: flex;
  flex-direction: column;
  justify-content: center;

  section {
    display: flex;
    gap: 32px;
    justify-content: center;
    margin-top: 24px;
    width: 100%;

    img {
      max-width: 640px;
      width: 50%;
    }

    > div {
      display: flex;
      justify-content: space-between;
      flex-direction: column;

      button {
        align-items: center;
        background: #115D8C;
        border: none;
        color: white;
        cursor: pointer;
        display: flex;
        font-size: 16px;
        font-weight: 500;
        gap: 8px;
        justify-content: center;
        mix-blend-mode: multiply;
        padding: 10px 0;
        border-radius: 4px;
        text-align: center;
        text-transform: uppercase;
      }
    }
  }
`

const ProductInfo = styled.div`
     
      align-items: flex-start;
      display: flex;
      flex-direction: column;
      justify-content: center;

      span {
        color: var(--text-dark-2);
        font-weight: 400;
        font-size: 14px;
        line-height: 150%;
      }

      h2 {
        color: var(--text-dark-2);
        font-weight: 400;
        font-size: 14px;
        line-height: 150%;
        margin-top: 12px;
      }

      span:nth-of-type(2){
        color: var(--shapes-dark);
        font-weight: 600;
        font-size: 20px;
        margin-bottom: 24px;
      }

      p {
        color: var(--text-dark);
        font-weight: 400;
        font-size: 12px;
      }

      div {
          margin-top: 24px;
        h3 {
          color: var(--text-dark);
          font-size: 16px;
          font-weight: 500;
          text-transform: uppercase;
        }

        p {
          font-weight: 400;
        }
      }
`

export default function Product({ searchParams }: { searchParams: { id: string } }) {
  const { data } = useProduct(searchParams.id);
  const handleAddToCart = () => {
    let cartItems = localStorage.getItem('cart-items')
    if(cartItems) {
      let cartItemsArray = JSON.parse(cartItems);

      let existingProductIndex = cartItemsArray.findIndex((item: { id: string; }) => item.id === searchParams.id);

      if(existingProductIndex != -1) {
        cartItemsArray[existingProductIndex].quantity += 1;
      } else {
        cartItemsArray.push({ ...data, quantity: 1,id: searchParams.id})
      }

      localStorage.setItem('cart-items', JSON.stringify(cartItemsArray));
    } else {
      const newCart = [{ ...data, quantity: 1,id: searchParams.id}]
      localStorage.setItem('cart-items', JSON.stringify(newCart));
    }
    
  }

  return (
    <DefaultPageLayout>
      <Container>
        <BackBtn navigate="/" />
        <section>
          <img src={data?.image_url} />
          <div>
            <ProductInfo>
              <span>{data?.category}</span>
              <h2>{data?.name}</h2>
              <span>{formatPrice(data?.price_in_cents ?? 0)}</span>
              <p>*Frete de R$40,00 para todo o Brasil. Grátis para compras acima de R$900,00.</p>
              <div>
                <h3>Descrição</h3>
                <p>{data?.description}</p>
              </div>
            </ProductInfo>
            <button onClick={handleAddToCart}>
              <ShopBagIcon/>
              Adicionar ao carrinho
            </button>
          </div>
        </section>
      </Container>
    </DefaultPageLayout>
  )
}
