<template>
    <div :class="notificationClassNames">
        <div class="notification__header">
            <div class="notification__header-icon">
                <span :class="iconClassNames"></span>
            </div>
            <div class="notification__header-title">
                {{ item.title }}
            </div>
            <div class="notification__header-close" @click="closeCallback"></div>
        </div>
        <div class="notification__description">
            <p class="description">{{ item.text }}</p>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import { NotificationOptions } from 'vue-notification';
import { EMessageTypes } from '../constants/message-types';

@Component({})
export default class ComponentNotification extends Vue {
    @Prop()
    public item!: NotificationOptions;

    @Prop()
    public closeCallback!: () => void;

    public get notificationType(): EMessageTypes {
        return this.item.type as EMessageTypes;
    }

    public get notificationClassNames(): string[] {
        const classNames: string[] = ['notification'];

        switch (this.notificationType) {
            case EMessageTypes.SUCCESS: {
                classNames.push('notification--success');
                break;
            }
            case EMessageTypes.DANGER: {
                classNames.push('notification--error');
                break;
            }
            case EMessageTypes.INFO: {
                classNames.push('notification--info');
                break;
            }
        }

        return classNames;
    }

    public get iconClassNames(): string[] {
        const classNames: string[] = ['notification-icon'];

        switch (this.notificationType) {
            case EMessageTypes.SUCCESS: {
                classNames.push('notification-icon--success');
                break;
            }
            case EMessageTypes.DANGER: {
                classNames.push('notification-icon--error');
                break;
            }
            case EMessageTypes.INFO: {
                classNames.push('notification-icon--info');
                break;
            }
        }

        return classNames;
    }

}

</script>
<style lang="scss" scoped>
    @import '~/assets/styles/variables';

    .notification {
        background: #fff;
        box-shadow: 0 2px 9px 0 rgba(0,0,0,0.15);
        padding: 18px 10px 18px 20px;
        border-left: 4px solid transparent;
        margin-right: 40px;
        margin-bottom: 40px;
        &--success {
            border-color: $color-accent-green;
        }
        &--error {
            border-color: $color-pink;

        }   
        &--info {
            border-color: $color-blue;
        }
        &-icon {
            display: block;
            background-size: cover;
            background-repeat: no-repeat;
            background-position: 0 0;
            width: 24px;
            height: 24px;
            &--success {
                background-image: url('../assets/images/success-circle.svg');
            }
            &--error {
                background-image: url('../assets/images/warning.svg');

            }   
            &--info {
                background-image: url('../assets/images/info.svg');
            }
        }
        &__header {
            display: flex;
            align-items: center;
            &-icon {
                margin-right: 16px;
            }
            &-title {
                font-size: 14px;
                font-weight: bold;
                line-height: 19px;
                color: $color-dark-blue;
            }
            &-close {
                background-image: url('../assets/images/close.svg');
                background-size: cover;
                background-repeat: no-repeat;
                margin-left: auto;
                width: 24px;
                height: 24px;
                cursor: pointer;
            }
        }
        &__description {
            .description {
                font-size: 14px;
                line-height: 22px;
                margin-top: 10px;
                color: $color-search-bg;
                &:empty {
                    margin-top: 0;
                }
            }
        }
    }
</style>
