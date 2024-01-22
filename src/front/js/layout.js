import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

import { NewAlbum } from "./component/newAlbum";
import { EditAlbum } from "./component/editAlbum";
import { ListAlbum } from "./component/listAlbum";

import { Signup } from "./pages/signup";
import { Login } from "./pages/login";
import { Private } from "./pages/private";

import { NewArtist } from "./component/newArtist";
import { EditArtist } from "./component/editArtist";
import { ListArtist } from "./component/listArtist";

import { NewSong } from "./component/newSong";
import { EditSong } from "./component/editSong";
import { ListSong } from "./component/listSong";

import { Artists } from "./component/artists";


//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />

                        <Route element={<NewAlbum />} path="/admin/newalbum" />
                        <Route element={<EditAlbum />} path="/admin/editalbum/:album_id" />
                        <Route element={<ListAlbum />} path="/admin/listalbum" />

                        <Route element={<NewArtist />} path="/admin/newartist" />
                        <Route element={<EditArtist />} path="/admin/editartist/:artist_id" />
                        <Route element={<ListArtist />} path="/admin/listartist" />

                        <Route element={<Signup />} path="/signup" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Private />} path="/private" />
                        
                        <Route element={<NewSong />} path="/admin/newsong" />
                        <Route element={<EditSong />} path="/admin/editsong/:song_id" />
                        <Route element={<ListSong />} path="/admin/listsong" />

                        <Route element={<Artists />} path="/artists" />

                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);