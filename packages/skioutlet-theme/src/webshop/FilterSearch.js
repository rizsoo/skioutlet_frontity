import FilterWord from "./FilterWord";
import { Link, generatePath } from "react-router-dom";
import { connect, styled } from "frontity"

function FilterSearch( { state, searchTerm, setSearchTerm } ) {
    const info = state.source.get(state.router.link)

    let lowCaseWords = searchTerm.split(" ").map(el => el.toLowerCase());
    let searchUrl = lowCaseWords.map(item => item).join('+')

    let result = searchTerm.split(" ");

    function setGenderFunction(gender) {
      if(searchTerm.includes(!gender)) {
        setSearchTerm(searchTerm + " " + gender)
      }
    }
    return(
    <FilterWordCollector>
        <FilterSearchbarSecondary>
        {result.map((word, index) => {
              if(word.length > 0) 
              setGenderFunction(word)
              return (
                // filterbar
                searchTerm != "" ? <FilterWord word={word} index={index} setSearchTerm={setSearchTerm} searchTerms={searchTerm} /> : null
            )})}
        {/* <input
            type="text"
            className='searchbar'
            placeholder={"Termék keresése..."}
        /> */}
        </FilterSearchbarSecondary>
        {/* <FilterSearchbarSecondary>
            <Link link={generatePath("/shop?s=:words", {
                words: searchUrl,
            })}><button type="submit" className='refreshBtn'><ion-icon name="search-outline"></ion-icon></button></Link>
        </FilterSearchbarSecondary>  */}
    </FilterWordCollector>
)};

const FilterWordCollector = styled.form`
    max-width: 1000px;
    height: 100%;
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
`
const FilterSearchbarSecondary = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;    
`
const TrashBin = styled.div`
    ion-icon {
        font-size: 27px;
        --ionicon-stroke-width: 25px;
        color: rgb(108, 108, 108);
    }
`

export default connect(FilterSearch);