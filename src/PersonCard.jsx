export default ({
    id,
    name,
    occupation,
    sex,
    popularity,
    works,
    imagePath
}) => {

    return(
        <div className="person-card">
            <div className="name">{name} ({sex})</div>
            <figure>
                <img src={imagePath} alt={name}/>
            </figure>
            <ul>
                <li>Professione: {occupation}</li>
                <li>Popolarità: {popularity}</li>
            </ul>
            {works.length !== 0 && <>
                <div>Film su cui ha lavorato:</div>
                <ol>
                    {works.map( (work, i) => (
                        <li key={`work${i}`}>{work}</li>
                    ))}
                </ol>
            </>}
        </div>
    )
}