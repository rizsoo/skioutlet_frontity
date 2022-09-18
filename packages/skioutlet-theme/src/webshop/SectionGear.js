import React from 'react'
import { useEffect, useState } from 'react'
import { connect, styled } from "frontity"

const GearSection = ( { sorting, actions, tag, index, gear, filterDataCathegory, setGear, setPageNum, searchTerm, setSearchTerm } ) => {
  
  const [isHighClass, setHighClass] = useState(false)
  const [subIcon, setSubIcon] = useState([])
  const [subIconColored, setSubIconColored] = useState([])
  const [isVisible, setIsVisible] = useState("none");
  let newTag = tag.toLocaleLowerCase()

  function handlePushToArray(word) {
    const searchArray = searchTerm.split(" ");
    
    let allCathegories = filterDataCathegory.map(el => el.toLocaleLowerCase().split(" ").pop());
    console.log(allCathegories);
    const result = searchArray.filter(el => !allCathegories.includes(el) && !searchArray.includes(el))
    // console.log(result);
    !result.includes(word) ? result.push(word) : result;
    return result.join(" ").trim();
    }  

  function setSource() {
    try{
        const src = require(`../img/icons/${newTag}.png`).default
        setSubIcon({ src });
    }
    catch(err){
        setSubIcon("")
    }
  }
  function setSourceColored() {
    try{
        const src =require(`../img/icons_colored/${newTag}_2.png`).default
        setSubIconColored({ src })
    }
    catch(err){
        setSubIconColored("")
    }
  }
  useEffect(() => {
    setSource();
    setSourceColored();
  }, [])

  return (
    <SubButton 
      title={newTag} 
      onMouseEnter={() => {setIsVisible("block")}}
      onMouseLeave={() => {setIsVisible("none")}}
      onClick={() => {
        setHighClass(!isHighClass); 
        setGear(newTag);
        setPageNum(1);
        // console.log(gender);
        setSearchTerm(handlePushToArray(newTag))
        // setSearchTerm(searchTerm.includes(" ") ? searchTerm.split(" ").some(r => {
        //   if(genders.includes(r))
        //     r.replace(r, newTag)}) : searchTerm)
        actions.router.set(`/shop/search/${sorting == undefined ? "" : `?orderby=${sorting}`}${sorting !== undefined ? "&" : "?"}s=${handlePushToArray(newTag).length > 0 ? handlePushToArray(newTag).split(" ").join("+") : handlePushToArray(newTag)}`)
      }}>
        <img  
          key={index}
          src={gear === newTag ? subIconColored.src : subIcon.src}
          alt={""}
        />
        <img  
          // key={index}
          style={{display: `${isVisible}`}}
          src={subIconColored.src}
          alt={""}
        />
    </SubButton>
  )
}

export default connect(GearSection)

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

