import React from "react";
import styled from "styled-components/macro";

function ResponsiveGraphContainer(props) {
  const StyledResponsiveGraphContainer = styled.div`
    min-height: ${(props.size ? props.size : 1) * 300}px;
    @media screen and (min-width: 600px) {
      min-height: ${(props.size ? props.size : 1) * 400}px;
    }
    @media screen and (min-width: 800px) {
      min-height: ${(props.size ? props.size : 1) * 500}px;
    }
  `;

  return (
    <StyledResponsiveGraphContainer>
      {props.children}
    </StyledResponsiveGraphContainer>
  );
}

export default ResponsiveGraphContainer;