"use client"

import { styled } from "styled-components"

export const DefaultPageLayout = styled.div`
    background-color: var(--bg-primary);
    min-height: 100vh;
    padding: 12x 24px;

    @media(min-width: ${props => props.theme.desktopBreakpoint}) {
        padding: 34px 160px;
    }
`