import { formatPrice } from "@/utils/format-price"
import { useRouter } from "next/navigation"
import { styled } from "styled-components"
import { Divider } from "./divider"

interface ProductCardProps {
    image: string,
    title: string,
    price: number,
    id: string
}

const Card = styled.div`
    align-items: center;
    background: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(10px);
    border-radius: 0px 0px 4px 4px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 256px;

    img {
        width: 256px;
        height: 300px;
    }

    h3 {
        color: var(--text-dark-2);
        font-weight: 300;
        font-size: 16px;
        line-height: 150%;
    }

    p {
        color: var(--shapes-dark);
        font-weight: 600;
        font-size: 14px;
        line-height: 150%;
    }

    div {
        align-items:start;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 8px 12px;
        width: 100%;
    }
   
`

export function ProductCard(props: ProductCardProps) {
    const router = useRouter();
    const price = formatPrice(props.price)

    const handleNavigate = () => {
        router.push("/product?id=" + props.id)
    }

    return (
        <Card onClick={handleNavigate}>
            <img src={props.image} />
            <div>
                <h3>{props.title}</h3>
                <Divider />
                <p>{price}</p>
            </div>
        </Card>
    )
}
