import { useFilter } from "@/hooks/useFilter"
import { FilterType } from "@/types/filter-types"
import { styled } from "styled-components"

interface FilterItemProps {
  selected: boolean
}

const FilterList = styled.ul`
    align-items: center;
    display: flex;
    gap: 40px;
    justify-content: center;
    list-style: none;

`

const FilterItem = styled.li<FilterItemProps>`
    color: var(--text-dark);
    cursor: pointer;
    border-bottom: ${props => props.selected ? '4px solid var(--orange-low);' : ''}
    font-family: inherit;
    font-weight: ${props => props.selected ? '600' : '400'};
    font-size: 12px;
    line-height: 18px;
    text-align: center;
    text-transform: uppercase;

    @media(min-width: ${props => props.theme.desktopBreakpoint}) {
      font-size: 16px;
      line-height: 22px;
    }
    
`

export function FilterByType() {
  const { type, setType } = useFilter();

  const handleChangeType = (value: FilterType) => {
    setType(value);
  }
  return (
    <FilterList>
      <FilterItem selected={type === FilterType.ALL} onClick={() => handleChangeType(FilterType.ALL)}>Todos os produtos</FilterItem>
      <FilterItem selected={type === FilterType.SHIRT} onClick={() => handleChangeType(FilterType.SHIRT)}>Camisetas</FilterItem>
      <FilterItem selected={type === FilterType.MUG} onClick={() => handleChangeType(FilterType.MUG)}>Canecas</FilterItem>
    </FilterList>
  )
}