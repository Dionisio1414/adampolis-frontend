export interface IResetPassword {
    password: IResetPasswordFields
}

export interface IResetPasswordFields {
    first: string,
    second: string
}

export interface IPayloadResetPassword {
    fields: IResetPassword,
    token: string
}
