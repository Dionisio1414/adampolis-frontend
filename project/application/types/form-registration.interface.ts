export interface IFormRegistrationCompany {
    email: string,
    phoneNumber: string,
    firstName: string,
    lastName: string,
    plainPassword: string,
    channel: string,
    companyName: string,
    companyCode: string,
    vatCode: string,
    isCompany: boolean,
    countryCode: string,
    city: string,
    address: string,
    postCode: string,
    subscribedToNewsletter: boolean,
    agreeTo?: boolean
}

export interface IFormRegistrationCustomer {
    email: string,
    firstName: string,
    lastName: string,
    plainPassword: string,
    phoneNumber: string,
    channel: string,
    isCompany: boolean,
    subscribedToNewsletter: boolean,
    agreeTo?: boolean
}

export interface IFormLogin {
    email: string,
    password: string,
    token?: string,
    remember?: boolean
} 

export interface IFormChangePassword {
    email: string
} 

