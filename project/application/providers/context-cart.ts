export const CONTEXT_CART_INJECTION_TOKEN = 'PROVIDER_CONTEXT_CART';

export class ContextCart {
    constructor(
        public actionModifyItemQuantity: string,
        public actionDeleteItem: string,
        public actionRestoreItem: string
    ) {}
}
