import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import React , {useState,useEffect} from 'react';
import { useAppDispatch } from "../../Redux/store";
import { AddMovies , addFilters , clearMovies } from '../../Redux/slices/filteredMovies';
import './styling/FilterMenu.css';




const FilterMenu:React.FC = ()=>{
    const renderYearOptions  = ()=>{
        const newArray:number[] = []
        for(let i =1950 ;i<2023;i++){
            newArray.push(i);
        }
        return newArray.map(year=>{
            return (
                <option value={year} key={year}>
                    {year}
                </option>
            )
        })
    }
    const renderMaxYearOptions = ()=>{
        const newArray:number[] = [];
        for(let i = minYear;i<=2022;i++){
            newArray.push(i);
        }
        return newArray.map(year=>{
            return ( <option value={year} key={year}>
                {year}
            </option>
            )
        })
    }
    const activateHandler = (id:number)=>{
        setActiveGenres(oldGenres=>{
            return oldGenres.map(genre=>{
                if(genre.id === id){
                    return {...genre,active:!genre.active}
                }
                return genre
            })
        })
    }
    const [genresState,setActiveGenres] = useState<{genre:string,id:number,active:boolean}[]>([]);
    const [minYear,setMinYear] = useState<number>(1950)
    const [maxYear,setMaxYear] = useState<number>(2022)
    const [loading,setLoading] = useState<boolean>(true);
    const dispatch = useAppDispatch();
    const changeMinYearHandler = (e: React.ChangeEvent<HTMLSelectElement>)=>{
        setMinYear(parseInt(e.target.value));
    }
    const maxYearChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>)=>{
        setMaxYear(parseInt(e.target.value));
    }
    const filterHandler = ()=>{
        dispatch(clearMovies());
        const activeg = genresState.map(genre =>{
            if (genre.active){
                return genre.genre
            }
        }).filter(name => name as string) as string[]
        dispatch(addFilters({minYear,maxYear,genres:activeg}))
        dispatch(AddMovies());
    }
    useEffect(()=>{
        const FetchGenres = new Promise(async(resolve,reject)=>{
            const options = {
                method: 'GET',
                url: 'https://movies-app1.p.rapidapi.com/api/genres',
                headers: {
                  'X-RapidAPI-Key': 'f3e6b71aebmsh87c86148e237962p1a176ejsne209d79de834',
                  'X-RapidAPI-Host': 'movies-app1.p.rapidapi.com'
                }
              };
              const {data} = await axios.request(options);
              let i = 0;
              const ready:{genre:string,id:number,active:boolean}[] = data.results.map((result:{name:string,uuid:string})=>{
                return {genre:result.name,id:i++,active:false}
              })
              setActiveGenres(ready);
              resolve(setLoading(false))
        })
        FetchGenres.then(hello=>{
            
        })
    },[])
    return (
        
        <div className='filterMenuContainer'>
            <div className="yearContainer">
                <span>From:</span>
                <div className="year minimumYear">
                    
                    <select className='select minYearSelect' value={minYear} onChange={(e)=>{changeMinYearHandler(e)}} >
                        {
                            renderYearOptions()
                        }
                        
                    </select>
                </div>
                <span>To :</span>
                <div className="year maximumYear">
                    
                    <select value={maxYear} onChange={(e)=>{maxYearChangeHandler(e)}} className='select maxYearSelect'>
                        {
                            renderMaxYearOptions()
                        }
                    </select>
                </div>
            </div>
            <div className="genresContainer">
                {
                    !loading?
                    genresState.map(genre=>{
                        return  <div key={genre.id} className="genreOption">
                                    <span  onClick={()=>{activateHandler(genre.id)}} className={`selectButton ${genre.active ? 'active' : ''}`}> <FontAwesomeIcon icon={faCheck} /></span><span>{genre.genre}</span>
                                </div>
                    }) : <div>loading .... </div>
                }
            </div>
            <div onClick={()=>{filterHandler()}} className="FilterButton">
                Filter
            </div>
        </div>
    )
}


export default FilterMenu