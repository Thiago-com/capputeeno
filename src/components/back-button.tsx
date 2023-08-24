import { styled } from "styled-components";
import { BackIcon } from "./icons/back-icon";
import { useRouter } from "next/navigation";


const Button = styled.button`
  align-items: center;
  background: transparent;
  border: none;
  color: var(--secondary-text);
  cursor: pointer;
  display: flex;
  font-weight: 500;
  font-size: 14px;
  line-height: 150%;
  gap: 8px;
  justify-content: center;
`

interface BtnProps {
    navigate: string;
}

export function BackBtn({ navigate }: BtnProps) {
    const router = useRouter();

    const handleNavigate = () => {
        router.push(navigate)
    }
    return (
        <Button onClick={handleNavigate}>
          <BackIcon />
          Voltar
        </Button>
    )
}
