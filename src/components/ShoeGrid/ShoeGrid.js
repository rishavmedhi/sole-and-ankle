import React from 'react';
import styled from 'styled-components/macro';

import SHOES from '../../data';
import ShoeCard from '../ShoeCard';

const ShoeGrid = () => {
  return (
    <Wrapper>
      {SHOES.map((shoe) => (
        <ShoeWrapper key={shoe.slug}>
          <ShoeCard {...shoe} />
        </ShoeWrapper>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 36px;
`;

/* using seaprate wrapper for the shoecard 
  this is to ensure the shoecard is isolated from changes w.r.t to the project
*/
const ShoeWrapper = styled.div`
  min-width: 275px;
  flex: 1;
`;

export default ShoeGrid;
