import React from 'react'
import { useEffect, useState } from 'react'
import { connect, styled } from "frontity"
import wind from "../img/icons/wind.png"
import snow from "../img/icons/snow.png"
import rain from "../img/icons/rain.png"
import { Link } from 'react-router-dom'

const Section = ( { actions, selectionList, sorting, tag, index, setPageNum, searchTerm, setSearchTerm, whichFilterIsOpen } ) => {
  
  const [isHighClass, setHighClass] = useState(false)
  const [subIcon, setSubIcon] = useState([])
  const [subIconColored, setSubIconColored] = useState([])
  const [isVisible, setIsVisible] = useState("none");

  let newTag = tag.toLocaleLowerCase()

  let winter = ["síkabát", "sízokni", "sínadrág", "síkesztyű", "overall", "softshell kabát", "softshell nadrág"]
  let autumn = ["szélkabát", "túrakabát", "túranadrág"]
  let rainy = ["esőkabát"]
  let season = winter.includes(tag) ? snow : autumn.includes(tag) ? wind : rainy.includes(tag) ? rain : null;

  function handlePushToArray(word) {
    // let wordNoSpace = word.includes(" ") ? word.split(" ").join("") : word;
    const searchArray = searchTerm.split(" ");
    let noCapitalCathegories = selectionList.map(el => el.toLocaleLowerCase());
    let noSpaceCathegories = noCapitalCathegories.map(el => !el.includes(" ") ? el : el.split(" ").join("-"));
    const result = searchArray.filter(el => !noSpaceCathegories.includes(el))
    !result.includes(word) && !result.includes() ? result.push(word.includes(" ") ? word.split(" ").join("-") : word) : result;
    return result.join(" ").trim();
    }  

// SET IMAGES
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
  }, [selectionList])

  return (
    whichFilterIsOpen != "brand" ? 
    <SubButton 
      title={newTag} 
      onMouseEnter={() => {setIsVisible("block")}}
      onMouseLeave={() => {setIsVisible("none")}}
      onClick={() => {
        setHighClass(!isHighClass); 
        setPageNum(1);
        setSearchTerm(handlePushToArray(newTag))
        actions.router.set(`/shop/search/${sorting == undefined ? "" : `?orderby=${sorting}`}${sorting !== undefined ? "&" : "?"}s=${handlePushToArray(newTag).length > 0 ? handlePushToArray(newTag).split(" ").join("+") : handlePushToArray(newTag)}`)
      }}>
        {season != null ? <SeasonIcon src={season}></SeasonIcon> : null}
        <Icon  
          key={index}
          src={searchTerm.includes(newTag) ? subIconColored.src : subIcon.src}
          alt={""}
        />
        <Icon  
          style={{display: `${isVisible}`}}
          src={subIconColored.src}
          alt={""}
        />
    </SubButton> :
    <BrandButton
      title={newTag} 
      terms={searchTerm} 
      onClick={() => {
        setHighClass(!isHighClass); 
        setPageNum(1);
        setSearchTerm(handlePushToArray(newTag))
        actions.router.set(`/shop/search/${sorting == undefined ? "" : `?orderby=${sorting}`}${sorting !== undefined ? "&" : "?"}s=${handlePushToArray(newTag).length > 0 ? handlePushToArray(newTag).split(" ").join("+") : handlePushToArray(newTag)}`)
    }}>
        <img  
            key={index}
            src={subIcon.src}
            alt={""}
          />
    </BrandButton>
  )
}

export default connect(Section)

const SubButton = styled.s`
    font-size: 22px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    border-radius: 10px;
    cursor: pointer;
    background-color: white;
    width: 50px;
    height: 50px;    
    position: relative; 

    :hover {
      transform: scale(1.08);
      transition: ease 0.1s;
    }
`
const BrandButton = styled.s`
    font-size: 22px;
    cursor: pointer;
    width: calc(900px / 7 - 12px);
    height: 40px;
    @media (max-width: 600px) {
      height: 30px;
      width: calc(100% / 3 - 7px) 
    }
    background-color: ${props => props.terms.includes(props.title) ? "#f1f1f1" : "inherit"};

    border-radius: 5px;
    position: relative; 
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2px;
    
    img {
      height: 100%;
      max-width: max-content;
    }

    :hover {
      transform: scale(0.95);
      transition: ease 0.15s;
    }
`
const Icon = styled.img`
  height: 30px;
  wifth: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
const SeasonIcon = styled.img`
    width: 10px;
    height: 10px;
    position: absolute;
    top: 3px;
    left: 3px;
`

