
export const stripWebFromUrl = (path: string) => {
  //string -> /web/path
  return path.split("/").slice(2).join("/");
};
export const mimeTypeIcon = (mimeType:string) => {
  switch (mimeType) {
    case "application/pdf":
      return "fa-file-pdf"
    case "application/vnd.ms-excel":
      return "fa-file-excel"
    case "image/png":
      return "fa-file-image"
    case "image/jpg":
      return "fa-file-image"
    case "image/jpeg":
      return "fa-file-image"
    default:
      return "fa-file"
  }
}
