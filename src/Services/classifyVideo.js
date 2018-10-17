// Needs to be called in a loop to get updated predictions
export default async classifier => {
  const results = await classifier.predict();
  return {
    result: results[0].className,
    probability: results[0].probability.toFixed(4)
  }
}
