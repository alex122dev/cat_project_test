/* eslint-disable react-hooks/rules-of-hooks */
import { useLayoutEffect, useState } from "react"

type MatchedType = {
    [index: string]: boolean
}

const queries: string[] = [
    '(max-width: 480px)',
    '(min-width: 481px) and (max-width: 767px)',
    '(min-width: 768px) and (max-width: 1199px)',
    '(min-width: 1200px)',
]

export const useMatchMedia = (): MatchedType => {
    //* eslint-disable for this conditional
    if (typeof window === 'undefined') return {}

    const mediaQueryLists = queries.map(query => window.matchMedia(query))

    const getValues = () => mediaQueryLists.map(mql => mql.matches)

    const [values, setValues] = useState(getValues)

    useLayoutEffect(() => {
        const handler = () => setValues(getValues)

        mediaQueryLists.forEach(mql => mql.addEventListener('change', handler))

        return () => mediaQueryLists.forEach(mql => mql.removeEventListener('change', handler))
    }, [])

    return ['isSmallMobile', 'isMobile', 'isTablet', 'isDesktop'].reduce((acc, screen, index) => ({
        ...acc,
        [screen]: values[index],
    }), {})
}