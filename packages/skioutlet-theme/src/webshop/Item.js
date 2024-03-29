import React from 'react'
import { generatePath } from 'react-router-dom';
import Link from "@frontity/components/link"
import { useState, useEffect } from 'react';
import { connect, styled } from "frontity";

function currencyConverter(number) {
  let priceSep = String(number).split("");
  let priceStr = priceSep.splice(priceSep.length - 3).join("");
  let finalPrice = priceSep.join("") + " " + priceStr + " Ft";
  // console.log(finalPrice);
  return finalPrice;
}

const Item = ({ state, prod, size }) => {
  const info = state.source.get(state.router.link)
  let prodTitle = String(prod.title);
  let prodBrand = String(prod.brand);
  let imgFolderName = prodBrand.toLowerCase();
  let prodImg = String(prod.img);
  // Get image
  const [imgData, setImgData] = useState([])
  const [loaded, setLoaded] = useState(false)

  function setSource() {
    try {
      const src = `https://img.skioutlet.hu/product_images/${imgFolderName}/${prodImg}.jpg`
      setImgData({ src });
    }
    catch (err) {
      setImgData("")
    }
  }


  useEffect(() => {
    setSource();
  }, [info, size])


  return (
    <ItemFrame>
      <Link link={generatePath("/shop/termek/:id", {
        id: prodImg
      })}>
        <ItemContent>
          <img className='productwall-img' style={{ display: loaded ? "block" : "none" }} src={imgData.src} alt={prodImg} onLoad={() => setLoaded(true)} />
          <h2 className='product-title'>{prodTitle}</h2>
          {/* <p>{prod.img}</p> */}
          <ItemPrice>
            {prod.saleprice === prod.price ? null : <h2><SalePrice>{currencyConverter(prod.price)}</SalePrice></h2>}
            <h2>{currencyConverter(prod.saleprice)}</h2>
          </ItemPrice>
        </ItemContent>
      </Link>
    </ItemFrame>
  )
}

const ItemFrame = styled.div`
  width: 270px;
  min-width: 250px;
  height: 450px;
  background-color: white;
  border-radius: 15px;

  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  @media (max-width: 600px) {
    width: 100%;
  }
`;

const ItemContent = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;

  overflow: hidden;
  position: relative;
  p {
    cursor: text;
  }
  img {
    position: absolute;
    top: 10px;
    width: 95%;
    max-height: 282px;
    object-fit: contain;
  }
  h2 {
    font-weight: 600;
    font-size: 23px;
    padding: 0 10px;
    margin: 10px 0;

    text-decoration: none !important;

    background-color: white;
    color: #1f1f1f;
    font-family: "Raleway", sans-serif;
    z-index: 1;
  }
`;

const ItemPrice = styled.div`
  width: 100%;
  background-color: #ed2123;
  color: white;
  border-radius: 0 0 15px 15px;

  display: flex;
  justify-content: center;
  align-items: center;
    h2 {
      margin: 13px 0;
      background-color: #ed2123 !important;
      color: white !important;
    }
`;

const SalePrice = styled.s`
  font-weight: lighter;
  color: rgb(233, 147, 147);
  transform: scale(0.5);
`;

export default connect(Item)