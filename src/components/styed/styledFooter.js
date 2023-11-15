import styled from "@emotion/styled";

export const LogoFooter = styled.a`
  display: ${(props) => props.display};
  align-items: ${(props) => props.alignItems};
  color: "white";
  text-decoration: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  color: rgba(7, 7, 7, 0.11);
  margin-top: 20px;
  cursor: pointer;
  transition: all 0.5s;

  &:hover {
    filter: grayscale(80%);
    color: #ffffff;
  }
`;