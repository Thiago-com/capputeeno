"use client"
import { styled } from "styled-components";
import { FilterByType } from "./filter-by-type";
import { FilterByPriority } from "./filter-by-priority";

interface FilterBarProps {

}

const FilterContainer = styled.div`
    align-items: start;
    display: flex;
    justify-content: space-between;
    width: 100%;
`

export function FilterBar(props : FilterBarProps) {
  return (
    <FilterContainer>
        <FilterByType/>
        <FilterByPriority />
    </FilterContainer>
  )
}
