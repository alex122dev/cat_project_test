
import cn from 'classnames';
//import { useMediaQuery } from 'react-responsive';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import './App.scss';
import { Breeds } from './components/Breeds/Breeds';
import { BreedsContainer } from './components/Breeds/BreedsContainer';
import { BreedsPage } from './components/Breeds/BreedsPage';
import { SelectedBreed } from './components/Breeds/SelectedBreed/SelectedBreed';
import { Dislikes } from './components/Dislikes/Dislikes';
import { Favourites } from './components/Favourites/Favourites';
import { Gallery } from './components/Gallery/Gallery';
import { Home } from './components/Home/Home';
import { InteractionBlock } from './components/InteractionBlock/InteractionBlock';
import { Likes } from './components/Likes/Likes';
import { MainBlock } from './components/MainBlock/MainBlock';
import { SearchPage } from './components/SearchPage/SearchPage';
import { SearchItem } from './components/SearchPage/SearchItem';
import { SearchContainer } from './components/SearchPage/SearchContainer';
import { Voting } from './components/Voting/Voting';
import { useTypedSelector } from './hooks/redux';
import { useMatchMedia } from './hooks/useMatchMedia';


function App() {

  const location = useLocation()
  //console.log(location.pathname);

  const { isDesktop } = useMatchMedia()

  return (
    <div className="appWrapper">
      <main className='workingPlace'>
        {isDesktop && <MainBlock />}
        {!isDesktop && location.pathname === '/home' && <MainBlock />}

        <div className={cn('content', { 'hidden': location.pathname === '/home' && !isDesktop })} >
          {location.pathname !== '/home' && <InteractionBlock />}
          <div className='body'>
            <Routes>
              <Route path='/home' element={isDesktop && <Home />} />
              <Route path='/voting' element={<Voting />} />
              <Route path='/breeds' element={<BreedsPage />}>
                <Route path='' element={<BreedsContainer />} />
                <Route path=':breedId' element={<SelectedBreed />} />
              </Route>
              <Route path='/gallery' element={<Gallery />} />
              <Route path='/search' element={<SearchPage />} >
                <Route path='' element={<SearchContainer />} />
                <Route path=':searchId' element={<SearchItem />} />
              </Route>
              <Route path='/favourites' element={<Favourites />} />
              <Route path='/likes' element={<Likes />} />
              <Route path='/dislikes' element={<Dislikes />} />
              <Route path='/' element={<Navigate to='/home' />} />
            </Routes>
          </div>
        </div>
      </main>

    </div>
  );
}

export default App;
