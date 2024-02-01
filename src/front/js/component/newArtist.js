import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link, useNavigate } from "react-router-dom";
import { Container, InputGroup, FormControl, Button, Row, Card, CardTitle, CardImg } from "react-bootstrap";

const CLIENT_ID = '3859789f63b8461c86e0f453ebbecfd1';
const CLIENT_SECRET = '21d7f7f60938433eac36f6a0e5ff0de9';

export const NewArtist = () => {
    const { store, actions } = useContext(Context);
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        //api acces token
        var authParameters = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
        }

        fetch('https://accounts.spotify.com/api/token', authParameters)
            .then(result => result.json())
            .then(data => setAccessToken(data.access_token))
    }, []);

    //search
    const search = async () => {
        var searchParameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        }

        try {
            var artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', searchParameters)
                .then(response => response.json())
                .then(data => data.artists.items.map(item => item.id))

            var artistDetails = await Promise.all(artistID.map(id => fetch('https://api.spotify.com/v1/artists/' + id, searchParameters).then(response => response.json())))
                .then(artists => artists.map(artist => {
                    var artistName = artist.name;
                    var artistImageURL = artist.images && artist.images.length > 0 ? artist.images[0].url : null;

                    console.log('Nombre del artista:', artistName);
                    console.log('URL de la imagen del artista:', artistImageURL);

                    return { artistName, artistImageURL }
                }))

            setAlbums(artistDetails);
        } catch (error) {
            console.error('Error fetching artist details:', error);
        }
    }

    function sendData(e) {
        e.preventDefault();
        if (store.authAdmin == true) {
            actions.createArtist(name, url);
            navigate("/admin/listartist");
        } else {
            alert('you need to be loged in ');
        }
    }

    return (
        <div className="container mt-3">
            {store.authAdmin == false ? <Navigate to="/" /> : (
                <>
                    <h1 className="text-center my-4 link-green">Create new Artist</h1>
                    <div className="col-auto">
                        <form onSubmit={sendData}>
                            <Container>
                                <h3 className="text-white my-3">Search for an artist on Spotify</h3>
                                <InputGroup className="mb-3" size="lg">
                                    <FormControl placeholder="Search Album" type="input" onKeyDown={event => { if (event.key == "enter") { console.log("pressed enter") } }} onChange={(e) => setSearchInput(e.target.value)} />
                                    <Button onClick={search}>Search</Button>
                                </InputGroup>
                            </Container>
                            <Container>
                                <Row className="mx-2 row row-cols-6">
                                    {albums.map(({ artistName, artistImageURL }, i) => (
                                        <Card key={i}>
                                            <Card.Img src={artistImageURL} />
                                            <Card.Body>
                                                <Card.Title>{artistName}</Card.Title>
                                                <button className="btn btn-success btn-green" onClick={() => { setName(artistName), setUrl(artistImageURL) }}>Add</button>
                                            </Card.Body>
                                        </Card>
                                    ))}
                                </Row>
                            </Container>
                            <h3 className="text-white my-3">Or introduce it manually</h3>
                            <div className="my-3">
                                <label htmlFor="nameInput" className="form-label text-white">Artist Name</label>
                                <input value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="nameInput" aria-describedby="emailHelp" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="urlInput" className="form-label text-white">Image URL</label>
                                <input value={url} onChange={(e) => setUrl(e.target.value)} className="form-control" id="urlInput" />
                            </div>
                            <button type="submit" className="btn text-white btn-green">Submit</button>
                        </form>
                    </div>
                </>
            )}
        </div>
    );
};