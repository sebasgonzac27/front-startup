export default {
    api: {
        url: import.meta.env.MODE === 'development' ? 'http://localhost:1234' : 'production_api'
    }
}