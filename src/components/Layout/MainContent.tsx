import {Navbar} from "./Navbar";
import styled from "@emotion/styled";

export const MainContent: React.FC<any> = ({children}) => {
  return (
    <Root>
      <Body>{children}</Body>
      <Footer>
        <Navbar />
      </Footer>
    </Root>
  );
};

const Root = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #ffffff;
`;

const Body = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Footer = styled.div`
  flex: 0;
  border-top: solid 1px var(--adm-border-color);
`;
