import styled from "@emotion/styled";

export const Error = styled.p`
  color: #d32f2f;
  font-size: 13px;
`;

export const TextTitle = styled.h3`
  color: ${(props) => props.color};
  font-size: ${(props) => props.fs};
  font-weight: ${(props) => props.fw};
  margin: ${(props) => props.m};
  padding: ${(props) => props.p};
  text-overflow: ${(props) => props.textOverflow};
  overflow: ${(props) => props.overflow};
  white-space: ${(props) => props.whiteSpace};
  display: ${(props) => props.display};
`;

export const TextFooter = styled.a`
color:#9e9e9e;
font-size: ${(props) => props.fs};
  font-weight: ${(props) => props.fw};
  margin: ${(props) => props.m};
  padding: ${(props) => props.p};
  text-decoration: ${(props)=> props.textdecoration};
  transition: all 0.7s;
  &:hover{
    color :#fff;
  }

`