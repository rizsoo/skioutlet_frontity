import React from "react"
import { connect, styled, Head } from "frontity"
import dayjs from "dayjs"

const Post = ({ state, libraries }) => {
  const data = state.source.get(state.router.link)
  const post = state.source[data.type][data.id]

  const Html2React = libraries.html2react.Component;

  const formattedDate = dayjs(post.date).format("YYYY.MM.DD.")

  return (
    <PostContent>
        <Head>
          <title>{post.title.rendered}</title>
          <meta name="Skioutlet sí szaküzlet" content={post.excerpt.rendered} />
        </Head>
        <PostInfo>
          Posted {formattedDate}
        </PostInfo>
        <h2>{post.title.rendered}</h2>
        <Html2React html={post.content.rendered} />
    </PostContent>
  )
}
const PostContent = styled.div`
`

const PostInfo = styled.div`
  background-image: linear-gradient(to right, #f4f4f4, #fff);
  margin: 1em 0;
  padding: 0.5em;
  border-left: 4px solid #ed2123;
  font-size: 0.8em;
  & > p {
    margin: 0;
  }
`

export default connect(Post)