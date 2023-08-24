"use client"

import { BackBtn } from "@/components/back-button";
import { CartItem } from "@/components/cart/cart-item";
import { DefaultPageLayout } from "@/components/default-page-layout";
import { Divider } from "@/components/divider";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { ProductInCart } from "@/types/product";
import { formatPrice } from "@/utils/format-price";
import { styled } from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;
    justify-content: center;

    @media(min-width: ${props => props.theme.desktopBreakpoint}) {
        flex-direction: row;
    }
`

const CartListContainer = styled.div`

    h3 {
        color: var(--text-dark-2);
        font-size: 24px;
        font-weight: 500;
        line-height: 150%;
        margin-top: 24px;
        text-transform: uppercase;
    }

    p {
        color: var (--text-dark-2);
        font-weight: 300;
        font-size: 16px;
        line-height: 150%;

        span {
            font-weight: 600;
        }
    }
`

const CartList = styled.ul`
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 16px;
    justify-content: center;
    margin-top: 24px;
`
const CartResultContainer = styled.div`
    align-items: flex-start;
    background: white;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: flex-start;
    min-width: 352px;
    padding: 16px 24px;

    h3 {
        color: var(--text-dark-2);
        font-weight: 600;
        font-size: 20px;
        margin-bottom: 30px;
        text-transform: uppercase;
    }
`

const TotalItem = styled.div<{ isBold: boolean}>`
    align-items: center;
    display: flex;
    font-weight: ${props => props.isBold ? '600' : '400'};
    font-size: 16px;
    line-height: 150%;
    justify-content: space-between;
    margin-bottom: 12px;
    width: 100%;
`

const ShopBtn = styled.button`
    background: var(--success-color);
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    margin-top: 40px;
    padding: 12px;
    text-transform: uppercase;
    width: 100%;
`

export default function CartPage() {
    const { value, updateLocalStorage } = useLocalStorage<ProductInCart[]>("cart-items", [])

    const calculateTotal = (value: ProductInCart[]) => {
        return value.reduce((sum, item) => sum += (item.price_in_cents * item.quantity), 0)
    }

    const cartTotal = formatPrice(calculateTotal(value));
    const deliveryFee = 4000;
    const cartTotalWithDelivery = formatPrice(calculateTotal(value) + deliveryFee);

    const handleUpdateQuantity = (id: string, quantity: number) => {
        const newValue = value.map(item => {
            if (item.id !== id) return item
            return { ...item, quantity: quantity }
        })

        updateLocalStorage(newValue)
    }

    const handleDeleteItem = (id: string) => {
        const newValue = value.filter(item => {
            if (item.id !== id) return item
        })
        updateLocalStorage(newValue)
    }

    return (
        <DefaultPageLayout>
            <Container>
                <CartListContainer>
                <BackBtn navigate="/" />
                    <h3>Seu carrinho</h3>
                    <p>
                        Total ({value.length} produtos)
                        <span>{cartTotal}</span>
                    </p>
                    <CartList>
                        {value.map(item =>
                            <CartItem
                                product={item}
                                key={item.id}
                                handleDelete={handleDeleteItem}
                                handleUpdateQuantity={handleUpdateQuantity}
                                />)

                        }
                    </CartList>
                </CartListContainer>
                <CartResultContainer>
                        <h3>Resumo do pedido</h3>
                        <TotalItem isBold={false}>
                            <p>Subtotal de produtos</p>
                            <p>{cartTotal}</p>
                        </TotalItem>
                        <TotalItem isBold={false}>
                            <p>Entrega</p>
                            <p>{formatPrice(deliveryFee)}</p>
                        </TotalItem>
                        <Divider/>
                        <TotalItem isBold>
                            <p>Total</p>
                            <p>{cartTotalWithDelivery}</p>
                        </TotalItem>
                        <ShopBtn>Finalizar compra</ShopBtn>
                </CartResultContainer>
            </Container>
        </DefaultPageLayout>
    )
}
