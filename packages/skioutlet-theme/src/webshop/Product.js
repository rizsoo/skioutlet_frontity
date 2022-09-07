import React from 'react'
import { useState, useEffect } from 'react';

import Papa from 'papaparse';
import SingleProductDisplay from './SingleProductDisplay';
import { connect, styled } from "frontity"

import Loading from '../components/loading';

function Product({ state }) {
  const res = state.source.get(state.router.link)
  
  const [theProduct, setTheProduct] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  const url = res.id;

 function getData() {
    fetch("http://skioutlet.hu/wp-content/uploads/webarlista_t3.csv")
      .then(res => res.url)
      .then((response) => {
        Papa.parse(response, {
          encoding: "UTF-8",
          download: true,
          dynamicTyping: true,
          header: false,
          complete: function(results) {
            let header = "sku;title;brand;;cat1;cat2;price;saleprice;isonsale;stock;size;img";
                let res = results.data.map(line => {
                  let imgData = String(line[0]).split("#").slice(0, 2).join("_");
                  let newLine = line.join(";") + ";" + imgData
                  let endpoint = header.split(";") + "\n" + newLine.split(";"); 
                  let result = Papa.parse(endpoint, {header: true})
                  return result.data[0]
                })
            
            setTheProduct(res.filter(el => el.img == url && el.stock > 0))
            setIsLoaded(true)
          }
        }) 
      })
    }

    useEffect(() => {
      getData()
    }, [])

  // console.log(theProduct);

  return (
    <div>
      {isLoaded ? <SingleProductDisplay theProduct={theProduct} /> :  <Loading/>}
    </div>
  )
}

export default connect(Product);