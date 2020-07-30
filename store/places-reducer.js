import { ADD_PLACE, SET_PLACES } from "./places-actions";
import Place from "../models/place";

const initialState = {
  places: [],
  userPlaces: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PLACES:
      console.log("action is " + action.places);
      return {
        places: action.places,
        // places: action.places.map(
        //   (pl) =>
        //     new Place(
        //       pl.id,
        //       pl.ownerID,
        //       pl.title,
        //       pl.imageUri,
        //       pl.address,
        //       pl.lat,
        //       pl.lng
        //     )
        // ),
        userPlaces: action.userPlaces,
      };
    case ADD_PLACE:
      const newPlace = new Place(
        action.placeData.id,
        action.placeData.ownerID,
        action.placeData.title,
        action.placeData.image,
        action.placeData.address,
        action.placeData.coords.lat,
        action.placeData.coords.lng
      );
      return {
        places: state.places.concat(newPlace),
        userPlaces: state.userPlaces.concat(newPlace),
      };
    default:
      return state;
  }
};
