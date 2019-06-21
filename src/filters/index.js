import dayjs from "dayjs"

export const unixFormater = (timestamp, full = true) => {
  const unix = parseInt(timestamp)
  const date = dayjs(unix)
  if (date.isValid()) {
    return full ? dayjs.unix(unix).format("YYYY-MM-DD HH:mm:ss") : dayjs.unix(unix).format("YYYY-MM-DD");
  } else {
    return "";
  }
}