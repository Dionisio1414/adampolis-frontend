import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';

@Component({
    head () {
        return {
            bodyAttrs: {
                class: 'body--disabled-scroll'
            }
        }
    },
})
export default class MixinViewportUnits extends Vue {
    private setViewportUnit(): void {
        const vh: number = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);    
    }

    private removeViewportUnit(): void {
        document.documentElement.style.removeProperty('--vh');  
        document.documentElement.removeAttribute('style');  
    }

    public mounted(): void {
        window.addEventListener('resize', this.setViewportUnit);
        this.setViewportUnit();
    }

    public destroyed(): void {
        window.removeEventListener('resize', this.setViewportUnit);
        this.removeViewportUnit();
    }
}
