import '../styles/banner.css';

import { useNavigate } from 'react-router-dom';

function BannerComponent() {

    const nav = useNavigate();

    const search = (event) =>{
        if(event.key === 'Enter'){
            nav('/search');
        }
    } 

    const goals =() => nav('/');
    const mounts =() => nav('/mounts');
    const minions =() => nav('/minions');
    const profile =() => nav('/profile');


    return (
        <div className="banner">
            <img src="https://ffxivcollect.com/images/mounts/large/177.png" alt="" />
            <h1>FFXIV Mounts & Minions</h1>
            <div id="buttons-group">
                <a href="" onClick={goals}>Goals</a>
                <a href="">My Collection</a>
                <a href="" onClick={mounts}>Mounts</a>
                <a href="" onClick={minions}>Minions</a>
                <a href="" onClick={profile}>Profile</a>
            </div>
            
        </div>
    )
}

export default BannerComponent;