// import ml5 from 'ml5';

// Grab elements, create settings, etc.
// const video = document.getElementById('video');

// Create a webcam capture
// navigator.mediaDevices.getUserMedia({ video: true })
//   .then((stream) => {
//     video.srcObject = stream;
//     video.play();
//   })

// Initialize the Image Classifier method with MobileNet passing the video as the
// second argument and the getClassification function as the third
// const classifier = ml5.imageClassifier('MobileNet', video);

// Needs to be called in a loop to get updated predictions
export default async classifier => {
  const results = await classifier.predict();
  return {
    result: results[0].className,
    probability: results[0].probability.toFixed(4)
  }
}
