"use client"

import { styled } from "styled-components"
import { ArrowIcon } from "./icons/arrow-icon"
import { useState } from "react";
import { useFilter } from "@/hooks/useFilter";
import { PriorityTypes } from "@/types/priority-types";

const FilterContainer = styled.div`
    align-items: center;
    display: flex;
    position: relative;

    button {
      align-items: center;
      background: transparent;
      border: none;
      color: var (--text-dark);
      cursor: pointer;
      display: flex;
      font-family: inherit;
      font-weight: 400;
      font-size: 14px;
      justify-content: center;
      line-height: 22px;

      svg {
          margin-left: 16px;
      }
    }
`

const PriorityFilter = styled.ul`
      padding: 12px 16px;
      position: absolute;
      background: #FFFFFF;
      box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      list-style:none;
      top: 100;
      width: 250px;
      z-index: 999;

      right: 8px;

      li {
        color: var(--text-dark);
        cursor: pointer;
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
      }

      li + li {
        margin-top: 4px; 
      }
`

export  function FilterByPriority() {
  const [isOpen, setIsOpen] = useState(false);
  const { setPriority} = useFilter();

  const handleOpen = () => setIsOpen(prev => !prev)

  const handleUpdatePriority = (value: PriorityTypes) => {
    setPriority(value)
    setIsOpen(false)
  }

  return (
    <FilterContainer>
        <button onClick={handleOpen} >
          Organizar por
          <ArrowIcon />
        </button>
        {isOpen && 
          <PriorityFilter>
            <li onClick={() => handleUpdatePriority(PriorityTypes.NEWS)}>Novidades</li>
            <li onClick={() => handleUpdatePriority(PriorityTypes.BIGGEST_PRICE)}>Preço: Maior - menor</li>
            <li onClick={() => handleUpdatePriority(PriorityTypes.MINOR_PRICE)}>Preço: Menor - maior</li>
            <li onClick={() => handleUpdatePriority(PriorityTypes.POPULARITY)}>Mais vendidos</li>
          </PriorityFilter>}
    </FilterContainer>
  )
}
