import React from 'react'
import { useEffect, useState } from 'react'
import { connect, styled } from "frontity"

const BrandSection = ( { sorting, actions, tag, index, brandList, brand, setBrand, setPageNum, searchTerm , setSearchTerm } ) => {
  
  const [subIcon, setSubIcon] = useState([])
  const [subIconColored, setSubIconColored] = useState([])
  const [isVisible, setIsVisible] = useState("none");

  function handlePushToArray(word) {
    const searchArray = searchTerm.split(" ");
    // console.log(brandList);
    const result = searchArray.filter(el => !brandList.includes(el))
    // console.log(result);
    !result.includes(word) ? result.push(word) : result;
    return result.join(" ").trim();
    }  

  function setSource() {
    try{
        const src = require(`../img/icons/${tag}.png`).default
        setSubIcon({ src });
    }
    catch(err){
        setSubIcon("")
    }
  }
  
  useEffect(() => {
    setSource();
    
  }, [])

  return (
    <SubButton 
      title={tag} 
      onMouseEnter={() => {setIsVisible("block")}}
      onMouseLeave={() => {setIsVisible("none")}}
      onClick={() => {
        setBrand(tag);
        setPageNum(1);
        // console.log(gender);
        setSearchTerm(handlePushToArray(tag.toLowerCase()))
        // setSearchTerm(searchTerm.includes(" ") ? searchTerm.split(" ").some(r => {
        //   if(genders.includes(r))
        //     r.replace(r, tag)}) : searchTerm)
        actions.router.set(`/shop/search/${sorting == undefined ? "" : `?orderby=${sorting}`}${sorting !== undefined ? "&" : "?"}s=${handlePushToArray(tag).length > 0 ? handlePushToArray(tag).split(" ").join("+") : handlePushToArray(tag)}`)
      }}>
        <img  
          key={index}
          src={subIcon.src}
          alt={tag}
        />
    </SubButton>
  )
}

export default connect(BrandSection)

const SubButton = styled.s`
    font-size: 22px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    border-radius: 10px;
    cursor: pointer;

    width: 50px;
    height: 50px;    
    position: relative; 
    img {
      height: 30px;
      wifth: auto;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    :hover {
      transform: scale(1.08);
      transition: ease 0.1s;
    }
`

