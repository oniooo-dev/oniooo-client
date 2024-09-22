import { useEffect } from 'react'

export default function Loader() {
    useEffect(() => {
        async function getLoader() {
            const { jellyTriangle } = await import('ldrs')
            jellyTriangle.register()
        }
        getLoader()
    }, [])
    return <l-jelly-triangle size="15" color="white"></l-jelly-triangle>
}