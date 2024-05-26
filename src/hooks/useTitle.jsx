import { useEffect } from "react"

const useTitle = (title) => {
    useEffect(() => {
        document.title = `${title} - Simply Recipes`
    }, [title]);
}

const useTitleHome = () => {
    useEffect(() => {
        document.title = `Simply Recipes`
    });
}

export default useTitle;
export { useTitleHome };