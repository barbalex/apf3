// in development should return local path

const hostnameWithoutWww =
  typeof window !== "undefined"
    ? window.location.hostname.replace("www.", "")
    : ""
const isLocalhost = hostnameWithoutWww === "localhost"
const apiHost = isLocalhost
  ? "http://localhost:4001"
  : `https://${
      typeof window !== "undefined" ? window.location.hostname : ""
    }/api`

export default apiHost
