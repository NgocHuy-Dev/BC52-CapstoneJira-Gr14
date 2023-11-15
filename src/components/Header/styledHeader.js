import styled from "@emotion/styled";

export const SigninAndSignup = styled.button`
  color:  #808080;
  cursor: pointer;
  display: flex;
  padding: 0px 8px;
  align-items: center;
  text-decoration: none;
  border: none;
  background-color: transparent;
  font-size: 17px;
  border-right: ${(props) => props.borderRight};
  transition: all 0.5s;

  &:hover {
    color: #3f2fd3;
  }
`;

export const SpanHeader = styled.span`
  margin-left: 5px;
`;
