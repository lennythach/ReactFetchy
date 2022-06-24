import { useState} from "react"
import { useFetch } from "../hooks/useFetch";

//styles
import './TripList.css'

export default function TripList() {
    const [url, setUrl] = useState('http://localhost:3000/trips');
    const { data:trips, isPending, error } = useFetch(url,{name:"Lenny"})

  return (
    <div className="trip-list">
        <h2>Trip List</h2>
        {isPending && (<div><p>Loading Data......</p></div>)}
        {error && (<div>{error}</div>)}
        <ul>
            {trips && trips.map((trip)=>(
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
