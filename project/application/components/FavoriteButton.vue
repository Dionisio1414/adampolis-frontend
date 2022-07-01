<template>
    <button 
        :disabled="disabled"
        @click="toggleFavorite" 
        class="btn btn--like favorite-button"
    >
        <i
            class="icon icon--favourite favorite-button__icon"
            :class="{'icon--favourite-active': favorite }"
        >
        </i>
    </button>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Emit } from 'nuxt-property-decorator';
import HeaderLoginPopup from '~/components/header/HeaderLoginPopup.vue';

@Component({
    components: { HeaderLoginPopup }
})
export default class ComponentFavoriteButton extends Vue {
    @Prop({ default: false }) public favorite!: boolean;
    @Prop({ default: false }) public isAuthorized!: boolean;
    @Prop({ default: false }) public disabled!: boolean;

    public $modal: any;

    @Emit('toggleFavorite')
    public favoriteHandler(): boolean {
        return this.favorite;
    }
    
    public toggleFavorite(): boolean | void {
        if(this.isAuthorized) {
            this.favoriteHandler();
        } else {
            this.$modal.show(
                HeaderLoginPopup,
                {
                    modal: this.$modal,
                },
                {
                    resizable: false,
                    adaptive: true,
                    draggable: false,
                    scrollable: true,
                    height: 'auto',
                    minWidth: 0,
                    maxWidth: 388,
                    shiftY: 0.5,
                    transition: 'modal',
                    overlayTransition: 'fade',
                    clickToClose: true,
                    classes: 'login-popup modal--mobile-full'
                }
            );
        }
    }

}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';

.favorite-button {
    padding: 6px 7px 2px;

    &__icon {
        width: 24px;
        height: 24px;
    }
}
</style>
