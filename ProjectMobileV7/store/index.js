import { configureStore } from '@reduxjs/toolkit';
import platforms from './slice/platform';
import newGames from './slice/newGames';
import genre from './slice/genre';
import platformImage from './slice/images/platforms';
import genreImage from './slice/images/genres';

export default configureStore({
  reducer: {
    platformList: platforms,
    newGames: newGames,
    // genreList: genre,
    // listPlatformsImage: platformImage,
    // listGenresImage: genreImage
  },
})