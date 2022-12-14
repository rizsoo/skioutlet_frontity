import React from 'react'
import Item from './Item'
import { connect, styled } from "frontity"

const ProductsMosaik = ({ sorting, filteredProducts, nextNum, size }) => {

  function renderSorting(val) {
    if(val === "name") {return filteredProducts.sort((a, b) => a.title > b.title ? 1 : -1)
    } else if(val === "priceHigh") {return filteredProducts.sort((a, b) => a.price > b.price ? 1 : -1)
    } else if(val === "priceLow") {return filteredProducts.sort((a, b) => a.price > b.price ? -1 : 1)
    } else return filteredProducts.sort((a, b) => a.title > b.title ? 1 : -1)
  }
  
  return (
        <ProductsList id="termekek">
            {filteredProducts.length > 0 ? 
            renderSorting(sorting).filter((item, i) => 
            i >= nextNum - 15 & i < nextNum).map((prod, index) => 
            <Item key={index} prod={prod} size={size} />) : <h2 className='sorry'>Nem található termék...</h2>}
        </ProductsList>
  )
}

const ProductsList = styled.section`
  max-width: 900px;
  display: flex;
  flex-wrap: wrap;
  gap: 35px;

  padding: 25px 0;
  margin: 0 auto;
`;

export default connect(ProductsMosaik)