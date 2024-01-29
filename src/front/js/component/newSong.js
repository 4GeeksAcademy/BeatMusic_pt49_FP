import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link, useNavigate } from "react-router-dom";
import { Container, InputGroup, FormControl, Button, Row, Card, CardTitle } from "react-bootstrap";

const CLIENT_ID = '3859789f63b8461c86e0f453ebbecfd1'
const CLIENT_SECRET = '21d7f7f60938433eac36f6a0e5ff0de9'

const formatDuration = (duration) => {
  const minutes = Math.floor(duration / 60000);
  const seconds = ((duration % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds.padStart(2, '0')}`;

export const NewSong = () => {
  const { store, actions } = useContext(Context);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    //api acces token
    const authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
    };

    fetch('https://accounts.spotify.com/api/token', authParameters)
      .then(result => result.json())
      .then(data => setAccessToken(data.access_token))
      .catch(error => console.error('Error fetching access token:', error));
  }, []);

  //search
  const search = async () => {
    const searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    };

    try {
      const response = await fetch(`https://api.spotify.com/v1/search?q=${searchInput}&type=track,artist`, searchParameters);
      const data = await response.json();
      const trackIDs = data.tracks.items.map(item => item.id);

      const trackDetailsPromises = trackIDs.map(id => fetch(`https://api.spotify.com/v1/tracks/${id}`, searchParameters).then(response => response.json()));
      const trackDetails = await Promise.all(trackDetailsPromises);

      setSongs(trackDetails.map(track => ({
        trackName: track.name,
        trackLength: formatDuration(track.duration_ms),
      })));
    } catch (error) {
      console.error('Error fetching track details:', error);
    }
  };

  function sendData(e) {
    e.preventDefault();
    if (store.authAdmin == true) {
      actions.createSong(name, url);
      navigate("/admin/listsong");
    } else {
      alert('you need to be logged in');
    }
  }

  return (
    <div className="container mt-5">
      {store.authAdmin == false ? <Navigate to="/" /> : (
        <>
          <h1 className="text-center mt-3">Create new Song</h1>
          <div className="col-md-6">
            <form onSubmit={sendData}>
              <Container>
                <InputGroup className="mb-3" size="lg">
                  <FormControl placeholder="Search Song" type="input" onKeyDown={event => { if (event.key == "enter") { console.log("pressed enter") } }} onChange={(e) => setSearchInput(e.target.value)} />
                  <Button onClick={search}>Search</Button>
                </InputGroup>
              </Container>
              <Container>
                <Row className="mx-2 row row-cols-4">
                  {songs.map(({ trackName, trackLength }, i) => (
                    <Card key={i}>
                      <Card.Title>Length: {trackLength}</Card.Title>
                      <Card.Body>
                        <Card.Title>{trackName}</Card.Title>
                        <button onClick={() => { setName(trackName), setUrl(trackLength) }}>add</button>
                      </Card.Body>
                    </Card>
                  ))}
                </Row>
              </Container>
              <div className="mb-3">
                <label htmlFor="nameInput" className="form-label">Song Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="nameInput" aria-describedby="emailHelp" required />
              </div>
              <div className="mb-3">
                <label htmlFor="urlInput" className="form-label">Length</label>
                <input value={url} onChange={(e) => setUrl(e.target.value)} className="form-control" id="urlInput" required />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};