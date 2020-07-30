import React from "react";
import {StyleSheet,Text, View,Switch,TouchableOpacity,Image} from "react-native";
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import  LocationData from './MapView';
//import { RNS3 } from "react-native-aws3";

export default class MyCamera extends React.Component {

  

  state = {
    
    switchValue: true,
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    imageuri: "",
    url: ""
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
    
  }
  
  cameraChange = () => {
    
    this.setState({
      imageuri: "",
      url: "",
      type:
        this.state.type === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back
    });
  };

  snap = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
      if (photo) {
        
        this.setState({ imageuri: photo.uri });
        
      }
    }
  };

  upload = () => {
    const file = {
      uri: this.state.imageuri,
      name: `${new Date().getTime()}.jpg`,
      //Location: LocationData().text,
      type: "image/jpeg"
    };
    const options = {
      keyPrefix: "ts/",
      bucket: "..name..",
      region: "eu-west-1",
      accessKey: "..acesskey..",
      secretKey: "..secretkey..",
      successActionStatus: 201
    };
    return RNS3.put(file, options)
      .then(response => {
        if (response.status !== 201)
          throw new Error("Failed to upload image to S3");
        else {
          console.log(
            "Successfully uploaded image to s3. s3 bucket url: ",
            response.body.postResponse.location
          );
          this.setState({
            url: response.body.postResponse.location,
            switchValue: false
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return (
        <View>
          <Text>No access to camera</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
         
          {this.state.switchValue ? (
            <View style={styles.cameraview}>
              {this.state.imageuri != "" ? (
                <Image
                  source={{
                    uri: this.state.imageuri
                  }}
                  style={styles.uploadedImage}
                  resizeMode="contain"
                />
              ) : (
                <Camera
                  style={styles.camera}
                  type={this.state.type}
                  ref={ref => {
                    this.camera = ref;
                  }}
                >
                  <View style={styles.camerabuttonview}>
                    <TouchableOpacity
                      style={styles.cameraButtons1}
                      onPress={this.cameraChange}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          marginBottom: 11,
                          color: "white"
                          
                        }}
                      >
                        Flip
                      </Text>
                    </TouchableOpacity>
                  </View>
                </Camera>
              )}
            </View>
          ) : (
            <View style={styles.cameraview}>
              {this.state.url != "" ? (
                <Text>Uploaded url : {this.state.url}</Text>
              ) : null}
              <Text>Camera on</Text>
            </View>
          )}
          {this.state.switchValue ? (
            <View style={styles.buttonsView}>
              {this.state.imageuri == "" ? (
                <View style={styles.captureButtonView}>
                  <TouchableOpacity
                    style={styles.cameraButtons}
                    onPress={this.snap}
                  >
                    <Text
                      style={{ fontSize: 18, marginBottom: 1, color: "black"  }}
                    >
                      Capture
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : null}
              <View style={styles.captureButtonView}>
                <TouchableOpacity
                  style={styles.cameraButtons}
                  onPress={this.upload}
                >
                  <Text
                    style={{ fontSize: 18, marginBottom: 1, color: "black", }}
                  >
                    Upload
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white", //#1dd1a1",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  /**
  switchview: {
    //marginTop: 30,
    backgroundColor: "white",
    padding: 50,
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 5
  },
switch: {
    padding: 5
  },**/
  cameraview: {

    height: "60%",
    marginTop:30,
    width: "95%",
    backgroundColor: "#1dd1a1",
    borderRadius: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  camera: {
    height: "95%",
    width: "95%",
    backgroundColor: "white",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  camerabuttonview: {
    height: "100%",
    backgroundColor: "transparent",
  
    
  },
  cameraButtons: {
    borderColor: "blue",
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
    margin: 5
  },
  cameraButtons1: {
    borderColor: "yellow",
    borderWidth: 2,
    padding: 10,
    borderRadius: 50,
    margin: 2
  },
  captureButtonView: {
    height: 100
  },
  buttonsView: {
    height: 100,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center"
  },
  uploadedImage: {
    height: "95%",
    width: "95%",
    padding: 10
  }
});