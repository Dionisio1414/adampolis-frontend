export interface IShopInfo {
    logo: string;
    logo_dark: string;
    shop_email: string;
    shop_phone: string;
    shop_phone_checkout: string;
    shop_work_hours: string;
    header_message: IShopInfoHeaderMessage;
}

export interface IShopInfoHeaderMessage {
    background_color: string;
    content: string;
}
