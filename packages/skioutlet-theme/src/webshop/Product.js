import React from 'react'
import { useState, useEffect } from 'react';

import Papa from 'papaparse';
import SingleProductDisplay from './SingleProductDisplay';
import { connect, styled } from "frontity"

import Loading from '../components/loading';

import arrayMergeByKey from 'array-merge-by-key';

function Product({ state }) {
  const res = state.source.get(state.router.link)

  const [imgData, setImgData] = useState([])
  const [webarlista, setWebarlista] = useState([])

  const [theProduct, setTheProduct] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  const url = res.id;

  function getIMGData() {
    fetch("https://wp.skioutlet.hu/wp-content/uploads/2022/09/keresokod_utf8.csv")
      .then(res => res.url)
      .then((response) => {
        Papa.parse(response, {
          skipEmptyLines: true,
          encoding: "UTF-8",
          download: true,
          dynamicTyping: true,
          header: true,
        transformHeader: function(h, i) {
          let header = [ "sku", "img" ]
          h = header[i]
          // console.log(h);
          return h
        },
        complete: function(results) {
          let data = results.data;
          setImgData(data)
        }})
      })
  }
//  function getData() {
//     fetch("https://wp.skioutlet.hu/wp-content/uploads/2022/09/webarlista_rita8.csv")
//       .then(res => res.url)
//       .then((response) => {
//         Papa.parse(response, {
//           encoding: "UTF-8",
//           download: true,
//           dynamicTyping: true,
//           header: true,
//           transformHeader: function(h, i) {
//             let header = [ "sku", "title", "brand", "web", "cat1", "cat2", "price", "saleprice", "isonsale", "stock", "size", "img" ]
//             h = header[i]
//             // console.log(h);
//             return h
//           },
//           complete: function(results) {
//             // let header = "sku;title;brand;;cat1;cat2;price;saleprice;isonsale;stock;size;img";
//             //     let res = results.data.map(line => {
//             //       let imgData = String(line[0]).split("#").slice(0, 2).join("_");
//             //       let newLine = line.join(";") + ";" + imgData
//             //       let endpoint = header.split(";") + "\n" + newLine.split(";"); 
//             //       let result = Papa.parse(endpoint, {header: true})
//             //       return result.data[0]
//             //     })

//             // console.log(url);
//             setTheProduct(results.data.filter(el => String(el.img).toLowerCase() === url && el.stock > 0))
//             setIsLoaded(true)
//           }
//         }) 
//       })
//     }
    function getData2() {
      fetch("https://wp.skioutlet.hu/wp-content/uploads/2022/09/webarlista_utf8.csv")
        .then(res => res.url)
        .then((response) => {
          Papa.parse(response, {
            skipEmptyLines: true,
            delimiter: "\t",
            encoding: "UTF-8",
            download: true,
            dynamicTyping: true,
            header: true,
          transformHeader: function(h, i) {
            let header = [ "sku", "title", "brand", "web", "cat1", "cat2", "price", "saleprice", "isonsale", "stock", "size" ]
            h = header[i]
            // console.log(h);
            return h
          },
          complete: function(results) {
            console.log(results.data);
            let data = results.data.filter(prod => Number(prod.stock.split(",").shift()) > 0);
            setWebarlista(data);
            setIsLoaded(true)
          }
          }) 
        })
    }   

// console.log(webarlista);
// console.log(imgData);

    useEffect(() => {
      // getData()
      getData2()
      getIMGData()
    }, [])

    let result = arrayMergeByKey("sku", imgData, webarlista).filter(el => String(el.img).toLowerCase() === url ? el : null)

  return (
    <div>
      {isLoaded ? <SingleProductDisplay result={result} theProduct={theProduct} /> :  <Loading/>}
    </div>
  )
}

export default connect(Product);