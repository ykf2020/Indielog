import React from "react";
import {
  FooterContainer,
  FooterLinksWrapper,
  FooterWrap,
  FooterLinksContainer,
  FooterLinkItems,
  FooterLinkTitle,
  FooterLink,
  SocialMedia,
  SocialMediaWrap,
  SocialLogo,
  WebsiteRights,
  SocialIcons,
  SocialIconLink,
} from "./FooterElements";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  const toggleHome = () => {
    window.scrollTo(0, 0);
  };
  return (
    <FooterContainer>
      <FooterWrap>
        <FooterLinksContainer>
          <FooterLinksWrapper>
            <FooterLinkItems>
              <FooterLinkTitle>關於我們</FooterLinkTitle>
              <FooterLink to="/">關於Indielog</FooterLink>
              <FooterLink to="/">最新消息</FooterLink>
              <FooterLink to="/">會員服務條款</FooterLink>
              <FooterLink to="/">免責聲明</FooterLink>
            </FooterLinkItems>
            <FooterLinkItems>
              <FooterLinkTitle>商務</FooterLinkTitle>
              <FooterLink to="/">相關產品與服務</FooterLink>
              <FooterLink to="/">異業合作</FooterLink>
              <FooterLink to="/">校園合作</FooterLink>
              <FooterLink to="/">合作媒體</FooterLink>
            </FooterLinkItems>
          </FooterLinksWrapper>
          <FooterLinksWrapper>
            <FooterLinkItems>
              <FooterLinkTitle>音樂人</FooterLinkTitle>
              <FooterLink to="/">音樂人指南</FooterLink>
              <FooterLink to="/">版權聲明</FooterLink>
              <FooterLink to="/">音檔規格說明</FooterLink>
              <FooterLink to="/">分潤機制</FooterLink>
            </FooterLinkItems>
            <FooterLinkItems>
              <FooterLinkTitle>其他</FooterLinkTitle>
              <FooterLink to="/">常見問題</FooterLink>
              <FooterLink to="/">幫助中心</FooterLink>
              <FooterLink to="/">人才招募</FooterLink>
              <FooterLink to="/">問題反應</FooterLink>
            </FooterLinkItems>
          </FooterLinksWrapper>
        </FooterLinksContainer>
        <SocialMedia>
          <SocialMediaWrap>
            <SocialLogo to="/" onClick={toggleHome}>
              Indielog
            </SocialLogo>
            <WebsiteRights>
              Indielog © {new Date().getFullYear()} All rights reserves.
            </WebsiteRights>
            <SocialIcons>
              <SocialIconLink href="/" target="_blank">
                <FaFacebook />
              </SocialIconLink>
              <SocialIconLink href="/" target="_blank">
                <FaInstagram />
              </SocialIconLink>
              <SocialIconLink href="/" target="_blank">
                <FaYoutube />
              </SocialIconLink>
              <SocialIconLink href="/" target="_blank">
                <FaTwitter />
              </SocialIconLink>
              <SocialIconLink href="/" target="_blank">
                <FaLinkedin />
              </SocialIconLink>
            </SocialIcons>
          </SocialMediaWrap>
        </SocialMedia>
      </FooterWrap>
    </FooterContainer>
  );
};

export default Footer;
