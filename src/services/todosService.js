import httpService from "./httpService";
const todosEndpoint = "todos/"
const todosService = {
    fetch: async () => {
        const {data} = await httpService.get(todosEndpoint,{
            params:{
                _page: 1,
                _limit: 10
            }
        })
        return data
    },
    get: async () => {
        const {data} = await httpService.post(todosEndpoint, {
            params: {
                title: "new title",
                complete: false
            }
        })
        return data;
    }
}
export default todosService;