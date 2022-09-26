import React from 'react'
import { connect, styled } from "frontity"
import Link from "@frontity/components/link"
import { useState } from 'react'
import { isMobile } from 'react-device-detect';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  function handleRefresch() {
      window.location.reload(false);
        }

  return (
    <div>
        <Banner>
            <Link link="/"><img src="https://wp.skioutlet.hu/wp-content/uploads/2022/06/skioutlet_logo_2020.png" /></Link>
            <Link link="https://g.page/skioutlet?share" target="_blank">
              <div>
                <ion-icon name="location-outline" /><h2>1027 Budapest, Margit körút 46.</h2>
              </div>              
            </Link>
        </Banner>          
        <Navigator>
            <Navbar>
            {isMobile ? 
                <MobileHeader>
                  <Link link="/"><MobileBanner>skioutlet.hu</MobileBanner></Link>
                  <CloseMenu onClick={() => setIsMenuOpen(!isMenuOpen)}><ion-icon name="menu-outline"></ion-icon></CloseMenu>
                </MobileHeader>
              : null}
              {isMobile && !isMenuOpen ? null : <Menu onClick={() => setIsMenuOpen(false)}>
                <Link link="/">Főoldal</Link>
                <Link link="/shop" onClick={handleRefresch}>Termékek</Link>
                <Link link="/rolunk">Rólunk</Link>
                <Link link="/kapcsolat">Kapcsolat</Link>
              </Menu>}
              {isMobile && !isMenuOpen ? null : <Socialicons onClick={() => setIsMenuOpen(false)}>
                <Link target="_blank" link="https://www.facebook.com/skioutletstore"><ion-icon name="logo-facebook"></ion-icon></Link>
                <Link target="_blank" link="https://www.instagram.com/skioutletbudapest"><ion-icon name="logo-instagram"></ion-icon></Link>
                <Link target="_blank" link="https://www.youtube.com/user/skioutlet"><ion-icon name="logo-youtube"></ion-icon></Link>
              </Socialicons>}
            </Navbar>
        </Navigator>
    </div>
  )
}
const MobileBanner = styled.h3`
  font-size: 3em !important;
`
const MobileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100vw - 30px);
`
const Banner = styled.div`
  @media (max-width: 600px) {
    display: none;
  }
  max-width: 900px;
  margin: auto;
  padding: 10px;
  img {
    width: 90%;
    max-width: 800px;
    margin: 20px 0 5px 0px;
  }
  div {
    display: flex;
    align-items: center;
  }
  ion-icon {
    color: #b41a1d;
    --ionicon-stroke-width: 40px;
    font-size: 24px;
  }
`;
const Navigator = styled.div`
  background-color: #ed2123;
  width: 100%;
  
`;
const Navbar = styled.div`
  max-width: 900px; 
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin: 0 auto;
  @media (max-width: 600px) {
    flex-wrap: wrap;
    flex-direction: column;
    align-items: end;
    padding: 10px;
  }
  ion-icon {
    color: white;
    font-size: 30px;
    cursor: pointer;
  }
  
`;
const Socialicons = styled.div`
  display: flex;
  gap: 10px;
  padding: 0 10px;
`;
const Menu = styled.nav`
  background-color: #ed2123;
  display: flex;
  
  padding: 10px;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.3px;
  & > a {
    margin-right: 1em;
    color: white;
    text-decoration: none;
  }
  & : hover {
    background-color: black;
  }
  @media (max-width: 600px) {
    flex-direction: column;
    text-align: right;
    & > a {
      font-size: 1.8em;
      margin: 0;
      margin-bottom: 5px;
    }
  }
`;
const CloseMenu = styled.div`
  @media (max-width: 600px) {
    ion-icon {
      padding: 5px;
      font-size: 3.5em;
    }
  }
`

export default connect(Header)