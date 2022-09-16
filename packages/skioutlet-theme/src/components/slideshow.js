import React from 'react'
import { useState, useEffect } from "react";
import { connect, styled } from "frontity"
import Link from "@frontity/components/link"
import FeaturedMedia from "./featured_media";

const Slideshow = ({ state, libraries, data }) => {
    const Html2React = libraries.html2react.Component;
    const lengthN = data.items.filter(el => state.source[el.type][el.id].categories[0] === 137).map((item, index, arr) => { return arr }).length
    const [current, setCurrent] = useState(0);


    useEffect(() => {
      const timer = setTimeout(() => {
        setCurrent(current < lengthN - 1 ? current + 1 : 0)
      }, 5000);
      return () => clearTimeout(timer);
    }, [current]);
    // setTimeout(() => {setCurrent(current < lengthN - 1 ? current + 1 : 0)}, 5000);
    console.log(current);

  return (
    <Actions>
        {data.items.filter(el => state.source[el.type][el.id].categories[0] === 137).map((item, index, arr) => {
            const post = state.source[item.type][item.id];
            return(
                <Link key={item.id} link={post.link} style={{height: index === current ? "250px" : "0"}}>
                    {index === current && (<NewText>
                      <h3><Html2React html={post.title.rendered} /></h3>
                      <p><Html2React html={post.excerpt.rendered} /></p>
                    </NewText>)}
                    {index === current && (<FeaturedMedia id={post.featured_media} />)}
                </Link>
            )
        })}
        {/* <Arrowbox>
          <Arrow onClick={() => setCurrent(current === 0 ? lengthN - 1 : current - 1)} className="arrows prev-arrow"><ion-icon name="chevron-back-outline"></ion-icon></Arrow>
          <Arrow onClick={() => setCurrent(current === lengthN - 1 ? 0 : current + 1)} className="arrows next-arrow"><ion-icon name="chevron-forward-outline"></ion-icon></Arrow>
        </Arrowbox> */}
    </Actions>
  )
}

const Actions = styled.div`
    max-width: 880px;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    margin-bottom: 10px;
    
  & > a {
    @media (max-width: 600px) {
      height: 100% !important;
    }
    font-size: 1.2em;
    text-decoration: none;

    width: 100%;
    overflow: hidden;
    position: relative;
    background-color: transparent !important;

    img {
      object-fit: contain;
      object-position: -50%;
      @media (min-width: 600px) {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 0;
        z-index: 0;
      }
      @media (max-width: 600px) {
        display: none;
      }
    }
  }
`
const NewText = styled.div`
  @media (min-width: 600px) {
    position: absolute;
    bottom: 50%;
    transform: translateY(50%);
    left: 20px;
    z-index: 1;
    padding: 7px 16px 10px 16px;
  }
  padding: 10px 0;
  background-color: white;
  h3 {
    font-size: 25px;
    margin-bottom: 5px;
  }
  @media (max-width: 600px) {
    padding: 0 0 10px 0;
    h3 {
      font-size: 1.8em;
      padding: 15px;
    }
    p{
      padding: 0 7.5px;
    }
  }
  p {
    color: #ed2123;
    margin: 0 !important;
    font-size: 14px;
    font-weight: 600;
    @media (min-width: 600px) {
      text-align: center;
    }
  }
`
const Arrowbox = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  opacity: 0.5;
  z-index: 2;
  display: flex;
  gap: 1px;
  @media (max-width: 600px) {
    display: none;
  }
`
const Arrow = styled.div`
  width: 50px;
  text-align: center;
  background-color: white; 
`

export default connect(Slideshow)