
import cn from 'classnames';
import { useMediaQuery } from 'react-responsive';
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
import { SearchContainer } from './components/SearchPage/SearchContainer';
import { SearchItem } from './components/SearchPage/SearchItem';
import { SearchPage } from './components/SearchPage/SearchPage';
import { Voting } from './components/Voting/Voting';
import { useTypedSelector } from './hooks/redux';


function App() {

  const breeds = useTypedSelector(state => state.breedsRD.breeds)

  const location = useLocation()
  //console.log(location.pathname);


  const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' })
  const isMobile = useMediaQuery({ query: '(max-width: 499.98px)' })
  //console.log(isDesktop);


  return (
    <div className="appWrapper">
      <main className='workingPlace'>
        {isDesktop && <MainBlock />}
        {!isDesktop && location.pathname === '/home' && <MainBlock />}

        <div className={'content'}>
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
              <Route path='/search' element={<SearchContainer />} >
                <Route path='' element={<SearchPage />} />
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
