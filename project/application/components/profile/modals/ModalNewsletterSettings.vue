<template>
    <modal-window>
        <template #header>
            <modal-header @close="close">
                <template #title>
                    {{ $t('ProfilePage.modals.newsletterSettings.title') }}
                </template>
            </modal-header>
        </template>
        <template #main>
            <div class="form-block">
                <div class="form-group">
                    <input id="category_1" v-model="isSubscribedToNewsletter" type="checkbox" class="form-checkbox" />
                    <label for="category_1" class="form-label">
                        {{ $t('ProfilePage.modals.newsletterSettings.message') }}
                    </label>
                </div>
            </div>
        </template>
        <template #footer>
            <modal-footer
                @cancel="cancel"
                @submit="submit"
                :btnCancelTitle="$t('ProfilePage.buttons.cancel')"
                :btnSubmitTitle="$t('ProfilePage.buttons.submit')"
            />
        </template>
    </modal-window>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Getter, Action } from 'nuxt-property-decorator';
import ModalWindow from '@/components/modals/ModalWindow.vue';
import ModalHeader from '@/components/modals/ModalHeader.vue';
import ModalFooter from '@/components/modals/ModalFooter.vue';
import { EStatus } from '~/constants/status';
import { EMessageTypes } from '~/constants/message-types';

interface ISubscriptionForm {
    subscribedToNewsletter: boolean;
}

@Component({
    components: {
        ModalWindow,
        ModalHeader,
        ModalFooter
    }
})
export default class ComponentModalNewsletterSettings extends Vue {
    @Getter('modal-change-subscription/getMessage') message!: string;
    @Getter('modal-change-subscription/getStatus') status!: string;
    @Action('modal-change-subscription/changeSubscription') changeSubscription!: (
        formData: ISubscriptionForm
    ) => Promise<void>;

    @Prop()
    public isSubscribed!: boolean;

    public isSubscribedToNewsletter: boolean = this.isSubscribed;

    public async submit(): Promise<void> {
        await this.changeSubscription({ subscribedToNewsletter: this.isSubscribedToNewsletter });

        if (this.status === EStatus.SUCCESS) {
            this.close();
            this.$notify({
                type: EMessageTypes.SUCCESS,
                title: this.message
            });
        } else {
            this.$notify({
                type: EMessageTypes.DANGER,
                title: this.message
            });
        }
    }

    public close(): void {
        this.$emit('close');
    }

    public cancel(): void {
        this.$emit('close');
    }
}
</script>

<style lang="scss" scoped></style>
