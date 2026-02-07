export const getWeightLossDescription = (currentWeight: number, initialWeight: number) => {
  const lossValue = (currentWeight - initialWeight).toFixed(2);
  const lossPercentage = (((currentWeight - initialWeight) / initialWeight) * 100).toFixed(2);

  return `Loss: ${lossValue} g / ${lossPercentage}%`;
};
