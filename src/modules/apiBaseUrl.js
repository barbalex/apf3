// in development should return local path

export default () => {
  if (typeof window === 'undefined') return 'https://apflora.ch/api'
  const hostnameWithoutWww = window.location.hostname.replace('www.', '')
  const isLocalhost = hostnameWithoutWww === 'localhost'
  const apiHost = isLocalhost
    ? 'http://localhost:4001'
    : 'https://apflora.ch/api'
  //: 'https://${window.location.hostname}/api'

  return apiHost
}
