import React from "react"
import { useEffect, useState } from 'react'
import { connect, styled } from "frontity"

import atomicLogo from '../img/atomic.png'
import sizeLogo from '../img/size.png'

import Link from "@frontity/components/link"
import Papa from 'papaparse';
import filteredSearchcode from './filter_by_color_function';
import ProductsMosaik from './ProductsMosaik'
import Loading from "../components/loading";
import Search from "./Search";
import Pagination from "./Pagination"
import Hashtag from "./Hashtag"
import FilterSearch from "./FilterSearch"

import GenderSection from "./SectionGender"
import SectionGear from "./SectionGear"
import BrandSection from "./SectionBrand"
import SectionSize from "./SectionSize"

// MEGCSINÁLNI:
// méret kereső
// deploy és security
// IMG!!!


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
    const [productData, setProductData] = useState([])
    const [fullProductList, setFullProductList] = useState([])
    const [pageNum, setPageNum] = useState(Number(cutingURL(location)));
    const [searchTerm, setSearchTerm] = useState(urldecode(queryLast))
    const [isLoaded, setIsLoaded] = useState(false)
    const [newImgData, setNewImgData] = useState([])
    const [sorting, setSorting] = useState(orderNameOnly);

    const [isGenderOpen, setIsGenderOpen] = useState(false)
    const [isEquipementOpen, setIsEquipementOpen] = useState(false)
    const [isToWearOpen, setIsToWearOpen] = useState(false)
    const [isBrandOpen, setIsBrandOpen] = useState(false)
    const [isSizeOpen, setIsSizeOpen] = useState(false)

// Get IMG data
  //   function getIMGData() {
  //     fetch("http://skioutlet.hu/wp-content/uploads/webarlista_imgdata.csv")
  //       .then(res => res.url)
  //       .then((response) => {
  //           Papa.parse(response, {
  //           encoding: "UTF-8",
  //           download: true,
  //           dynamicTyping: true,
  //           header: true,
  //           complete: function(results) {
  //             let data = results.data;
  //             setNewImgData(data)
  //           }})
  //         })
  //       }
  // console.log(newImgData);
// Get DATA

    function getData() {
        fetch("https://wp.skioutlet.hu/wp-content/uploads/2022/09/webarlista_rita8.csv")
        .then(res => res.url)
        .then((response) => {
            Papa.parse(response, {
            encoding: "UTF-8",
            download: true,
            dynamicTyping: true,
            header: true,
            transformHeader: function(h, i) {
              let header = [ "sku", "img", "title", "brand", "", "cat1", "cat2", "price", "saleprice", "isonsale", "stock", "size" ]
              h = header[i]
              console.log(h);
              return h
            },
            complete: function(results) {
              //console.log(results.data.size);

              setProductData(filteredSearchcode(results.data.filter(prod => prod.stock > 0), 'img'))
                setFullProductList(filteredSearchcode(results.data.filter(prod => prod.stock > 0), 'img'))
                // if(queryToFilter.length > 0) setFilterWordCollect(queryToFilter.split(" "))
                setIsLoaded(true)
            }
            }) 
        })
        }   

    //console.log(productData);

    useEffect(() => {
      getData()
    }, [info.link])

// Handle pagination click
    function handlePageClick(data) {
      setPageNum(cutingURL(location));
      let getPaginationCount = Number(data.nativeEvent.originalTarget.textContent)
      setPageNum(getPaginationCount);
    }
    let nextNum = pageNum * 15;


// Filtering by cat/brand/sex
  let brandList = filteredSearchcode(fullProductList, 'brand').map(data => data.brand.toLowerCase()).sort((a, b) => a.localeCompare(b));

  function filterCat1ByCat2(searchWord) {
    let result = filteredSearchcode(fullProductList, 'cat1').map(data => {
      if(data.cat2 === searchWord && data.cat1 != undefined) {
        return data.cat1
    }}).sort((a, b) => a.localeCompare(b));
    return result.filter(el => el != undefined)
  }



  // Get each word
    function filterIt(terms, a) {
      // if(a.title.toLocaleLowerCase().includes("junior")) {
      //   return a.title.toLocaleLowerCase().replace("junior", "gyerek")
      //  } else { return a
      // }
      let words = terms.split(" ");
      words = words.map(val => val.replace(/\"/g, ""));
        const v = Object.values(a);
        const f = JSON.stringify(v).toLowerCase();
        let result = words.every(val => f.includes(val))
          return result;
    };

// Filtermenu STATES
  const [gender, setGender] = useState("");
  const [brand, setBrand] = useState("brandList");
  const genders = ["férfi", "női", "gyerek", "unisex"]
  const [gear, setGear] = useState("");
  const [size, setSize] = useState("");

// Filtermenu Cat
  let filterDataCathegory = [...filterCat1ByCat2("Felszerelés"), ...filterCat1ByCat2("Ruházat")]

  const filteredProducts = productData.filter(val => {
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
    setIsToWearOpen(false)
    setIsGenderOpen(false)
    setIsBrandOpen(false);
    setIsSizeOpen(false);
    setGender("")
    setSorting("")
    actions.router.set("/shop/")
    getData()
  }

// TOTAL PAGE NUMBER  
  let totalPageNum = Math.ceil(filteredProducts.length / 15);

  console.log(searchTerm);

  return (
    <ShopContent>
      <FilterBar>
        <DelButton onClick={clearOutSearch} ><ion-icon name="trash-outline" title="Minden preferencia törlése"></ion-icon></DelButton>
        <Search/>
        {/* GENDER */}
        <Button onClick={() => { 
          setIsGenderOpen(!isGenderOpen); 
          setIsEquipementOpen(false);
          setIsToWearOpen(false); 
          setIsBrandOpen(false);
          // setIsSizeOpen(false);
        }}><ion-icon name="male-female-outline"></ion-icon></Button>
        {/* EQUIPEMENT */}
        <Button onClick={() => { 
          setIsEquipementOpen(!isEquipementOpen); 
          setIsToWearOpen(false); 
          setIsGenderOpen(false); 
          setIsBrandOpen(false);
          // setIsSizeOpen(false);
          setFilterDataCathegory(filterCat1ByCat2("Felszerelés")) 
        }}><ion-icon name="american-football-outline"></ion-icon></Button>
        {/* CLOTHING */}
        <Button onClick={() => { 
          setIsToWearOpen(!isToWearOpen); 
          setIsBrandOpen(false)
          setIsGenderOpen(false); 
          setIsEquipementOpen(false) 
          // setIsSizeOpen(false);
          setFilterDataCathegory(filterCat1ByCat2("Ruházat")) 
        }}><ion-icon name="shirt-outline"><img></img></ion-icon></Button>
        <Button onClick={() => { 
          setIsBrandOpen(!isBrandOpen)
          setIsToWearOpen(false); 
          setIsGenderOpen(false); 
          setIsEquipementOpen(false);
          // setIsSizeOpen(false);
        }}><img src={atomicLogo} alt="Márka" /></Button>
        {/* <Button onClick={() => { 
          setIsSizeOpen(!isSizeOpen);
          setIsBrandOpen(false);
          setIsToWearOpen(false); 
          setIsGenderOpen(false); 
          setIsEquipementOpen(false);
        }}><img src={sizeLogo} alt="Méret" /></Button> */}
      </FilterBar>
      {/* Filter Gender */}
      {isGenderOpen?<WearMenu>
        {genders.map((tag, index) => {
          return (
            <GenderSection key={index} sorting={sorting} tag={tag} index={index} gender={gender} genders={genders} setGender={setGender} setPageNum={setPageNum} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          )}
        )}
      </WearMenu>:null}
      {/* Filter Clothing */}
      {isToWearOpen?<WearMenu>
        {filterCat1ByCat2("Ruházat").map((tag, index) => {
          return (
            <SectionGear key={index} sorting={sorting} tag={tag} index={index} gear={gear} filterDataCathegory={filterDataCathegory} setGear={setGear} setPageNum={setPageNum} searchTerm={searchTerm} setSearchTerm={setSearchTerm}  />
              )}
        )}
      </WearMenu>:null}
      {/* Filter Equipement */}
      {isEquipementOpen?<WearMenu>
        {filterCat1ByCat2("Felszerelés").map((tag, index) => {
          return (
            <SectionGear key={index} sorting={sorting} tag={tag} index={index} gear={gear} filterDataCathegory={filterDataCathegory} setGear={setGear} setPageNum={setPageNum} searchTerm={searchTerm} setSearchTerm={setSearchTerm}  />
          )}
        )}
      </WearMenu>:null}
      {/* Filter Brand */}
      {isBrandOpen?<WearMenu>
          {brandList.map((tag, index) => {
            return (
              <BrandSection key={index} sorting={sorting} tag={tag} index={index} brandList={brandList} brand={brand} setBrand={setBrand} setPageNum={setPageNum} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            )}
          )}
      </WearMenu>:null}
      {/* Filter SIZE */}
      {/* {isSizeOpen?<SizeList>
        {sizeList.map((tag, index) => {
          return (
            <SectionSize key={index} sorting={sorting} tag={tag} index={index} sizeList={sizeList} size={size} setSize={setSize} setPageNum={setPageNum} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          )
          })
        }
      </SizeList>:null} */}
      <FilterSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Pagination sorting={sorting} searchTerm={searchTerm} handlePageClick={handlePageClick} pageNum={pageNum} totalPageNum={totalPageNum} />
      <Sorting action="/shop/search/" onInput={() => { 
        setSorting(event.target.value) 
        actions.router.set(searchLink.includes("?") ? `${searchLink}&orderby=${event.target.value}` : `${searchLink}search/?orderby=${event.target.value}`)
        }}>
        <option name="orderby" value="name" selected={orderNameOnly === "name"}>Név szerint</option>
        <option name="orderby" value="priceLow" selected={orderNameOnly === "priceLow"}>Legdrágább</option>
        <option name="orderby" value="priceHigh" selected={orderNameOnly === "priceHigh"}>Legolcsóbb</option>
      </Sorting>
      {isLoaded ? 
        <ProductsMosaik sorting={sorting} filteredProducts={filteredProducts} nextNum={nextNum}/> : <Loading/> }
      <Pagination searchTerm={searchTerm} handlePageClick={handlePageClick} pageNum={pageNum} totalPageNum={totalPageNum} />
    </ShopContent>
  )
}

const ShopContent = styled.div`
`;
const FilterBar = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  margin: 10px 0;
  padding: 10px 10px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  s {
    font-size: 22px;
    box-shadow: inset 1px 1px 3px rgba(0, 0, 0, 0.125);
    border-radius: 10px;
    cursor: pointer;
    margin: 0;
    background-color: #f9f9f9;
    width: 35px;
    height: 35px;     
    display: flex;
    align-items: center;
    justify-content: center;
    :hover {
      box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
      background-color: white;
      transition: ease 0.1s;  
    }
  }
`;
const DelButton = styled.s`
  color: #ed2123;
`
const Button = styled.s`
    img {
      height: 20px;
    }
    position: realtive;    
`
const WearMenu = styled.div`
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
`

export default connect(Shop)