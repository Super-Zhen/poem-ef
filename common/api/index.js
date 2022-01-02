const files = require.context('./modules', true, /\.js$/)
const modules = files.keys().reduce((modules, path) => {
  const name = path.replace(/^\.\/|.js$/g, '')
  modules[name] = files(path).default
  return modules
}, {})
export default modules
