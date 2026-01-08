export async function imageUrlToFile(imageUrl: string, fileName: string) {
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  return new File([blob], fileName, { type: blob.type });
}
