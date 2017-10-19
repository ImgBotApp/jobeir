// @flow
import React from 'react';
import styled from 'styled-components';
import { media } from '../../../styles/breakpoints';

const featuredJobs = [
  {
    externalLink: 'https://stripe.com/jobs/positions/frontend-engineer',
    title: 'Frontend Engineer',
    subtitle: 'Stripe in San Francisco, United States',
    description:
      'As Stripe looks beyond the API, we are hiring engineers to help build beautiful, usable interfaces for businesses building on top of Stripe.',
    image: {
      src: '/public/static/imgs/home/stripe-office.jpg',
      alt: ''
    },
    companyIcon: {
      src: '/public/static/imgs/home/stripe-logo-icon.png',
      alt: ''
    }
  },
  {
    externalLink:
      'https://medium.com/@JobsAtMedium/senior-product-manager-3232b4f97803',
    title: 'Senior Product Manager',
    subtitle: 'Medium in New York, United States',
    description:
      'We are looking for creative and operational thinkers that are fueled by an entrepreneurial spirit to join our tight-knit group of product managers.',
    image: {
      src: '/public/static/imgs/home/medium-office.jpg',
      alt: ''
    },
    companyIcon: {
      src: '/public/static/imgs/home/medium-logo-icon.png',
      alt: ''
    }
  },
  {
    externalLink: 'https://www.shopify.com/careers/product-designer-947b38',
    title: 'Product Designer',
    subtitle: 'Shopify in Berlin, Germany',
    description:
      'As a designer you will work on a product used by anyone from small fashion boutiques, global brands or even international product suppliers and fulfillment centres.',
    image: {
      src: '/public/static/imgs/home/shopify-office.jpg',
      alt: ''
    },
    companyIcon: {
      src: '/public/static/imgs/home/shopify-logo-icon.png',
      alt: ''
    }
  }
];

const HomeFeatured = () => (
  <HomeFeaturedContainer>
    <HomeFeaturedHeader>
      <HomeFeaturedHeading>Featured jobs</HomeFeaturedHeading>
    </HomeFeaturedHeader>
    {featuredJobs.map(job => (
      <FeaturedJobLink
        href={`${job.externalLink}?ref=jobeir`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FeaturedJobContainer>
          <FeaturedJobImageContainer>
            <FeaturedJobImage src={job.image.src} alt={job.image.alt} />
          </FeaturedJobImageContainer>
          <FeaturedJobTextContainer>
            <div>
              <FeaturedJobTitle>{job.title}</FeaturedJobTitle>
              <FeaturedJobSubtitle>{job.subtitle}</FeaturedJobSubtitle>
              <FeaturedJobDescription>{job.description}</FeaturedJobDescription>
            </div>
            <FeaturedJobCompanyIcon
              src={job.companyIcon.src}
              alt={job.companyIcon.alt}
            />
          </FeaturedJobTextContainer>
        </FeaturedJobContainer>
      </FeaturedJobLink>
    ))}
  </HomeFeaturedContainer>
);

export default HomeFeatured;

const HomeFeaturedContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 100px 0 10px;
  background: linear-gradient(#f9f8f7 82%, #fff);

  ${media.desktop`
    padding: 50px 24px 10px;
  `};
`;

const HomeFeaturedHeader = styled.div`
  max-width: 960px;
  border-bottom: 1px solid #d9d9d9;
  margin: 0 auto 100px;

  ${media.phonePlus`
    margin: 0 auto 70px;
  `};
`;

const HomeFeaturedHeading = styled.h4`
  position: relative;
  bottom: -1px;
  font-size: 20px;
  font-weight: 400;
  display: inline-block;
  padding-bottom: 10px;
  border-bottom: 1px solid ${props => props.theme.colors.black};
`;

const FeaturedJobContainer = styled.div`
  display: flex;
  max-width: 960px;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  margin: 0 auto 100px;
  padding: 30px;

  ${media.dablet`
    flex-direction: column;
  `};

  ${media.phonePlus`
    margin-bottom: 70px;
  `};
`;

const FeaturedJobLink = styled.a`
  position: relative;
  text-decoration: none;
`;

const FeaturedJobTitle = styled.h2`
  font-size: 28px;
  font-weight: 900;
  margin-bottom: 8px;
  color: ${props => props.theme.colors.black};

  ${media.phablet`
    font-size: 26px;
    margin-bottom: 12px;
  `};
`;

const FeaturedJobSubtitle = styled.p`
  margin-bottom: 20px;
  color: ${props => props.theme.colors.grey.mid};
`;

const FeaturedJobDescription = styled.p`
  line-height: 1.6;
  color: ${props => props.theme.colors.black};

  ${media.phablet`
    margin-bottom: 20px;
  `};
`;

const FeaturedJobTextContainer = styled.div`
  display: flex;
  margin-left: 30px;

  ${media.dablet`
    margin: 0 auto;
  `};

  ${media.phablet`
    flex-direction: column;
  `};
`;

const FeaturedJobImageContainer = styled.div`
  position: relative;
  min-width: 375px;
  height: 190px;

  ${media.dablet`
    width: 100%;
  `};

  ${media.phonePlus`
    min-width: auto;
  `};
`;

const FeaturedJobImage = styled.img`
  position: absolute;
  width: 375px;
  top: -60px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);

  ${media.dablet`
    left: 0;
    top: -90px;
  `};

  ${media.phonePlus`
    width: 130%;
    top: -70px;
    left: -15%
  `};
`;

const FeaturedJobCompanyIcon = styled.img`
  height: 48px;
  min-width: 48px;
  border-radius: 50%;
  overflow: hidden;

  ${media.phablet`
    width: 48px;
  `};
`;
