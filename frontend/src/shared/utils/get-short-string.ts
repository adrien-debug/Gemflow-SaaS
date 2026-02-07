export const getShortString = (string?: string, amount: number = 30): string => {
  if (!string) return "";

  const words = string.split(" ");

  let shortName = words[0];

  if (shortName.length > amount) return `${shortName.slice(0, amount)}...`;

  for (let i = 1; i < words.length; i++) {
    const newShortName = shortName + " " + words[i];
    if (newShortName.length > amount) break;
    shortName = newShortName;
  }

  return words.length > 1 && string.length > amount ? `${shortName}...` : shortName;
};

export const getShortStringExplicitly = (string: string, amount: number = 30): string => {
  if (string.length > amount) return `${string.slice(0, amount)}...`;
  return string;
};
