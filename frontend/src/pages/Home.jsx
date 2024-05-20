import styled from "styled-components";
import {Sidebar} from "../components/Sidebar";
export function Home() {
  //Ahora rendereamos las pantallas con el sidebar incluido, usamos un wrapper en page container para que lo pueda mostrar de lado
  return (
    <div>
      <PageContainer>
        <Sidebar/>
        <Container>
          <h1>Home Page</h1>
        </Container>
      </PageContainer>
    </div>
  );
}

const Container =styled.div`
  height:100vh;
`

const PageContainer = styled.div`
  display: flex;
  height: 100vh;
`;