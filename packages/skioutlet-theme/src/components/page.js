import React from "react"
import { connect, styled } from "frontity"

const Page = ({ state, libraries }) => {
  const data = state.source.get(state.router.link)
  const page = state.source[data.type][data.id]

  const Html2React = libraries.html2react.Component

  return (
    <div>
      <PageTitle>{page.title.rendered}</PageTitle>
      <Html2React html={page.content.rendered} />
    </div>
  )
}

const PageTitle = styled.h2`
    background-color: #f1f1f1;
    padding: 10px;
    font-weight: lighter;
`

export default connect(Page)