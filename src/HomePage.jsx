import { useEffect, useState } from "react"
import PersonCard from "./PersonCard";
const api_key = import.meta.env.VITE_API_KEY;

export default function(){

    const [people, setPeople] = useState([]);
    const [error, setErrror] = useState();

    const getPeople = async () => {
        try{
            const url = `https://api.themoviedb.org/3/trending/person/day?api_key=${api_key}`;
            const response = await fetch(url);
            if(response.status > 299){
                throw new Error(`Response has a problem. Status code: ${response.status}`);
            }
            const obj = await response.json();
            const peopleArray = obj.results.map(p => {
                const person = {
                    id: p.id,
                    name: p.name,
                    occupation: p.known_for_department,
                    popularity: p.popularity,
                    works: p.known_for.map(w => w.title),
                    imagePath: `https://image.tmdb.org/t/p/w500${p.profile_path}`
                };
                switch(p.gender){
                    case 0:
                        person.sex = 'Boh';
                        break;
                    case 1:
                        person.sex = 'Femmina';
                        break;
                    case 2:
                        person.sex = 'Maschio';
                        break;
                    case 3:
                        person.sex = 'Non Binario';
                }
                return person;
            });
            setPeople(peopleArray);
        }catch(error){
            console.error(error);
            setErrror(`C'è un problema. Riprova più tardi.`);
        }
    }

    useEffect(()=>{
        getPeople();
    },[])

    return (<>
        <h1>Persone del cinema influenti di oggi</h1>
        {error && <div>{error}</div>}
        {!error && people.length !== 0 &&
            <div className="people-list">
                {people.map(person => (
                    <PersonCard
                        key={person.id}
                        {...person}
                    />
                ))}
            </div>
        }
    </>)
}