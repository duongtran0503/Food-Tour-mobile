export const apiEndpoints = {
    restaurants: {
        getDetail: (id: string) => `/restaurants/${id}`,
        getList: '/restaurants'
    },
    foods: {
        getLIst: '/foods'
    },
    auth: {
        login: '/auth/login',
        register: '/auth/register'
    },
    user: {
        getProfile: '/users/profile',
        updateProfile: "/users/update/profile"
    }
};