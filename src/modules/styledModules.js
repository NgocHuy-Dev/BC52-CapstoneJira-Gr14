import styled from "@emotion/styled";

export const Item = styled.div`
  background-color: ${(props) => props.backgroundColor};
  box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px,
    rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  padding: 5px;
  padding: ${(props) => props.p};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  cursor: pointer;
  transition: all 0.5s;

  &:hover {
    background-color: #e829005e;
  }
`;
