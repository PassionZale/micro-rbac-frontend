import dayjs from "dayjs"

export const unixFormater = (unixNumber, full = true) => {
  const date = dayjs(unixNumber)
  if (date.isValid()) {
    return full ? date.format("YYYY-MM-DD HH:mm:ss") : date.format("YYYY-MM-DD");
  } else {
    return "";
  }
}