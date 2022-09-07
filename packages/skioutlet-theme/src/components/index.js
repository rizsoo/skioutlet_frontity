import React from "react"
import { connect, Global, css, styled, Head } from "frontity"
import Link from "@frontity/components/link"
import Switch from "@frontity/components/switch"

import List from "./list"
import Post from "./post"
import Page from "./page"
import Loading from "./loading"
import Shop from "../webshop/Shop.js"
import Product from "../webshop/Product"
import Error from "./error"
import Header from "./Header"

const Root = ({ state }) => {
  const data = state.source.get(state.router.link)

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
        <title>Skioutlet</title>
        <link rel="canonical" href="http://mysite.com/example" />
        <meta name="Skioutlet sí szaküzlet" content="Magyarország első skioutlet áruháza. Személyre szabott kiszolgálás! Állandó akciók, garantált minőség. Síkabát, sínadrág, síléc, sícipő, bukósisak" />
        <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
        <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
      </Head>
      <Header />
      <Main>
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
        </Switch>
      </Main>
    </>
  )
}

const Main = styled.main`
  max-width: 900px;
  padding: 0 10px 10px 10px;
  margin: auto;

  img {
    max-width: 100%;
  }
  h2 {
    margin: 0.5em 0;
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
`;

export default connect(Root)