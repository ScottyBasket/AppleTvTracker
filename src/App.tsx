import "./App.css";
import styled from "styled-components";
import TVItem from "./components/TVItem";

const Wrap = styled.div`
  width: 90%;
  margin: 0 5%;
`;

function App() {
  return (
    <Wrap>
      <TVItem />
    </Wrap>
  );
}

export default App;
