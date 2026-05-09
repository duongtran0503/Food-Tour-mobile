export interface authTokenType {
    accessToken: string
    refreshToken: string
}

export interface UserInfo {
    id: string
    email: string
    fullName: string
    phoneNumber: string
    role: string
    avatar: string
}
export interface AuthResponse {
    tokens: authTokenType
    user: UserInfo
}