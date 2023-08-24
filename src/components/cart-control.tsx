import { useLocalStorage } from "@/hooks/useLocalStorage";
import { CartIcon } from "./icons/cart-icon";
import { styled } from "styled-components";
import { useRouter } from "next/navigation";

const CartCount = styled.span`
    background-color: var(--delete-color);
    border-radius: 100%;
    color: white;
    font-size:10px;
    margin-left: -10px;
    height: 17px;
    padding: 0 5px;
    top: 43px;
    width: 17px;
`

const Container = styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
    position: relative;
`

export function CartControl() {
    const router = useRouter()
    const { value } = useLocalStorage('cart-items', [])

    const handleNavigateToCart = () => {
        router.push("/cart")
    }

    return (
        <div>
            <Container onClick={handleNavigateToCart}>
            <CartIcon />
            {value.length > 0 && <CartCount>{value.length}</CartCount>}
            </Container>
        </div>
    )
}