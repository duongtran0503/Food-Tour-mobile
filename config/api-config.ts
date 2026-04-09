export const apiEndpoints = {
    restaurants: {
        getDetail: (id: string) => `/restaurants/${id}`,
        getList: '/restaurants'
    },
    foods: {
        getLIst: '/foods'
    }
};