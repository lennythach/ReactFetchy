import {useState, useEffect, useRef} from "react";

export const useFetch = (url,_name) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)

    const name = useRef(_name).current;

    useEffect(()=>{
        const controller = new AbortController()
        console.log(name)
        const fetchData = async () => {
            setIsPending(true)

            try {
                // second arguement associates our abort controller with the fetch request
                const res = await fetch(url, {signal:controller.signal});
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                const json = await res.json();
                setIsPending(false)
                setData(json);
                setError(null)
            } catch(err) {
                if (err.name === "AbortError") {
                    console.log("Fetch has been Aborted!")
                } else {
                    setIsPending(false)
                    setError("Could not fetch Data!")
                    
                }

            }

        }
        fetchData();

        // This return Abort Controller only runs when associated with a fetch request
        return () => {
            controller.abort()
        }
        
    }, [url, name])

    return { data, isPending, error }
}
