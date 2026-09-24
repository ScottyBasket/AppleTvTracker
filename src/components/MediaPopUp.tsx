import styled from "styled-components";
import ExitBlue from "../assets/negative.png";
import { useEffect } from "react";
import { useState } from "react";
import AppleTVData from "../data/AppleTV";

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
  height: 250px;
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
  flex-direction: row;
`;

const Right = styled.div`
  width: 10%;
  display: flex;
  flex-direction: column;
  position: relative;
  height: 250px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 10px;
  border: none;
  position: relative;
  margin-top: 175px;
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

const Li = styled.li`
  list-style-type: none;
  padding-bottom: 5px;
`;

const Image = styled.img`
  width: fit-content;
  height: 200px;
  border-radius: 15px;
  margin-right: 20px;
`;

const H3 = styled.h3`
  padding-bottom: 7px;
`;

const Input = styled.input`
  margin-right: 10px;
`;

const HStack = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0;
  margin: 0;
`;

const VStack = styled.div`
  display: flex;
  flex-direction: column;
`;

const NumberInput = styled.input`
  margin: 5px 0;
  padding: 5px 2px;
`;

const TextInput = styled.input`
  margin: 5px 0;
  padding: 5px 2px;
`;

const Label = styled.label`
  margin: 5px 0;
  padding-right: 15px;
  font-size: 14px;
`;

type MediaPopUpProps = {
  isMediaOpen: boolean;
  selectedMediaId: number | null;
  onCloseMedia: () => void;
  isSortingOpen: boolean;
  onCloseSorting: () => void;
};

const PopUp = ({
  isMediaOpen,
  onCloseMedia,
  selectedMediaId,
}: MediaPopUpProps) => {
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (isMediaOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMediaOpen]);

  if (!isMediaOpen || selectedMediaId === null) {
    return null;
  }

  const selectedMedia = AppleTVData.find(
    (media) => media.id === selectedMediaId,
  );

  if (!selectedMedia) {
    return null;
  }

  return (
    <Wrap>
      <CenterModule>
        <Left>
          <Image src={selectedMedia.image} />
          {editMode ? (
            <ul>
              <H3>{selectedMedia.title}</H3>
              {selectedMedia.isShow ? (
                <VStack>
                  <HStack>
                    <Label htmlFor="movie-filter">
                      <Input
                        id="movie-filter"
                        type="checkbox"
                        name="movie"
                        value="movie"
                        checked={!selectedMedia.isShow}
                      />
                      Movie
                    </Label>
                    <Label htmlFor="show-filter">
                      <Input
                        id="show-filter"
                        type="checkbox"
                        name="show"
                        value="show"
                        checked={selectedMedia.isShow}
                      />
                      Show
                    </Label>
                  </HStack>
                  <TextInput
                    type="text"
                    id="length"
                    name="length"
                    placeholder={selectedMedia.length}
                  ></TextInput>

                  <NumberInput
                    type="text"
                    id="episodes"
                    name="episodes"
                    placeholder={selectedMedia.episodes}
                  ></NumberInput>
                  <NumberInput
                    type="number"
                    id="episodesComplete"
                    name="episodesComplete"
                    placeholder={selectedMedia.episodesComplete}
                  ></NumberInput>
                </VStack>
              ) : (
                <>
                  <Li>Movie</Li>
                  <Li>{selectedMedia.length}</Li>
                  <Li>
                    {selectedMedia.completion ? "Finished" : "Not Started"}
                  </Li>
                </>
              )}
            </ul>
          ) : (
            <ul>
              <H3>{selectedMedia.title}</H3>
              {selectedMedia.isShow ? (
                <>
                  <Li>Show</Li>
                  <Li>{selectedMedia.length}</Li>
                  <Li>Episodes: {selectedMedia.episodes}</Li>
                  <Li>Episodes Finished: {selectedMedia.episodesComplete}</Li>
                </>
              ) : (
                <>
                  <Li>Movie</Li>
                  <Li>{selectedMedia.length}</Li>
                  <Li>
                    {selectedMedia.completion ? "Finished" : "Not Started"}
                  </Li>
                </>
              )}
            </ul>
          )}
        </Left>
        <Right>
          <Quit src={ExitBlue} onClick={onCloseMedia}></Quit>
          {editMode ? (
            <Button onClick={() => setEditMode(false)}>Save</Button>
          ) : (
            <Button onClick={() => setEditMode(true)}>Edit</Button>
          )}
        </Right>
      </CenterModule>
    </Wrap>
  );
};

export default PopUp;
