import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  const variantStyles = {
    "on-sale":{
      "background": "#C5295D",
      "text": "Sale"
    },
    "new-release": {
      "background": "#6868D9",
      "text": "Just Released!"
    },
    "default": {
      "background":"",
      "text": ""
    }
  };

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
          {variant === "on-sale" && <SalesTag>Sale</SalesTag>}
          {variant === "new-release" && <NewTag>Just Released!</NewTag>}
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price type={variant}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {variant=== 'on-sale' && 
             <SalePrice>{formatPrice(salePrice)}</SalePrice>
          }
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  text-decoration: ${props => props.type==="on-sale"?"line-through":undefined};
  color: ${props => props.type==="on-sale"? COLORS.gray[700] : undefined};
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

const VariantTag = styled.span`
  display: ${props => props.type==="default"?"none":"initial"};
  position: absolute;
  top: 12px;
  right: -4px;
  font-size: ${14/18}rem;
  background-color: var(--backgroundColor);
  color: ${COLORS.white};
  font-weight: ${WEIGHTS.bold};
  height: 32px;
  line-height: 32px;
  padding: 0 10px;
  border-radius: 2px;
`;

const SalesTag = styled(VariantTag)`
  background-color: ${COLORS.primary};
`;

const NewTag = styled(VariantTag)`
background-color: ${COLORS.secondary};
`

export default ShoeCard;
