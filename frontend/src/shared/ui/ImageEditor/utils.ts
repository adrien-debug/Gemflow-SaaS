export function dataURLtoFile(dataUrl: string, filename = "file") {
  const arr = dataUrl.split(",");
  const mime = arr?.[0]?.match(/:(.*?);/)?.[1] || "image/jpeg";
  const str = atob(arr[1]);
  let n = str.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = str.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}
