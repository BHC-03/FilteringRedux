import React , {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter , faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import FilterMenu from "../filterMenu/FilterMenu";

import './styling/Filtering.css';


const Filtering:React.FC = ()=>{
    const [showMenu , setShowMenu] = useState<boolean>(false);
    
    return (
        <div className="Container">
        <div className="filteringContainer">
            <div className="InputContainer">
                <input type="text" className="textInput" />
                <button className="buttonF searchButton"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
            </div>
            <button onClick={()=>{ setShowMenu(!showMenu)}} className="buttonF filteringButton"><FontAwesomeIcon icon={faFilter} /><span>filter</span></button>
            {showMenu ?  <FilterMenu /> : ''}
        </div>
        </div>
    )
}

export default Filtering;
