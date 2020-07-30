import * as FileSystem from "expo-file-system";

import Product from "../models/place";
import { insertPlace, fetchPlaces } from "../helpers/db";
import ENV from "../env";

export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACES";

export const addPlace = (title, image, location) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    console.log("auth token is " + token);
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${ENV.googleApiKey}`
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const resData = await response.json();
    if (!resData.results) {
      throw new Error("Something went wrong!");
    }

    const address = resData.results[0].formatted_address;

    const fileName = image;

    console.log("ho hoo" + fileName);
    // const newPath = FileSystem.documentDirectory + fileName;

    // try {
    //   await FileSystem.moveAsync({
    //     from: image,
    //     to: newPath,
    //   });
    //   const dbResult = await insertPlace(
    //     title,
    //     newPath,
    //     address,
    //     location.lat,
    //     location.lng
    //   );
    //   console.log(dbResult);
    ////////////////////fetch server//////////////////////
    //const token = getState().auth.token;
    const responseTwo = await fetch(
      `https://hackathon-9c653.firebaseio.com/places.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          image,
          address,
          coords: {
            lat: location.lat,
            lng: location.lng,
          },
          ownerID: userId,
        }),
      }
    );

    const resDataTwo = await responseTwo.json();
    //////////////////////////////////////////////////
    dispatch({
      type: ADD_PLACE,
      placeData: {
        // id: dbResult.insertId,
        id: resDataTwo.name,
        title: title,
        image: fileName,
        address: address,
        coords: {
          lat: location.lat,
          lng: location.lng,
        },
        ownerID: userId,
      },
    });
    // } catch (err) {
    //   console.log(err);
    //   throw err;
    // }
  };
};

export const loadPlaces = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    console.log("userId is " + userId);

    try {
      const response = await fetch(
        `https://hackathon-9c653.firebaseio.com/places.json`
      );
      const resData = await response.json(); //fetching from server
      console.log(resData);
      const loadedProducts = [];
      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            resData[key].ownerID,
            resData[key].title,
            resData[key].image,
            resData[key].address,
            resData[key].coords.lat,
            resData[key].coords.lng
          )
        );
      }
      console.log("this is loaded products");

      // var heh = loadedProducts.map((o) => o.ownerID);
      // console.log(heh);
      console.log("///////////////////////////////////////////////////");
      console.log("filtered products are");
      console.log(userId);
      // const hehe = loadedProducts.filter((item) => item.ownerID === userId);
      // console.log(hehe);

      // const dbResult = await fetchPlaces();//fetching from local DB
      // console.log(dbResult);
      dispatch({
        type: SET_PLACES,
        places: loadedProducts,
        // mapRegion.region
        // .filter((item) => item.title == "Fire")
        userPlaces: loadedProducts.filter((prod) => prod.ownerId == userId),
        //userPlaces: loadedProducts,
      });
    } catch (err) {
      throw err;
    }
  };
};
