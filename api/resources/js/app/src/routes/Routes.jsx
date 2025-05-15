import React from 'react'
import{Route, Routes} from 'react-router-dom'
import NotFound from '../views/NotFound'
import MusicoFormList from '../views/musico/MusicoFormList'
import MusicoFormShow from '../views/musico/MusicoFormShow'
import MusicoFormUpdate from '../views/musico/MusicoFormUpdate'
import MusicoFormStore from '../views/musico/MusicoFormStore'
import MusicoFormDestroy from '../views/musico/MusicoFormDestroy'
import InstrumentoFormList from '../views/instrumento/InstrumentoFormList'
import InstrumentoFormShow from '../views/instrumento/InstrumentoFormShow'
import InstrumentoFormUpdate from '../views/instrumento/InstrumentoFormUpdate'
import InstrumentoFormStore from '../views/instrumento/InstrumentoFormStore'
import InstrumentoFormDestroy from '../views/instrumento/InstrumentoFormDestroy'
import AlbumFormList from '../views/album/AlbumFormList'
import AlbumFormShow from '../views/album/AlbumFormShow'
import AlbumFormUpdate from '../views/album/AlbumFormUpdate'
import AlbumFormStore from '../views/album/AlbumFormStore'
import AlbumFormDestroy from '../views/album/AlbumFormDestroy'
import MusicaFormList from '../views/musica/MusicaFormList'
import MusicaFormShow from '../views/musica/MusicaFormShow'
import MusicaFormUpdate from '../views/musica/MusicaFormUpdate'
import MusicaFormStore from '../views/musica/MusicaFormStore'
import MusicaFormDestroy from '../views/musica/MusicaFormDestroy'
import MusicoInstrumentoFormList from '../views/MusicoInstrumento/MusicoInstrumentoFormList'
import MusicoInstrumentoFormShow from '../views/MusicoInstrumento/MusicoInstrumentoFormShow'
import MusicoInstrumentoFormStore from '../views/MusicoInstrumento/MusicoInstrumentoFormStore'
import MusicoInstrumentoFormUpdate from '../views/MusicoInstrumento/MusicoInstrumentoFormUpdate'
import MusicoInstrumentoFormDestroy from '../views/MusicoInstrumento/MusicoInstrumentoFormDestroy'
import MusicoAlbumFormList from '../views/MusicoAlbum/MusicoAlbumFormList'
import MusicoAlbumFormShow from '../views/MusicoAlbum/MusicoAlbumFormShow'
import MusicoAlbumFormStore from '../views/MusicoAlbum/MusicoAlbumFormStore'
import MusicoAlbumFormUpdate from '../views/MusicoAlbum/MusicoAlbumFormUpdate'
import MusicoAlbumFormDestroy from '../views/MusicoAlbum/MusicoAlbumFormDestroy'

const Rotas = () => {
  return (
    <Routes>

        <Route path='musico/index' element={<MusicoFormList />} />
        <Route path='musico/show/:id' element={<MusicoFormShow />} />
        <Route path='musico/update/:id' element={<MusicoFormUpdate />} />
        <Route path='musico/store' element={<MusicoFormStore />} />
        <Route path='musico/destroy/:id' element={<MusicoFormDestroy />} />

        <Route path='instrumento/index' element={<InstrumentoFormList />} />
        <Route path='instrumento/show/:id' element={<InstrumentoFormShow />} />
        <Route path='instrumento/update/:id' element={<InstrumentoFormUpdate />} />
        <Route path='instrumento/store' element={<InstrumentoFormStore />} />
        <Route path='instrumento/destroy/:id' element={<InstrumentoFormDestroy />} />

        <Route path='album/index' element={<AlbumFormList />} />
        <Route path='album/show/:id' element={<AlbumFormShow />} />
        <Route path='album/update/:id' element={<AlbumFormUpdate />} />
        <Route path='album/store' element={<AlbumFormStore />} />
        <Route path='album/destroy/:id' element={<AlbumFormDestroy />} />

        <Route path='musica/index' element={<MusicaFormList />} />
        <Route path='musica/show/:id' element={<MusicaFormShow />} />
        <Route path='musica/update/:id' element={<MusicaFormUpdate />} />
        <Route path='musica/store' element={<MusicaFormStore />} />
        <Route path='musica/destroy/:id' element={<MusicaFormDestroy />} />

        <Route path='musicoinstrumento/index' element={<MusicoInstrumentoFormList />} />
        <Route path='musicoinstrumento/show/:id' element={<MusicoInstrumentoFormShow />} />
        <Route path='musicoinstrumento/update/:id' element={<MusicoInstrumentoFormUpdate />} />
        <Route path='musicoinstrumento/store' element={<MusicoInstrumentoFormStore />} />
        <Route path='musicoinstrumento/destroy/:id' element={<MusicoInstrumentoFormDestroy />} />

        <Route path='musicoalbum/index' element={<MusicoAlbumFormList />} />
        <Route path='musicoalbum/show/:id' element={<MusicoAlbumFormShow />} />
        <Route path='musicoalbum/store' element={<MusicoAlbumFormStore />} />
        <Route path='musicoalbum/update/:id' element={<MusicoAlbumFormUpdate />} />
        <Route path='musicoalbum/destroy/:id' element={<MusicoAlbumFormDestroy />} />


        <Route path="*" element={<NotFound/>}/>



    </Routes>
  )
}

export default Rotas;