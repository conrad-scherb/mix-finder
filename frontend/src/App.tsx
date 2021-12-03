import { Track } from '1001-tracklists-scraper';
import axios from 'axios';
import React, { useState } from 'react';
import './App.css';
import FindMixContainer from './components/FindMixContainer';
import Header from './components/Header';
import SingleTrackSearch from './components/SingleTrackSearch';


function App() {
  const [trackOneURL, setTrackOneURL] = useState<string | undefined>(undefined);
  const [trackTwoURL, setTrackTwoURL] = useState<string | undefined>(undefined);
  const [tracksArray, setTracksArray] = useState<Track[]>([]);

  async function findMix(url: string): Promise<void> {
    const response = await axios.post("http://localhost:7373/get-adjacent-details", {id: url})
    console.log(response)
    setTracksArray(response.data);
  }

  return (
    <>
      <Header/>
      <SingleTrackSearch updateTrackURL={setTrackOneURL} tracksArray={tracksArray}/>
      <FindMixContainer trackOneURL={trackOneURL} trackTwoURL={trackTwoURL} findMix={findMix}/>
    </>
  );
}

export default App;
