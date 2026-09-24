import styled from "styled-components";
import ExitBlue from "../assets/negative.png";
import { useEffect } from "react";

const Wrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 999;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CenterModule = styled.div`
  width: 50vw;
  background-color: black;
  border-radius: 27px;
  display: flex;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding: 1.5em;
`;

const Left = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
`;

const MovieShowFilter = styled.div`
  margin: 0 1em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const FilterTypes = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const Right = styled.div`
  width: 10%;
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
`;

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 10px;
  border: none;
  position: relative;
  margin-top: 100%;
`;

const Quit = styled.img`
  position: absolute;
  right: 0px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  @media (max-width: 800px) {
    display: none;
  }
`;

const Input = styled.input`
  padding: 1em 0;
`;

const H3 = styled.h3``;

type PopUpProps = {
  isOpen: boolean;
  onClose: () => void;
};

const PopUp = ({ isOpen, onClose }: PopUpProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <Wrap>
      <CenterModule>
        <Left>
          <FilterTypes>
            <MovieShowFilter>
              <H3>Media Type</H3>
              <label
                htmlFor="movie-filter"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "white",
                }}
              >
                <Input
                  id="movie-filter"
                  type="checkbox"
                  name="movie"
                  value="movie"
                />
                Movie
              </label>
              <label
                htmlFor="show-filter"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "white",
                }}
              >
                <Input
                  id="show-filter"
                  type="checkbox"
                  name="show"
                  value="show"
                />
                show
              </label>
            </MovieShowFilter>
            <MovieShowFilter>
              <H3>Progress</H3>
              <label
                htmlFor="not-started"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "white",
                }}
              >
                <Input
                  id="not-started"
                  type="checkbox"
                  name="not-started"
                  value="not-started"
                />
                Not Started
              </label>
              <label
                htmlFor="in-progress"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "white",
                }}
              >
                <Input
                  id="in-progress"
                  type="checkbox"
                  name="in-progress"
                  value="in-progress"
                />
                In Progress
              </label>
              <label
                htmlFor="finished"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "white",
                }}
              >
                <Input
                  id="finished"
                  type="checkbox"
                  name="finished"
                  value="finished"
                />
                Finished
              </label>
            </MovieShowFilter>
          </FilterTypes>
        </Left>
        <Right>
          <Quit src={ExitBlue} onClick={onClose}></Quit>
          <Button>Submit</Button>
        </Right>
      </CenterModule>
    </Wrap>
  );
};

export default PopUp;
