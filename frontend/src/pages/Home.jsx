import styled from "styled-components";
import {Sidebar} from "../components/Sidebar";
export function Home() {
  return (
    <div>
      <Sidebar/>
      <Container>
        <h1>Home Page</h1>
      </Container>
    </div>
  );
}
const Container =styled.div`
  height:100vh;
`