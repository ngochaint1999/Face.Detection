/* eslint-disable @typescript-eslint/no-explicit-any */
import { TRIANGULATION } from "./triangulation";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";

export const drawMesh = (prediction: faceLandmarksDetection.Face, ctx: any) => {
  if (!prediction) return;
  const keyPoints = prediction.keypoints;
  if (!keyPoints) return;
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  for (let i = 0; i < TRIANGULATION.length / 3; i++) {
    const points = [
      TRIANGULATION[i * 3],
      TRIANGULATION[i * 3 + 1],
      TRIANGULATION[i * 3 + 2],
    ].map((index) => keyPoints[index]);
    drawPath(ctx, points, true);
  }

  const leftCheek = keyPoints[234];
  const rightCheek = keyPoints[454];
  const nose = keyPoints[1];

  const leftDistance = Math.abs(nose.x - leftCheek.x);
  const rightDistance = Math.abs(nose.x - rightCheek.x);

  const directionThreshold = 100;
  let mess = "";
  // console.log("left: " + leftDistance)
  // console.log("right: " + rightDistance)
  // console.log("left cal: " + (leftDistance > rightDistance + directionThreshold ? "true" : "false"))
  // console.log("right cal: " + (rightDistance > leftDistance + directionThreshold ? "true" : "false"))
  if (leftDistance > rightDistance + directionThreshold) {
    mess = 'Looking Left';
  } else if (rightDistance > leftDistance + directionThreshold) {
    mess = 'Looking Right';
  } else {
    mess = 'Facing Forward';
  }

  ctx.fillStyle = "red";
  ctx.font = "30px Arial";
  ctx.fillText(mess, 100,100)

  for (const keyPoint of keyPoints) {
    ctx.beginPath();
    ctx.arc(keyPoint.x, keyPoint.y, 1, 0, 3 * Math.PI);
    ctx.fillStyle = "aqua";
    ctx.fill();
  }
};

const drawPath = (ctx: any, points: faceLandmarksDetection.Keypoint[], closePath: boolean) => {
  const region = new Path2D();
  region.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    const point = points[i];
    region.lineTo(point.x, point.y);
  }
  if (closePath) region.closePath();
  ctx.stokeStyle = "black";
  ctx.stroke(region);
};
