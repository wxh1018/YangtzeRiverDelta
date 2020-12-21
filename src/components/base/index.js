export default {
    install(Vue) {
        const coms = require.context('./', true, /\.vue$/)
        coms.keys().forEach(v => {
            let com = coms(v)
            let name = com.default.name
            if (name) {
                Vue.component(name, com.default)
            }
        })
    }
}