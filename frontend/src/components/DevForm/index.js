import React from 'react';

function DevForm({onSubmit}) {

    const [username, setUsername] = React.useState('');
    const [techs, setTechs] = React.useState('');
    const [latitude, setLatitude] = React.useState(0);
    const [longitude, setLongitude] = React.useState(0);

    React.useEffect(()=> {

        navigator.geolocation.getCurrentPosition((position)=>{

        const {coords} = position;
        setLatitude(coords.latitude);
        setLongitude(coords.longitude);

        },console.log,{timeout:30000}); 

    },[]);

    function handleInputChange({target}) {

        const {name, value} = target;

        switch (name) {
            
            case 'github_username':
            setUsername(value);
            break;

            case 'techs':
            setTechs(value);
            break;

            case 'longitude':
            setLongitude(value);
            break;
            
            case 'latitude':
            setLatitude(value);
            break;
            
            default:
            break;

        }

    }
    
    async function handleFormSubmit(e) {

        e.preventDefault();
        await onSubmit({github_username:username, techs, latitude, longitude});
        setUsername('');
        setTechs('');
    
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <div className="input-block">
            <label htmlFor="github_username">Usuário do Github</label>
            <input name="github_username" id="github_username" required value={username} onChange={handleInputChange}/>
            </div>
            <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input name="techs" id="techs" required value={techs} onChange={handleInputChange}/>
            </div>
            <div className="input-group">
            <div className="input-block">
                <label htmlFor="latitude">Latitude</label>
                <input name="latitude" id="latitude" required value={latitude} onChange={handleInputChange}/>
            </div>
            <div className="input-block">
                <label htmlFor="logitude">Longitude</label>
                <input name="longitude" id="longitude" required value={longitude} onChange={handleInputChange}/>
            </div>
            </div>
            <button type="submit">Salvar</button>
        </form>
    );
}

export default DevForm;