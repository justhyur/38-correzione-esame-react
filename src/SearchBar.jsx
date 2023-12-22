import { useState } from "react"

export default function({onSearch}){

    const [inputValue, setInputValue] = useState('');

    return(
        <div className="search-bar">
            <input
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                    if(e.key === 'Enter'){
                        onSearch(inputValue);
                        setInputValue('');
                    }
                }}
            />
            <button onClick={()=>{
                onSearch(inputValue);
                setInputValue('');
            }}>Cerca</button>
        </div>
    )
}