import { useState, useEffect, useCallback} from "react"

//styles
import './TripList.css'

export default function TripList() {
    const [trips, setTrips] = useState([])
    const [url, setUrl] = useState('http://localhost:3000/trips')

    // useEffect(()=>{
    //     fetch(url)
    //         .then((res)=>res.json())
    //         .then((json)=>setTrips(json))
    // }, [url])

    const fetchTrips = useCallback(async () => {
        const res = await fetch(url);
        const json = await res.json();
        setTrips(json)
    }, [url])

    useEffect(()=>{
        fetchTrips()
    },[fetchTrips])
    
    console.log(trips)

  return (
    <div className="trip-list">
        <h2>Trip List</h2>
        <ul>
            {trips.map((trip)=>(
                <li key={trip.id}>
                    <h2>{trip.title}</h2>
                    <p>{trip.price}</p>
                </li>
            ))}
        </ul>
        <div className="filters">
            <button onClick={()=>setUrl('http://localhost:3000/trips?county=King')}>King County</button>
            <button onClick={()=>setUrl('http://localhost:3000/trips?county=Pierce')}>Pierce County</button>
            <button onClick={()=>setUrl('http://localhost:3000/trips')}>All County</button>
        </div>

        
    </div>
  )
}
