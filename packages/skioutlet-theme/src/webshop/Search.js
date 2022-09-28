import { styled } from "frontity"


const Search = () => (
    <SearchBarBox action="/shop/search/" method="get">
        {/* <input onKeyDown={handleKeyDown} onChange={event => setSearchTerm(event.target.value.toLocaleLowerCase())}  /> */}
        <SearchBar
            type="text"
            placeholder={"Termék keresése..."}
            name="s" 
        />
        <button type="submit"><ion-icon name="search-outline"></ion-icon></button>
    </SearchBarBox>
);

const SearchBarBox = styled.form`
    padding: 9px;
    
    background-color: #f9f9f9;
    color: #43454b;
    box-sizing: border-box;
    font-weight: 400;
    box-shadow: inset 1px 1px 3px rgba(0, 0, 0, 0.125);
    height: 40px;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    border-radius: 10px;
    button {
        border: unset;
        background-color: unset;
        padding: 0 5px;
    }
    ion-icon {
        font-size: 20px !important;
        --ionicon-stroke-width: 50px;
        cursor: pointer;
        @media (max-width: 600px) {
            font-size: 30px !important;
        }
    }
    @media (max-width: 600px) {
        height: 60px;
        width: calc(75% - 5px)
        ion-icon {
            color: black !important;
        }
    }
`
const SearchBar = styled.input`
    width: 100%;
    outline: none;
    -webkit-appearance: none;
    border: 0;
    background-color: #f9f9f9;
    font-size: 1em;
    @media (max-width: 600px) {
        font-size: 1.2em;
    }
`

export default Search;