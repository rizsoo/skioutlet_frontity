import React from 'react'
import { useEffect, useState } from 'react'
import { connect, styled } from "frontity"

const SectionSize = ( { sorting, actions, tag, index, sizeList, size, setSize, setPageNum, searchTerm , setSearchTerm } ) => {
  
  const [subIcon, setSubIcon] = useState([])
  const [subIconColored, setSubIconColored] = useState([])
  const [isVisible, setIsVisible] = useState("none");
  const [isSizeAdded, setIsSizeAdded] = useState(false)
  console.log(size.split(" "));
  let color = size.split(" ").includes(tag) ? "#ed2123" : "white";
  let fontColor = size.split(" ").includes(tag) ? "white" : "black";

  function handlePushSizeToArray(word) {
    if(isSizeAdded === true) {
      let newList = size.split(" ").filter((item) => item !== word);
      console.log(newList);
      setSize(newList.join(" "));
    } else {
      let sizeArray = size.split(" ").includes(word) ? size : size + " " + word;
      setSize(sizeArray);
    }
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
    <SizeButton 
      title={tag} 
      style={{backgroundColor: `${color}`, color: `${fontColor}`}}
      onMouseEnter={() => {setIsVisible("block")}}
      onMouseLeave={() => {setIsVisible("none")}}
      onClick={() => {
        setPageNum(1);
        setIsSizeAdded(!isSizeAdded)
        handlePushSizeToArray(tag);
        console.log(size);
        // setSearchTerm(handlePushToArray(tag.toLowerCase()))
        // setSearchTerm(searchTerm.includes(" ") ? searchTerm.split(" ").some(r => {
        //   if(genders.includes(r))
        //     r.replace(r, tag)}) : searchTerm)
        // actions.router.set(`/shop/search/${sorting == undefined ? "" : `?orderby=${sorting}`}${sorting !== undefined ? "&" : "?"}s=${handlePushToArray(tag).length > 0 ? handlePushToArray(tag).split(" ").join("+") : handlePushToArray(tag)}`)
      }}>
        <p>{tag}</p>
    </SizeButton>
  )
}

export default connect(SectionSize)

const SizeButton = styled.s`
    font-size: 16px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    position: relative; 
    text-decoration: none;
    p {
        margin: 0;
        font-weight: bold;
        padding: 5px 0;
    }
    img {
      height: 30px;
      wifth: auto;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
`

