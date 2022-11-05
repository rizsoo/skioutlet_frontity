import React from "react"
import { connect, Global, css, styled, Head } from "frontity"
import Link from "@frontity/components/link"
import Switch from "@frontity/components/switch"
import { useState, useEffect } from "react"

import List from "./list"
import Post from "./post"
import Page from "./page"
import Loading from "./loading"
import Shop from "../webshop/Shop.js"
import Product from "../webshop/Product"
import Error from "./error"
import Header from "./Header"
import Footer from "./Footer"
import Versenyek from "./versenyek"

const Root = ({ state }) => {
  const data = state.source.get(state.router.link)
  // console.log(data);
  const [isShopPage, setIsShopPage] = useState(data.isShop)
  const [isHomepage, setIsHomepage] = useState(state.router.link === "/" ? true : false)
  const [postData, setPostData] = useState(data)
  const [metaTitle, setMetaTitle] = useState("");

  function isMetaGood() {
    state.menu.map(el => {
      el[1] === url ? setMetaTitle(`- ${el[0]}`) : null
    })
  }

  useEffect(() => {
    setIsShopPage(data.isShop)
    setIsHomepage(state.router.link === "/" ? true : false)
    isMetaGood()
    setPostData(data)
  }, [state.router.link])

  const url = data.link;
  const location = state.router.link;
  console.log(state.router.link);

  return (
    <>
      <Global
        styles={css`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          html {
            font-family: system-ui, Verdana, Arial, sans-serif;
          }
          a {
            text-decoration: none;
            color: inherit;
          }
          h1 {
            color: inherit;
          }
          button {
            border: none;
          } 
        `}
      />
      <Head>
        <title>Skioutlet {metaTitle}</title>
        <link rel="canonical" href="http://mysite.com/example" />
        <meta name="Skioutlet sí szaküzlet" content="Magyarország első skioutlet áruháza. Személyre szabott kiszolgálás! Állandó akciók, garantált minőség. Síkabát, sínadrág, síléc, sícipő, bukósisak" />
        <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
        <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
      </Head>
      <Header />
      <Main isShopPage={isShopPage} isHomepage={isHomepage} postData={postData} location={location}>
        <Switch>
          <Loading when={data.isFetching} />
          <Error when={data.isError} />
          <List when={data.isArchive} />
          <Post when={data.isPost} />
          <Page when={data.isPage} />
          <Shop when={data.isShop} />
          <Shop when={data.isPagination} />
          <Shop when={data.isSearch} />
          <Product when={data.isItem} />
          <Versenyek when={data.isRace} />
        </Switch>
      </Main>
      <Footer />
    </>
  )
}

const Main = styled.main`
  max-width: 900px;
  padding: 0 10px 10px 10px;
  margin: auto;
  min-height: 50vh;
  
  img {
    max-width: 100%;
  }
  h2 {
    margin: 0.5em 0;
    color: black;
  }
  h3 {
    color: black;
  }
  p {
    line-height: 1.25em;
    margin-bottom: 0.75em;
  }
  figcaption {
    color: #828282;
    font-size: 0.8em;
    margin-bottom: 1em;
  }
  iframe {
    width: calc(100vw - 40px);
    max-width: 400px;
    max-height: 250px;
  }
  a {
    color: ${(props) => (props.postData.isPostType ? "#ed2123" : "inherit")};
  }
  .wp-block-buttons {
    background color: #ed2123;
  }
  @media (max-width: 600px) {
    padding: 0 20px 20px 20px;
    background-color: ${(props) => (props.isHomepage ? "#ed2123" : props.location.includes("shop") && !props.location.includes("termek") ? "#f1f1f1" : "white")};
  }
`;

export default connect(Root)
