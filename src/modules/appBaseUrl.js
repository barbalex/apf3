// in development should return local path

const appBaseUrl = () => {
  const hostnameWithoutWww = window.location.hostname.replace('www.', '')
  const isLocalhost = hostnameWithoutWww === 'localhost'
  const hostname = isLocalhost ? 'localhost' : window.location.hostname

  const appHost = isLocalhost
    ? `http://${hostname}:5173/`
    : 'https://apflora.ch/'
  //: `https://${hostname}/`

  return appHost
}

export default appBaseUrl