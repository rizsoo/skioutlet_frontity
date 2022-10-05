import React from "react"
import { useEffect, useState } from 'react'
import { connect, styled } from "frontity"

import genderIcon from '../img/genderIcon.png'
import felszerelesIcon from '../img/equipement.png'
import atomicLogo from '../img/atomicIcon.png'
import jacketIcon from '../img/jacketIcon.png'
import sizeLogo from '../img/size.png'

import arrayMergeByKey from 'array-merge-by-key';

import Link from "@frontity/components/link"
import Papa from 'papaparse';
import filteredSearchcode from './filter_by_color_function';
import ProductsMosaik from './ProductsMosaik'
import Loading from "../components/loading";
import Search from "./Search";
import Pagi from "./Pagi"
import FilterSearch from "./FilterSearch"

import Section from "./Section"
import SectionSize from "./SectionSize"

const Shop = ({ state, actions }) => {
  const info = state.source.get(state.router.link)

  // UTF Decoder
  function urldecode(str) {
    return decodeURIComponent((str+'').replace(/\+/g, '%20'));
 }

// PAGER
    const location = urldecode(state.router.link)
    // cut up url
    function cutingURL(url) {
      if(url.includes("oldal")) {
        return url.split("/")[3]
      } else return 1
    }
    
    let pageNumber = location.split("/").pop().replace( /^\D+/g, '');
    let pager = pageNumber > 0 ? pageNumber : 1;

// Searchterm
    const searchLink = state.router.link;
    const searchResult = searchLink.includes("s=") ? searchLink.split("s=").pop() : '';
    
    const queryResult = searchResult != null && searchResult.length > 0 ? searchResult.toLocaleLowerCase() : '';
    const queryLast = queryResult.includes("+") ? queryResult.split("+").join(" ") : queryResult;
    const queryArray = urldecode(queryResult).split(" ");
    // console.log(queryArray);

// Orderby
    const orderResult = searchLink.includes("orderby=") ? searchLink.split("orderby=").pop() : '';
    const orderNameOnly = orderResult.includes("&") ? orderResult.split("&")[0] : orderResult;
    // console.log(orderNameOnly);

//STATES
    //GetData states
    const [imgData, setImgData] = useState([])
    const [webarlista, setWebarlista] = useState([])
    // const [productData, setProductData] = useState([])

    // const [fullProductList, setFullProductList] = useState([])
    const [pageNum, setPageNum] = useState(Number(cutingURL(location)));
    const [searchTerm, setSearchTerm] = useState(urldecode(queryLast))
    const [isLoaded, setIsLoaded] = useState(false)
    const [sorting, setSorting] = useState(orderNameOnly);
    
//Get IMG data
function getIMGData() {
  fetch("https://wp.skioutlet.hu/wp-content/uploads/2022/09/keresokod_utf8.csv")
    .then(res => res.url)
    .then((response) => {
      Papa.parse(response, {
        skipEmptyLines: true,
        encoding: "UTF-8",
        download: true,
        dynamicTyping: true,
        header: true,
      transformHeader: function(h, i) {
        let header = [ "sku", "img" ]
        h = header[i]
        // console.log(h);
        return h
      },
      complete: function(results) {
        let data = results.data;
        setImgData(data)
      }})
    })
}
 
//Get DATA
// function getData() {
//     fetch("https://wp.skioutlet.hu/wp-content/uploads/2022/09/webarlista_rita8.csv")
//       .then(res => res.url)
//       .then((response) => {
//         Papa.parse(response, {
//           encoding: "UTF-8",
//           download: true,
//           dynamicTyping: true,
//           header: true,
//         transformHeader: function(h, i) {
//           let header = [ "sku", "title", "brand", "", "cat1", "cat2", "price", "saleprice", "isonsale", "stock", "size", "img" ]
//           h = header[i]
//           // console.log(h);
//           return h
//         },
//         complete: function(results) {
//           let data = results.data.filter(prod => prod.stock > 0);
//           // setWebarlista(data);

//           let filterResult = results.data.filter(prod => prod.stock > 0);
//           let filterByColor = filteredSearchcode(filterResult, 'img');
//           setProductData(filterByColor)
//           setFullProductList(filterByColor)
//           setIsLoaded(true)
//         }
//         }) 
//       })
// }   
function getData2() {
  fetch("https://wp.skioutlet.hu/wp-content/uploads/2022/09/webarlista_utf8.csv")
    .then(res => res.url)
    .then((response) => {
      Papa.parse(response, {
        skipEmptyLines: true,
        delimiter: "\t",
        download: true,
        dynamicTyping: true,
        header: true,
      transformHeader: function(h, i) {
        let header = [ "sku", "title", "brand", "", "cat1", "cat2", "price", "saleprice", "isonsale", "stock", "size" ]
        h = header[i]
        return h
      },
      complete: function(results) {
        let data = results.data.filter(prod => Number(prod.stock.split(",").shift()) > 0);
        console.log(data);
        setWebarlista(data);
        setIsLoaded(true)
      }
      }) 
    })
}   
function getData() {
  fetch("https://wp.skioutlet.hu/wp-content/uploads/2022/09/webarlista.csv")
    .then(res => res.url)
    .then((response) => {
      Papa.parse(response, {
        skipEmptyLines: true,
        // delimiter: "\t",
        download: true,
        dynamicTyping: true,
        header: true,
      transformHeader: function(h, i) {
        let header = [ "sku", "title", "brand", "", "cat1", "cat2", "price", "saleprice", "isonsale", "stock", "size" ]
        h = header[i]
        return h
      },
      complete: function(results) {
        let data = results.data.filter(prod => prod.stock > 0);
        setWebarlista(data);
        setIsLoaded(true)
      }
      }) 
    })
}   


// USEeFFECT
useEffect(() => {
  getIMGData()
  // getData()
  getData2()
}, [info.link])

let mergedData = filteredSearchcode(arrayMergeByKey("sku", imgData, webarlista).filter(el => el.title), 'img').filter(el => el.sku != undefined || el.sku != null)
console.log(filteredSearchcode(arrayMergeByKey("sku", imgData, webarlista), 'img'));
let nextNum = pageNum * 15;

// Filtering by cat/brand/sex
  let brandList = filteredSearchcode(mergedData, 'brand').filter(data=> data.brand != undefined).map(data => data.brand.toLowerCase()).map(brand => brand.includes(" ") ? brand.split(" ").join("-") : brand).sort((a, b) => a.localeCompare(b));

  function filterCat1ByCat2(searchWord) {
    let result = filteredSearchcode(mergedData, 'cat1').map(data => {
      
      if(data.cat2 === searchWord && data.cat1 != undefined && data.cat2 != undefined) {
        return String(data.cat1).toLowerCase()
    }}).sort((a, b) => a.localeCompare(b));
    return result.filter(el => el != undefined)
  }

  const genders = ["férfi", "női", "gyerek", "unisex"]

  // Get each word
    let allCathegory = [...filterCat1ByCat2("Felszerelés"), ...filterCat1ByCat2("Ruházat"), ...brandList]

    function filterIt(terms, a) {
      let words = terms.split(" ");
      words = words.map(val => !val.includes("-") ? val.replace(/\"/g, "") : val.split("-").join(" ").replace(/\"/g, ""));
        const v = Object.values(a);
        const brandName = a.brand ? a.brand.toLowerCase() : "";
        const catName = a.cat1 ? a.cat1.toLowerCase() : "";
        let catNames = [brandName, catName];
        let isCat = words.some(el => allCathegory.includes(el)) ? words.some(el => catNames.some(cat => cat === el)) : true;
        const f = JSON.stringify(v).toLowerCase();
        let result = words.every(val => f.includes(val) && isCat)
          return result;
    };

// Filtermenu STATES
  const [isFilterOpen, setFilterOpen] = useState(false)
  const [selectionList, setSelectionList] = useState([])
  const [sectionList, setSectionList] = useState([])
  const [whichFilterIsOpen, setWhichFilterIsOpen] = useState("")


// Filtermenu Cat
  let filterDataCathegory = [...filterCat1ByCat2("Felszerelés"), ...filterCat1ByCat2("Ruházat")]

  const filteredProducts = mergedData.filter(val => {
    if (searchTerm === "" || filterIt(searchTerm, val)) {
      return val
    } 
  });

  // Get available sizes
  // let sizeList = filteredSearchcode(filteredProducts, "size").map(data => data.size).sort((a, b) => a.localeCompare(b));

  // Handle Clearout Search
  function clearOutSearch() {
    setSearchTerm("")
    setPageNum(1)
    setFilterOpen(false)
    setSorting("")
    actions.router.set("/shop/")
    // getData()
  }

// TOTAL PAGE NUMBER  
  let totalPageNum = Math.ceil(filteredProducts.length / 15);

  const filterButtons = [
    {
      "name": "gender",
      "hun": "Férfi, Női, Gyerek...",
      "icon": genderIcon,
      "list": genders,
      "section": genders
    },
    {
      "name": "equipment",
      "hun": "Felszerelés",
      "icon": felszerelesIcon,
      "list": filterCat1ByCat2("Felszerelés"),
      "section": filterDataCathegory
    },
    {
      "name": "clothing",
      "hun": "Ruházat",
      "icon": jacketIcon,
      "list": filterCat1ByCat2("Ruházat"),
      "section": filterDataCathegory
    },
    {
      "name": "brand",
      "hun": "Márka",
      "icon": atomicLogo,
      "list": brandList,
      "section": brandList
    },
  ];

  return (
    <ShopContent>
      <FilterHeader>
        <FilterBar>
          <DelButton onClick={clearOutSearch} ><ion-icon name="trash-outline" title="Minden preferencia törlése"></ion-icon></DelButton>
          <Search/>
        </FilterBar>
        <FilterBar>
          {filterButtons.map((el, index) => {
            return (
              <SectionButton key={index} onClick={() => {
                  setSectionList(el.list); 
                  setWhichFilterIsOpen(el.name); 
                  setSelectionList(el.section); 
                  setFilterOpen(whichFilterIsOpen === el.name ? !isFilterOpen : true)}}>
                <img src={el.icon} alt={el.hun} />
              </SectionButton>
            )
          })}
        </FilterBar>
      </FilterHeader>
      {/* Cleancode */}
      {isFilterOpen?<FilterButton>
        {sectionList.map((tag, index) => {
          return (
            <Section  
              key={index} 
              
              selectionList={selectionList}
              sorting={sorting} 
              
              tag={tag} 
              index={index}

              genders={genders}
              
              setPageNum={setPageNum} 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm} />
          )}
        )}
      </FilterButton>:null}
      <FilterSearch 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        brandList={brandList}/>
      <Pagi 
        totalPageNum={totalPageNum} 
        sorting={sorting}
        searchTerm={searchTerm} 
        pageNum={pageNum} 
        setPageNum={setPageNum}
      />  
      <Sorting action="/shop/search/" onInput={() => { 
        setSorting(event.target.value) 
        actions.router.set(searchLink.includes("?") ? `${searchLink}&orderby=${event.target.value}` : `${searchLink}search/?orderby=${event.target.value}`)
        }}>
        <option name="orderby" value="name" defaultValue={orderNameOnly === "name"}>Név szerint</option>
        <option name="orderby" value="priceLow" defaultValue={orderNameOnly === "priceLow"}>Legdrágább</option>
        <option name="orderby" value="priceHigh" defaultValue={orderNameOnly === "priceHigh"}>Legolcsóbb</option>
      </Sorting>
      {isLoaded?<ProductsMosaik 
          sorting={sorting} 
          filteredProducts={filteredProducts} 
          nextNum={nextNum}/> : <Loading/> }
      <Pagi 
        totalPageNum={totalPageNum} 
        sorting={sorting}
        searchTerm={searchTerm} 
        pageNum={pageNum} 
        setPageNum={setPageNum}
      /> 
    </ShopContent>
  )
}

const ShopContent = styled.div`
  padding-top: 15px;
  @media (max-width: 600px) {
    padding-top: 20px;
    
  }
`;
const FilterHeader = styled.div`
  display: flex;
  gap: 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  background-color: white;
  border-radius: 10px;
  padding: 10px 10px;
  margin-bottom: 10px;
  width: 100%;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`
const FilterBar = styled.div`
  
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  s {
    font-size: 22px;
    box-shadow: inset 1px 1px 3px rgba(0, 0, 0, 0.125);
    border-radius: 10px;
    cursor: pointer;
    margin: 0;
    background-color: #f9f9f9;
    min-width: 40px;
    min-height: 40px;     
    display: flex;
    align-items: center;
    justify-content: center;
    :hover {
      box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
      background-color: white;
      transition: ease 0.1s;  
    }
    @media (max-width: 600px) {
      min-width: calc(25% - 10px);
      min-height: 60px;
    }
  }
  @media (max-width: 600px) {
    gap: 12px;
  }
`;
const DelButton = styled.s`
  color: #ed2123;
  @media (max-width: 600px) {
    ion-icon {
      font-size: 36px;
    }
  }
`
const SectionButton = styled.s`
    img {
      height: 26px;
      @media (max-width: 600px) {
        height: 36px;
      }
    }
    position: realtive;   
`
const FilterButton = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    gap: 10px;
    margin-bottom: 10px;
`
const SizeList = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    gap: 10px;
    margin-bottom: 10px;
`
const SizeTag = styled.div`
    font-size: 17px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    border-radius: 10px;
    cursor: pointer;
    padding: 5px;
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background-color: #F9F9F9;
`
const Sorting = styled.select`
    margin-top: 10px;
    border: none;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    background-color: white;
    padding: 7px;
    border-radius: 5px;
    @media (max-width: 600px) {
      font-size: 1.4rem;
    }
`

export default connect(Shop)