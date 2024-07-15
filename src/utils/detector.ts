/* eslint-disable @typescript-eslint/no-explicit-any */
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import { drawMesh } from "./drawMesh";

// tfjs
export const runDetector = async (video: any, canvas: any, imgRefs: any) => {
  const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
  const detector = await faceLandmarksDetection.createDetector(
    model,
    {
      runtime: "tfjs",
      // detectorModelUrl: "../../public/static/models/kagglesdsdata.json",
      // landmarkModelUrl: "../../public/static/models/group1-shard1of1.bin",
      refineLandmarks: false,
      maxFaces: 3
    }
  );
  const detect = async (net: faceLandmarksDetection.FaceLandmarksDetector) => {
    const estimationConfig = { flipHorizontal: false };
    const faces = await net.estimateFaces(video, estimationConfig);
    const ctx = canvas.getContext("2d");
    const ctxImg = imgRefs.getContext("2d");
    // console.log(faces[0])
    // console.log(video)
    let inx = 0;
    let acreage = 0;
    faces.forEach((item, ind) => {
      const acr = item.box.width * item.box.height;
      if(acr > acreage) {
        acreage = acr;
        inx = ind;
      }
    })

    requestAnimationFrame(() => drawMesh(faces[inx], ctx, ctxImg, video));
    detect(detector);
  };
  detect(detector);
};
