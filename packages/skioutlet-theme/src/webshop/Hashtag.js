import React from 'react'
import { useEffect, useState } from 'react'
import { connect, styled } from "frontity"

const Hashtag = ( { tag, index, setGender, searchTerm, setSearchTerm, filterWordCollect, setFilterWordCollect, actions } ) => {
    const [isHighClass, setHighClass] = useState(false)

    // let lowcapFilterWordCollect = filterWordCollect.map(el => el.toLowerCase());
    // console.log(lowcapFilterWordCollect);
    // let lowcapTag = tag.toLowerCase();

  // Get image
  const [subIcon, setSubIcon] = useState([])
  const [subIconColored, setSubIconColored] = useState([])

  const [isVisible, setIsVisible] = useState("none");

  function setSource() {
    try{
        const src = require(`../img/icons/${tag}.png`).default
        const blkwht =require(`../img/icons_colored/${tag}_2.png`).default
        setSubIcon({ src });
        setSubIconColored({ blkwht })
    }
    catch(err){
        setSubIcon("")
        setSubIconColored("")
    }
  }
  function setSourceColored() {
    try{
        const src =require(`../img/icons_colored/${tag}_2.png`).default
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

  const genders = ["férfi", "női", "junior", "gyerek"];

  function selectFilterFromMenu(term) {
    actions.router.set(`/shop/search/?s=${term}`)
    // window.location.reload(false)
  }
  
  return (
    <SubButton 
      title={tag} 
      onMouseEnter={() => {setIsVisible("block")}}
      onMouseLeave={() => {setIsVisible("none")}}
      onClick={() => {
        setHighClass(!isHighClass); 
        setFilterWordCollect([tag]);
        selectFilterFromMenu([tag]);
        if(genders.includes(tag)) setGender([tag]);
        
        // setSearchTerm(searchTerm + " " + tag)
      }}>
        <img  
          key={index}
          src={subIcon.src}
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

export default connect(Hashtag)

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

