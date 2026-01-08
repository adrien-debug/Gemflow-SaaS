export const getMinutesAndSecondsFromTotalSeconds = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return { minutes, seconds };
};

export const getTotalSecondsFromMinutesAndSeconds = (minutes = 0, seconds = 0) => {
  return minutes * 60 + seconds;
};
