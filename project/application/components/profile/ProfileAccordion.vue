<template>
    <div class="profile-accordion">
        <div class="profile-accordion__header" @click="switchAccordion">
            <div class="profile-accordion__info">
                <div class="text text--xs d-none d-lg-block">{{ info.model.name || '' }}</div>
                <div class="text text--xs d-none d-lg-block">{{ info.constructionType || '' }}</div>
                <div class="text text--xs d-none d-lg-block">{{ info.vin || '' }}</div>
                <div class="text text--xs d-none d-lg-block">{{ info.motorCodes[0] || '' }}</div>
                <div class="text text--xs d-none d-lg-block">{{ info.yearOfConstrFrom || '' }}</div>
                <div class="profile-accordion__buttons">
                    <button class="profile-accordion__button btn btn--label-grey" @click.stop="editInfo">Keisti</button>
                    <button class="profile-accordion__button btn btn--label-red" @click.stop="deleteInfo">
                        Ištrinti
                    </button>
                </div>
            </div>
            <div class="profile-accordion__icon" :class="{ 'profile-accordion__icon--opened': accordionActive }">
                <i class="icon icon--arrow-upper"></i>
            </div>
        </div>
        <SlideUpDown :active="accordionActive" :duration="200">
            <div class="profile-accordion__main">
                <slot name="content"></slot>
            </div>
        </SlideUpDown>
    </div>
</template>

<script lang="ts">
import { Component, Emit, mixins, Prop } from 'nuxt-property-decorator';
import SlideUpDown from 'vue-slide-up-down';
import mixinAccordion from '~/mixins/accordion';
import { IProfileVehiclePayload, IProfileVehiclePayloadParams } from '~/types/profile-data.interface';

@Component({
    components: { SlideUpDown }
})
export default class ComponentProfileAccordion extends mixins(mixinAccordion) {
    @Prop({ default: {} }) public readonly info!: IProfileVehiclePayload;
    @Prop() public readonly vehicleID!: number;

    @Emit('edit')
    public editInfo(): IProfileVehiclePayloadParams {
        return { payload: this.info, vehicleID: this.vehicleID };
    }

    @Emit('delete')
    public deleteInfo(): number {
        return this.vehicleID;
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';
@import '~/assets/styles/mixins/media';

.profile-accordion {
    &__header {
        background-color: $color-light-grey;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        border-radius: 4px;
        padding: 15px 10px 9px 20px;
        margin-bottom: 10px;
        cursor: pointer;
    }

    &__info {
        display: grid;
        grid-template-columns: 12% 21% 21% 18% 14% 8%;
        color: $color-black;
        width: 100%;
    }

    &__icon {
        position: relative;
        width: 32px;
        height: 32px;
        transform: rotate(180deg);
        transition: $transition ease-in-out;
        .icon {
            width: 32px;
            height: 32px;
        }
        &--opened {
            transform: rotate(0deg);
        }
    }

    &__buttons {
        display: flex;
        align-items: center;
    }

    &__button {
        &:not(:last-child) {
            margin-right: 10px;
        }
    }
}

@include media-lg {
    .profile-accordion {
        &__header {
            background-color: transparent;
        }

        &__main {
            background-color: $color-light-grey;
            border-top: 1px solid rgba($color-grey, 0.6);
        }
    }
}
</style>
