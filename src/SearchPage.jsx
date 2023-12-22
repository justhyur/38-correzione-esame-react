import { useEffect, useState } from "react"
import PersonCard from "./PersonCard";
import SearchBar from "./SearchBar";
const api_key = import.meta.env.VITE_API_KEY;

export default function(){

    const [people, setPeople] = useState([]);
    const [error, setError] = useState();

    const searchPeople = async (query) => {
        try{
            const searchParams = new URLSearchParams({api_key, query});
            const url = `https://api.themoviedb.org/3/search/person?${searchParams.toString()}`;
            const response = await fetch(url);
            if(response.status > 299){
                throw new Error(`Response has a problem. Status code: ${response.status}`);
            }
            const obj = await response.json();
            if(obj.results.length === 0){
                setError('Nessun risultato trovato.');
                return;
            }
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
            setError(`C'è un problema. Riprova più tardi.`);
        }
    }

    // useEffect(()=>{
    //     getPeople();
    // },[])

    return (<>
        <h1>Cerca un personaggio</h1>
        <SearchBar
            onSearch={value => searchPeople(value)}
        />
        {!error && people.length === 0 &&
            <div>Scrivi qualcosa e premi "Cerca"</div>
        }
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