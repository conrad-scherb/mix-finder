import React, { useState } from 'react';
import './App.css';
import FindMixContainer from './components/FindMixContainer';
import Header from './components/Header';
import TrackSelectionContainer from './components/TrackSelectionContainer';

function App() {
  const [trackOneURL, setTrackOneURL] = useState<string | undefined>(undefined);
  const [trackTwoURL, setTrackTwoURL] = useState<string | undefined>(undefined);

  return (
    <>
      <Header/>
      <TrackSelectionContainer
        updateTrackOneURL={(trackURL: string | undefined) => setTrackOneURL(trackURL)} 
        updateTrackTwoURL={(trackURL: string | undefined) => setTrackTwoURL(trackURL)} />
      <FindMixContainer trackOneURL={trackOneURL} trackTwoURL={trackTwoURL}/>
    </>
  );
}

export default App;
