import React from "react"
import { connect, styled } from "frontity"
import { useState } from "react";
import Link from "@frontity/components/link"
import dayjs from "dayjs"
import FeaturedMedia from "./featured_media";
import Slideshow from './slideshow'

const List = ({ state, libraries }) => {
  const data = state.source.get(state.router.link)

  const Html2React = libraries.html2react.Component;

  return (
    <>
      <Slideshow data={data} />
      {/* <Actions>
    {data.items.filter(el => state.source[el.type][el.id].categories[0] === 137).map((item, index, arr) => {
      const post = state.source[item.type][item.id];
      return (
        <Link key={item.id} link={post.link} >
          <NewText>
           <h3><Html2React html={post.title.rendered} /></h3>
           <p><Html2React html={post.excerpt.rendered} /></p>
          </NewText>
          <FeaturedMedia id={post.featured_media} />
        </Link>
      )
    })}
    </Actions> */}
      <h1>Oldalunk fejlesztés alatt! A <Link style={{color: "red"}} link="shop">termékeket</Link> addig is elérhetőek és naprakészek. </h1>
      <p>NYITÁS: AUGUSZTUS 30. SZEPTEMBERI NYITVATARTÁSUNK: SZERDA ÉS CSÜTÖRTÖK 11 – 18 ÓRA. </p>
      <NewsItem>
        {data.items.filter(el => state.source[el.type][el.id].categories[0] === 6).slice(0, 3).map((item) => {
          const post = state.source[item.type][item.id]
          const formattedDate = dayjs(post.date).format("YYYY.MM.DD.")
          return (
            <Link key={item.id} link={post.link} >
              <FeaturedMedia id={post.featured_media} />
              <PostText>
                <h3><Html2React html={post.title.rendered} /></h3>
                <p><Html2React html={post.excerpt.rendered} /></p>
                <i>Posted <Html2React html={formattedDate} /></i>
              </PostText>
            </Link>
          )
        })}
      </NewsItem>
    </>
  )
}
// const Actions = styled.div`
//     max-width: 880px;
//     margin: 0 0 6px 0;

//     display: flex;
//     gap: 10px;
//     flex-wrap: wrap;

//   & > a {
//     display: block;
//     font-size: 1.2em;
//     text-decoration: none;

//     width: 100%;
//     height: 220px;
//     overflow: hidden;
//     position: relative;
//     background-color: transparent !important;
//     margin-bottom: 5px;

//     img {
//       position: absolute;
//       top: 50%;
//       transform: translateY(-50%);
//       left: 0;
//       z-index: 0;
//       object-position: -50%;
//     }
//   }
// `
// const NewText = styled.div`
//   position: absolute;
//   bottom: 50%;
//   transform: translateY(50%);
//   left: 20px;
//   z-index: 1;
//   background-color: white;
//   padding: 7px 16px 10px 16px;
//   h3 {
//     font-size: 25px;
//     margin-bottom: 5px;
//   }
//   p {
//     color: #ed2123;
//     margin: 0 !important;
//     font-size: 14px;
//     font-weight: 600;
//     text-align: center;
//   }
//`
const Title = styled.h2`
  background-color: #f1f1f1;
  font-weight: 100;
  padding: 6px;
  margin: 0 0 10px 0 !important;
  font-weight: 300;
  letter-spacing: 1.1px;

  @media (max-width: 600px) {
    color: white;
    font-size: 1.7em;
    background-color: transparent;
    padding: 0;
    font-weight: 700;
  }
`
const NewsItem = styled.div`
    max-width: 880px;
    margin: 6px 0;

    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    @media (max-width: 600px) {
      flex-direction: column;
      gap: 20px;
    }
  & > a {
    display: block;
    font-size: 1.2em;
    text-decoration: none;

    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    color: black;
    width: calc((100% - 20px) / 3);
    background-color: white;
    position: relative;
    h3 {
      margin-bottom: 5px;
      font-size: 1.2em;
      line-height: 1.2;
    }
    p {
      font-size: 0.9em;
      word-break: break-word;
      line-height: 1.2;
      margin-bottom: 30px;
    }
    i {
      font-size: 10px;
      color: grey;
      position: absolute;
      bottom: 10px;
    }
    @media (min-width: 600px) {
      img {
        object-fit: cover;
        height: 50%;
      }
    }
    @media (max-width: 600px) {
      width: 100%;
      h3 {
        font-size: 1.7em;
      }
      p {
        font-size: 1em;
      }
    }
  }
`
const PostText = styled.div`
  padding: 5px 10px 10px 10px;
`

export default connect(List)