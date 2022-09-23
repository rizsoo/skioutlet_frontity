import React from "react"
import { connect, styled } from "frontity"
import Link from "@frontity/components/link"
import FeaturedMedia from "./featured_media"
import { useEffect } from 'react'
import dayjs from "dayjs"

const Versenyek = ({ state, libraries, actions }) => {
  useEffect(() => {
    actions.source.fetch("/");
  }, []);

  const res = Object.values(state.source.post);

  // const data = state.source.get("/");
  const Html2React = libraries.html2react.Component;
  
  return (
    <>
      <VTitle>Következő verseny</VTitle>
      <CurrentRace>
        {res.filter(el => el.categories.includes(954)).sort((a, b) => dayjs(a.date) > dayjs(b.date) ? -1 : 1).map((item) => {
          const post = state.source[item.type][item.id]
          return (
              <CurrentRaceItem key={item.id}>
                  <FeaturedMedia id={post.featured_media} />
                  <VItemText>
                  <Link key={item.id} link={post.link}><EventTitle><Html2React html={post.title.rendered} /></EventTitle></Link>
                  <Html2React html={post.excerpt.rendered} />
                  </VItemText>                
              </CurrentRaceItem>
          )
        })}
      </CurrentRace>
        <hr></hr>
      <VTitle>Eddigi versenyeink</VTitle>
      <VItems>
        {res.filter(el => el.categories.includes(131) && !el.categories.includes(954)).sort((a, b) => dayjs(a.date) > dayjs(b.date) ? -1 : 1).map((item) => {
          const post = state.source[item.type][item.id]
          return (
              <VItem key={item.id}>
                  <FeaturedMedia id={post.featured_media} />
                  <VItemText>
                  <Link key={item.id} link={post.link}><EventTitle><Html2React html={post.title.rendered} /></EventTitle></Link>
                  {/* <Html2React html={post.excerpt.rendered} /> */}
                  </VItemText>                
              </VItem>
          )
        })}
      </VItems>
      </>
  )
}
const CurrentRace = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  max-width: 100rem;
  h4 {
    color: #242424;
  }
  p {
    font-size: 14px;
    color: black;
  }
  @media (max-width: 800px) {
    flex-direction: column;
  }
`
const CurrentRaceItem = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: row-reverse;
  margin: 18px 0;
  font-size: 1.2em;
  color: steelblue;
  text-decoration: none;
  box-sizing: border-box;
  border-radius: 8px;

  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    img {
        min-height: 180px !important;
        object-fit: cover;
  }
  ion-icon {
    color: #6d6d6d;
    font-size: 18px;
  }
  @media (max-width: 800px) {
    flex-direction: column;
    img {
      max-height: 110px !important;
    }
  }
  @media (min-width: 800px) {
    height: 200px;
    width: 100%;
    img {
        max-width: 450px;
        width: 100%;
      }
  }
`
const VTitle = styled.h4`
  display: block;
  text-transform: uppercase;
  text-align: left;
  width: 100%;
  font-size: 1.3em;
  margin: 15px 0;

`
const VItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  max-width: 100rem;
  h4 {
    color: #242424;
  }
  p {
    font-size: 14px;
    color: black;
  }
  @media (max-width: 800px) {
    flex-direction: column;
  }
`
const VItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border-radius: 8px;
  margin: 0;
  font-size: 1.2em;
  color: steelblue;
  text-decoration: none;
  box-sizing: border-box;
  
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  img {
    min-width: 100%;
    min-height: 180px !important;
    object-fit: cover;
  }
  ion-icon {
    color: #6d6d6d;
    font-size: 18px;
  }
  @media (max-width: 800px) {
    img {
      max-height: 110px !important;
    }
  }
  @media (min-width: 800px) {
    height: 300px;
    width: calc(100% / 4 - 12px);
  }
`
const VItemText = styled.div`
  width: 100%;
  padding: 13px;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  gap: 10px;
  height: 100%;
  background-color: white;

  position: relative;
`
const EventTitle = styled.h4`
  font-size: 1.3rem;
  font-weight: 700;
  line-height: 1.138888889;
  &:hover {
    text-decoration: underline;
    text-decoration-thickness: 3px;
  }
`

export default connect(Versenyek)