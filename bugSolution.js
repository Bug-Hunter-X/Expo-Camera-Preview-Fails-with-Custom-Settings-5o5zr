import * as React from 'react';
import { Camera, useCameraDevicesAsync } from 'expo-camera';
import { useEffect, useState } from 'react';

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null);
  const [devices, setDevices] = useState(null);
  const [cameraError, setCameraError] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
      const devices = await useCameraDevicesAsync();
      setDevices(devices);
    })();
  }, []);
  
  useEffect(() => {
    if (devices) {
       setCamera(devices.find(d => d.type === type) )
    }
  },[devices])

  const handleCameraError = (error) => {
    console.error('Camera Error:', error);
    setCameraError(error);
  };

  if (hasPermission === null) {
    return <View />; 
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  if (cameraError) {
    // Try to restart the camera or show an error message
    return <Text>Camera Error: {cameraError.message}</Text>;
  }

  return (
    <Camera style={{ flex: 1 }} type={type} errorHandler={handleCameraError} ref={ref => setCamera(ref)}>
    </Camera>
  );
};

export default CameraScreen;