import { useRef, useState } from 'react'
import "@tensorflow/tfjs";
// Register WebGL backend.
import "@tensorflow/tfjs-backend-webgl";
import "@mediapipe/face_mesh";
import Webcam from 'react-webcam'
import { runDetector } from './utils/detector';

import './App.css'

// Add thư viện => Done
// Import thư viện => Done
// Setup webcam and canvas => Done
// Define references to webcam and canvas => Done

const inputResolution = {
  width: 840,
  height: 844,
};

function App() {
  // Setup webcam and canvas
  const webcamRef = useRef(null)
  const canvasRef = useRef(null)
  const [loaded, setLoaded] = useState(false)

  // Load facemesh
  const handleVideoLoad = (videoNode: any) => {
    const video = videoNode.target;
    if (video.readyState !== 4) return;
    if (loaded) return;
    runDetector(video, canvasRef.current);
    setLoaded(true);
  };

  return (
    <div className='App'>
      <div className='App-header'>
        <Webcam
          ref={webcamRef}
          width={inputResolution.width}
          height={inputResolution.height}
          videoConstraints={{
            width: 840,
            height: 844,
            facingMode: 'user',
          }}
          onLoadedData={handleVideoLoad}
          className="absolute mx-auto left-0 right-0 z-[9]"
        />
        <canvas
          ref={canvasRef}
          width={inputResolution.width}
          height={inputResolution.height}
          style={{ position: "absolute", zIndex: 10 }}
        />
      </div>
    </div>
  )
}

export default App
