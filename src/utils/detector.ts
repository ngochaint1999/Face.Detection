/* eslint-disable @typescript-eslint/no-explicit-any */
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import { drawMesh } from "./drawMesh";
export const runDetector = async (video: any, canvas: any) => {
  const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
  const detector = await faceLandmarksDetection.createDetector(
    model,
    {
      runtime: "tfjs",
      refineLandmarks: false
    }
  );
  const detect = async (net: faceLandmarksDetection.FaceLandmarksDetector) => {
    const estimationConfig = { flipHorizontal: false };
    const faces = await net.estimateFaces(video, estimationConfig);
    const ctx = canvas.getContext("2d");
    // console.log(faces[0])
    requestAnimationFrame(() => drawMesh(faces[0], ctx));
    detect(detector);
  };
  detect(detector);
};
