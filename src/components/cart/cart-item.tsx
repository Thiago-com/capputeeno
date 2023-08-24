import { ProductInCart } from "@/types/product"
import { formatPrice } from "@/utils/format-price"
import { ChangeEvent } from "react"
import { styled } from "styled-components"
import { DeleteIcon } from "../icons/delete-icon"

interface CartItemProps {
    product: ProductInCart
    handleUpdateQuantity(id: string, quantity: number): void
    handleDelete(id: string): void
}

const Item = styled.li`
    align-items: center;
    background-color: white;
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    height: 210px;
    justify-content: center;
    position: relative;

    button {
        background: transparent;
        border: none;
        cursor: pointer;
        position: absolute;
        right: 24px;
        top: 16px;
    }

    img {
        border-radius: 8px 0 0 8px;
        max-height: 100%;
        width: 256px;
    }

    > div {
        align-items: flex-start;
        color: var(--text-dark-2);
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: space-between;
        line-height: 150%;
        padding: 16px 24px;
        width: 100%;


        h4 {
            font-weight: 300;
            font-size: 20px;
            
        }

        p {
            font-size: 12px;
            font-weight: 400;
            max-height: 50%;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        div {
            align-items: center;
            display: flex;
            justify-content: space-beteen;
            width: 100%;

            span {
                color: var(--shapes-dark);
                font-size: 16px;
                font-weight: 600;
            }
        }
    }
`

const SelectQuantity = styled.select`
    background-color: var(--bg-secondary);
    border: 1.5px solid var(--border-color);
    border-radius: 8px;
    color: var(--text-dark);
    font-weight: 400;
    font-size: 16px;
    padding: 8px;
`

export function CartItem({ product, handleUpdateQuantity, handleDelete }: CartItemProps) {
    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        handleUpdateQuantity(product.id, Number(e.target.value))
    }
    return (
        <Item>
            <button onClick={() => handleDelete(product.id)} aria-label="Deletar">
                <DeleteIcon/>
            </button>
            <img src={product.image_url} />
            <div>
                <h4>{product.name}</h4>
                <p>{product.description}</p>
                <div>
                    <SelectQuantity value={product.quantity} onChange={handleChange}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </SelectQuantity>
                    <span>{formatPrice(product.price_in_cents)}</span>
                </div>
            </div>
        </Item>
    )
}
