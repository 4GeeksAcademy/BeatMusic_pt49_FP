import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link, useNavigate } from "react-router-dom";
import { Container, InputGroup, FormControl, Button, Row, Card, CardTitle, CardImg } from "react-bootstrap";

const CLIENT_ID = '3859789f63b8461c86e0f453ebbecfd1';
const CLIENT_SECRET = '21d7f7f60938433eac36f6a0e5ff0de9';

export const NewAlbum = () => {
    const { store, actions } = useContext(Context);
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        //api acces token
        const authParameters = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
        };

        fetch('https://accounts.spotify.com/api/token', authParameters)
            .then(result => result.json())
            .then(data => setAccessToken(data.access_token));
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
            const response = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=album', searchParameters);
            const data = await response.json();
            const albumIDs = data.albums.items.map(item => item.id);

            const albumDetailsPromises = albumIDs.map(id => fetch('https://api.spotify.com/v1/albums/' + id, searchParameters).then(response => response.json()));
            const albumDetails = await Promise.all(albumDetailsPromises);

            setAlbums(albumDetails.map(album => ({
                albumName: album.name,
                albumImageURL: album.images && album.images.length > 0 ? album.images[0].url : null,
                artistName: album.artists && album.artists.length > 0 ? album.artists[0].name : null,
            })));
        } catch (error) {
            console.error('Error fetching album details:', error);
        }
    }

    function sendData(e) {
        e.preventDefault();
        if (store.authAdmin == true) {
            actions.createAlbum(name, url);
            navigate(`/admin/listalbum`, { replace: true });
        } else {
            alert('you need to be loged in ');
        }
    }

    return (
        <div className="container mt-5">
            {store.authAdmin == false ? <Navigate to="/" /> : (
                <>
                    <h1 className="text-center my-4 link-green">Create new Album</h1>
                    <div className="col-auto">
                        <form onSubmit={sendData}>
                            <Container>
                                <h3 className="text-white my-3">Search for an album on Spotify</h3>
                                <InputGroup className="mb-3" size="lg">
                                    <FormControl placeholder="Search Album" type="input" onKeyDown={event => { if (event.key == "enter") { console.log("pressed enter") } }} onChange={(e) => setSearchInput(e.target.value)} />
                                    <Button onClick={search}>Search</Button>
                                </InputGroup>
                            </Container>
                            <Container>
                                <Row className="mx-2 row row-cols-4">
                                    {albums.map(({ albumName, artistName, albumImageURL }, i) => (
                                        <Card key={i}>
                                            <Card.Img src={albumImageURL} />
                                            <Card.Body>
                                                <Card.Title>{albumName}</Card.Title>
                                                <button className="btn btn-success btn-green" onClick={() => { setName(albumName), setUrl(albumImageURL) }}>add</button>
                                            </Card.Body>
                                        </Card>
                                    ))}
                                </Row>
                            </Container>
                            <h3 className="text-white my-3">Or introduce it manually</h3>
                            <div className="mb-3">
                                <label htmlFor="nameInput" className="form-label text-white">Album Name</label>
                                <input value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="nameInput" aria-describedby="emailHelp" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="urlInput" className="form-label text-white">Image URL</label>
                                <input value={url} onChange={(e) => setUrl(e.target.value)} className="form-control" id="urlInput" required />
                            </div>
                            <button type="submit" className="btn text-white btn-green">Submit</button>
                        </form>
                    </div>
                </>
            )}
        </div>
    );
};