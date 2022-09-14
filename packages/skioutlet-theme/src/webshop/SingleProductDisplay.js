import React from 'react'
import { useState, useEffect } from 'react';
import { connect, styled, Head } from "frontity"

let SingleProductDisplay = ( { theProduct } ) => {
  //data
  let prodTitle = theProduct.map(prod => prod.title).shift();
  let prodImg = theProduct.map(prod => prod.img).pop();
  // console.log(prodImg);
  let prodBrand = theProduct.map(prod => prod.brand).pop();
  let prodBrandLow = theProduct.map(prod => prod.brand.toLowerCase()).pop();
  let prodPrice = theProduct.map(prod => prod.price).pop();
  let prodSalePrice = theProduct.map(prod => prod.saleprice).pop();
  let prodSku = theProduct.map(prod => prod.sku);
  let prodGender = theProduct.map(prod => getGender(prod)).pop();
  //kategoriak
  let prodCat1 = theProduct.map(prod => prod.cat1).shift();
  let prodCat2 = theProduct.map(prod => prod.cat2).shift(); 

// Get product gender //
function getGender(val) {
  let title = val.title;
    if(title.includes("férfi")) return "Férfi";
    if(title.includes("női")) return "Női";
    if(title.includes("junior")) return "Junior";
    if(title.includes("gyerek")) return "Gyerek";
    else return "Unisex"
}
  // console.log(theProduct);

// CURRENCY STLYE CONVERTER
  function currencyConverter(number) {
    let priceSep = String(number).split("");
    let priceStr = priceSep.splice(priceSep.length - 3).join("");
    let finalPrice = priceSep.join("") + " " + priceStr + " Ft";
    // console.log(finalPrice);
    return finalPrice;
  }

// Slide
// const [current, setCurrent] = useState(0);


// Get image
const [imgData, setImgData] = useState([])
function setSource() {
  try{
      const src = `https://img.skioutlet.hu/product_images/${prodBrandLow}/${prodImg}.jpg`
      setImgData({ src });
  }
  catch(err){
      console.log("img doesnt exists");
  }
}
useEffect(() => {
  setSource();
}, [])


// const length = imgData.length;

//     const nextSlide = () => {
//         setCurrent(current === length - 1 ? 0 : current + 1);
//     };
//     const prevSlide = () => {
//         setCurrent(current === 0 ? length - 1 : current - 1)
//     }

// function collectImages() {
//   let first = checkImage(firstImg);
//   console.log(first);
//   let second = checkImage(secondImg);
//   let third = checkImage(thirdImg);
//   setImgData([first, second, third])
// }
// collectImages()
// console.log(imgData);


    // const nextSlide = () => {
    //     setCurrent(current === length - 1 ? 0 : current + 1);
    // };
    // const prevSlide = () => {
    //     setCurrent(current === 0 ? length - 1 : current - 1)
    // }

  return (
    <ProductContent>
        <Head>
          <title>{prodTitle} - Skioutlet</title>
        </Head>
        <img src={imgData.src} alt={prodImg}/>
        {/* {imgData.map((slide, index) => { 
          return (
            <div className={index === current ? "active" : ""} key={index}>
                    {index === current && (<img className='single-prod-img' src={slide} alt="" />)}                    
            </div>
          )
        })}
        {current > 0 ? <div onClick={prevSlide} className="arrows prev-arrow"><ion-icon name="arrow-back-circle-outline"></ion-icon></div> : null}
        {current < imgData.length - 1 ? <div onClick={nextSlide} className="arrows next-arrow"><ion-icon name="arrow-forward-circle-outline"></ion-icon></div> : null}
       */}
      <ProductDetailBox>
        <h2>{prodTitle}</h2>
        <SinglePriceTag>
          <h2>{currencyConverter(prodSalePrice)}</h2>
          {prodSalePrice === prodPrice ? null : <h2><SalePrice>{currencyConverter(prodPrice)}</SalePrice></h2>}
        </SinglePriceTag>
        {/* <p>{prodImg}</p> */}
        <SingleProductDetails>
          <ProductSizeList>
            <b>Készlet</b>
          {theProduct.map((prod, index) => 
            <SizeListColumn key={index}>
              {prod.size ? <Asd>{prod.size}</Asd> : null}
              <Dsa>{prod.stock} darab</Dsa>
            </SizeListColumn>
          )}
          </ProductSizeList>
          <div>
            <b>Kategóriák</b>
            <CatListColumn><Wsd>{prodCat1}, {prodBrand}, {prodGender}</Wsd></CatListColumn>
          </div>
        </SingleProductDetails>
        <ImportantInfo>Üzletünk nem webáruház, így termékeink kizárólag szaküzletünkben vásárolhatóak meg!</ImportantInfo>
        <ProdSub>Cikkszám: {prodSku.shift()}</ProdSub>
      </ProductDetailBox>
    </ProductContent>
  )
}

const ProductContent = styled.div`
  max-width: 900px;
  margin: 20px auto;
  
  display: flex;
  justify-content: space-between;
  gap: 15px;
  img {
    max-width: 350px;
    width: calc(100vw - 20px);
    @media (max-width: 600px) {
      max-width: 100%;
    }
  }
  @media (max-width: 600px) {
    flex-wrap: wrap;
    flex-direction: column;
  }
`
const ProductDetailBox = styled.div`
    background-color: rgb(239, 239, 239);
    padding: 15px;
    width: calc(100% - 30px);
    min-width: 280px;
    max-width: 600px;
    height: 100%;

    display: flex;
    flex-direction: column;
    gap: 15px;
    border-radius: 15px;
    p {
      margin: 0;
    }
    h2 {
      margin: 0;
      background-color: white;
      padding: 15px 20px;
      border-radius: 7px;
    }
    @media (max-width: 600px) {
      width: 100%;
    }
`
const SinglePriceTag = styled.div`
  background-color: #E93A3A;
  color: white;
  padding: 10px 15px;
  display: flex;
  align-items: center;
  gap: 15px;
  border-radius: 7px;
  h2 {
    background-color: #E93A3A;
    padding: 0;
  }
`
const SalePrice = styled.s`
  font-weight: lighter;
  color: rgb(233, 147, 147);
  transform: scale(0.5);
`;
const SingleProductDetails = styled.div`
  display: flex;
  gap: 15px;
`
const ProductSizeList = styled.div`
  padding: 0;
  margin: 0;
`
const SizeListColumn = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 2px 0;
  width: 160px;

  margin: 5px 0;
  background-color: white;
  border-radius: 7px; 
`
const Asd = styled.span`
  padding: 2px 7px;
  font-weight: 600;
`
const Dsa = styled.span`
  color: rgb(40, 146, 70);
  font-weight: 600;
  padding: 2px 7px;
  text-align: right;
`
const CatListColumn = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 10px;

  padding: 2px 0;
  width: 100%;

  margin: 5px 0;
  border-radius: 7px;
`
const Wsd = styled.span`
  font-weight: 600;
  color:#ED2123;
`
const ImportantInfo = styled.p`
  margin: 20px 0 !important;
  font-style: italic;
`
const ProdSub = styled.p`
  font-size: 12px;
`

export default SingleProductDisplay