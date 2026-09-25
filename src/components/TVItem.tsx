import styled from "styled-components";
import Show from "../assets/Show.png";
import Movie from "../assets/Movie.png";
import AppleTVData from "../data/AppleTV";
import Negative from "../assets/Negative.png";
import Positive from "../assets/Positive.png";
import { useState } from "react";
import PopUp from "./PopUp";
import MediaPopUp from "./MediaPopUp";
import SortingPopUp from "./SortingPopUp";

const Card = styled.div`
  width: 45%;
  background-color: #2a2a2a;
  height: 175px;
  border-radius: 10px;
  margin: 1em auto;
  display: flex;
  justify-content: space-between;
  @media (max-width: 1200px) {
    height: 300px;
    flex-direction: column;
  }
  @media (max-width: 800px) {
    width: 90%;
    margin: 1em auto;
  }
`;

const Image = styled.img`
  height: 100%;
  width: 350px;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 10px 0 0 10px;
  @media (max-width: 1200px) {
    width: 100%;
    height: 50%;
    border-radius: 10px 10px 0 0;
  }
`;

const Information = styled.div``;

const Name = styled.div`
  font-size: 1em;
  font-weight: bold;
  margin-top: 0px;
  padding-top: 0;
`;

const Length = styled.div`
  font-size: 0.9em;
`;

const Text = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
  width: 100%;
  color: white;
  @media (max-width: 1600px) {
    justify-content: left;
    flex-direction: column;
  }
`;

const Type = styled.div`
  display: flex;
  height: fit-content;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 1600px) {
    justify-content: left;
    flex-direction: row;
  }
`;

const Icon = styled.img`
  height: 20px;
`;

const P = styled.div`
  padding-left: 10px;
  color: white;
  font-size: 16px;
`;

const Progress = styled.div`
  width: 90%;
  margin: 0 auto;
  height: 30px;
  border-radius: 100px;
  display: flex;
  justify-content: space-between;
  @media (max-width: 1600px) {
    margin-top: 30px;
  }
  @media (max-width: 1400px) {
    justify-content: left;
    margin-top: 10px;
    display: block;
  }
  @media (max-width: 1200px) {
    justify-content: space-between;
    margin-top: 0;
    display: flex;
  }
`;

const MediaInformation = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const styles = {
  container: {
    height: "20px",
    width: "90%",
    backgroundColor: "#4a4a4a",
    borderRadius: "50px",
    overflow: "hidden",
    fontSize: "14px",
    marginTop: "5px",
    marginRight: "10px",
  },
  filler: {
    height: "100%",
    backgroundColor: "#FF8000",
    borderRadius: "inherit",
    transition: "width 0.2s ease-in",
  },
};

const TVGrid = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin: 0.25em auto;
  @media (max-width: 1200px) {
    margin: auto;
    justify-content: space-between;
  }
`;

const Input = styled.input`
  padding: 5px 20px;
  border-radius: 25px;
  border: none;
  font-size: 14px;
`;

const FilterWrap = styled.div`
  width: 95%;
  margin: 0 auto;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  padding: 5px 20px;
  border-radius: 25px;
  border: none;
  font-size: 14px;
  background-color: #2a2a2a;
  margin-right: 20px;
`;

const FilterButton = styled.div``;

const Progressbar = ({ percentage }: { percentage: number }) => {
  return (
    <div style={styles.container}>
      <div
        style={{
          ...styles.filler,
          width: `${percentage}%`,
          display: "flex",
          alignItems: "center",
          justifyContent: "left",
          paddingLeft: "10px",
          color: "white",
        }}
      >
        {`${percentage}%`}
      </div>
    </div>
  );
};

const CompletionStatus = ({ completion }: { completion: number }) => {
  if (completion > 0 && completion < 100) {
    return <Progressbar percentage={completion} />;
  } else if (completion === 100) {
    return (
      <Type>
        <Icon src={Positive}></Icon>
        <P>Completed</P>
      </Type>
    );
  } else {
    return (
      <Type>
        <Icon src={Negative}></Icon>
        <P>Not Started</P>
      </Type>
    );
  }
};

// const filters = (item<Object>) => {

//   return filters;
// };

const TVItem = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortMethod, setSortMethod] = useState("");

  // 3. Compute the filtered list on every render
  const filteredItems = AppleTVData.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()),
  ).sort((a, b) => a.title.localeCompare(b.title));

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isMediaPopupOpen, setIsMediaPopupOpen] = useState(false);
  const [isSortingPopupOpen, setIsSortingPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const [selectedMediaId, setSelectedMediaId] = useState<number | null>(null);

  const openMediaPopup = (mediaId: number) => {
    setSelectedMediaId(mediaId);
    setIsMediaPopupOpen(true);
  };

  const closeMediaPopup = () => {
    setIsMediaPopupOpen(false);
    setSelectedMediaId(null);
  };

  const openSortingPopup = () => {
    setIsSortingPopupOpen(true);
  };

  const closeSortingPopup = () => {
    setIsSortingPopupOpen(false);
  };

  return (
    <>
      <PopUp isOpen={isPopupOpen} onClose={closePopup} />
      <MediaPopUp
        isMediaOpen={isMediaPopupOpen}
        selectedMediaId={selectedMediaId}
        onCloseMedia={closeMediaPopup}
      />
      <SortingPopUp
        isSortingOpen={isSortingPopupOpen}
        onCloseSorting={closeSortingPopup}
      />
      <FilterWrap>
        <FilterButton>
          <Button onClick={() => openPopup()}>Filter</Button>
          <Button onClick={() => openSortingPopup()}>Sort</Button>
        </FilterButton>
        <Input
          type="text"
          placeholder="Search shows..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </FilterWrap>
      <TVGrid>
        {filteredItems.map((item) => (
          <Card>
            <Image src={item.image}></Image>
            <MediaInformation>
              <Text>
                <Information>
                  <Name>{item.title}</Name>
                  <Length>{item.length}</Length>
                </Information>
                {item.isShow ? (
                  <Type>
                    <Icon src={Show}></Icon>
                    <P>Show</P>
                  </Type>
                ) : (
                  <Type>
                    <Icon src={Movie}></Icon>
                    <P>Movie</P>
                  </Type>
                )}
              </Text>

              <Progress>
                <CompletionStatus
                  completion={
                    item.isShow
                      ? Number(
                          (
                            ((item.episodesComplete ?? 0) /
                              (item.episodes ?? 1)) *
                            100
                          ).toFixed(2),
                        )
                      : (item.completion ?? 0)
                  }
                />
                <P
                  style={{
                    paddingLeft: "0px",
                    paddingTop: "2px",
                    cursor: "pointer",
                  }}
                  onClick={() => openMediaPopup(item.id)}
                >
                  Update
                </P>
              </Progress>
            </MediaInformation>
          </Card>
        ))}
      </TVGrid>
    </>
  );
};

export default TVItem;
