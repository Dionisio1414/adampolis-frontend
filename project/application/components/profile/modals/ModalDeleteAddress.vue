<template>
    <modal-window>
        <template #header>
            <modal-header @close="close">
                <template #title>
                    {{ $t('ProfilePage.deliveryDetails.delete.title') }}
                </template>
            </modal-header>
        </template>
        <template #main>
            <div class="modal-confirm-delete__body text">
                {{ deleteMessage }}
            </div>
        </template>
        <template #footer>
            <modal-footer
                @cancel="close"
                @submit="submit"
                :btnCancelTitle="$t('ProfilePage.deliveryDetails.delete.cancel')"
                :btnSubmitTitle="$t('ProfilePage.deliveryDetails.delete.submit')"
                btnSubmitClass="btn--pink"
            />
        </template>
    </modal-window>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Action, Getter, Emit } from 'nuxt-property-decorator';
import ModalWindow from '@/components/modals/ModalWindow.vue';
import ModalHeader from '@/components/modals/ModalHeader.vue';
import ModalFooter from '@/components/modals/ModalFooter.vue';
import { EStatus } from '~/constants/status';
import { EMessageTypes } from '~/constants/message-types';
import { ERolesTypes } from '~/constants/roles-types';

@Component({
    components: {
        ModalWindow,
        ModalHeader,
        ModalFooter
    }
})
export default class ComponentModalDeleteAddress extends Vue {
    @Getter('page-profile-addresses/getStatus') public status!: EStatus;

    @Getter('page-profile-customer/getStatus') public customerStatus!: EStatus;

    @Prop() public modal!: any;
    @Prop({ required: true }) public id!: number;
    @Prop({ required: true }) public type!: ERolesTypes;
    @Prop() public deleteMessage!: string;

    @Action('page-profile-customer/deleteAddress') public deleteCustomer!: (id: number) => Promise<void>;

    @Action('page-profile-addresses/deleteAddress') public deleteAddress!: (id: number) => Promise<void>;

    @Emit('close') public close(): void {}

    private async submitDeleteCustomer(): Promise<void> {
        await this.deleteCustomer(this.id);

        if (this.customerStatus === EStatus.SUCCESS) {
            this.close();
            this.$notify({
                type: EMessageTypes.SUCCESS,
                title: this.$t('ProfilePage.deliveryDetails.modals.delete_customer_label').toString()
            });
        } else {
            this.$notify({
                type: EMessageTypes.DANGER,
                title: "Validate error"
            });
        }
    }

    private async submitDeleteAddress(): Promise<void> {
        await this.deleteAddress(this.id);

        if (this.status === EStatus.SUCCESS) {
            this.close();
            this.$notify({
                type: EMessageTypes.SUCCESS,
                title: this.$t('ProfilePage.deliveryDetails.modals.delete_address_label').toString()
            });
        } else {
            this.$notify({
                type: EMessageTypes.DANGER,
                title: 'Validate error'
            });
        }
    }

    public async submit(): Promise<void> {
        switch(this.type) {
            case ERolesTypes.CUSTOMER:
                this.submitDeleteCustomer();
                break;
            case ERolesTypes.INDIVIDUAL:
                this.submitDeleteAddress();
                break;
        }
    }

}
</script>

<style lang="scss" scoped>
.modal-confirm-delete {
    &__body {
        padding-bottom: 20px;
    }
}
</style>
