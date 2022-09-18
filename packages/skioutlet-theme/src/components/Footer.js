import React from 'react'
import { connect, styled } from "frontity"
import Link from "@frontity/components/link"

const Footer = () => {
  return (
    <FooterFrame>
        <FooterContent>
            <Link link={"/versenyek"} >Versenyek</Link>
            <hr></hr>
            <Link link={"/adatkezelesi-tajekoztato"} >Adatkezelési tájékoztató</Link>
        </FooterContent>
    </FooterFrame>
  )
}
const FooterFrame = styled.div`
    width: 100%;
    background-color: #ed2123;
    
    @media (min-width: 600px) {
        margin-top: 15px;
      }
`
const FooterContent = styled.div`
    padding: 20px 10px;
    max-width: 900px;
    margin: auto;
    color: white;
    font-weight: bold;
    font-size: 1.2em;
    display: flex;
    flex-direction: column;
    gap: 10px;
    text-transform: uppercase;
    hr {
        color: white;
    }
    @media (max-width: 600px) {
        font-size: 1.8em;
        padding: 20px;
      }
`
export default connect(Footer)