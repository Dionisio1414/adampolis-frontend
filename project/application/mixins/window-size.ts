import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';

@Component({
    components: {}
})
export default class MixinWindowSize extends Vue {
    public windowWidth: number = 0;
    public windowHeight: number = 0;
    
    public get isMobile(): boolean {
        return this.windowWidth < 992;
    }

    public mounted(): void {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    }

    public destroyed(): void {
        window.removeEventListener('resize', this.handleResize);
    }

    public handleResize(): void {
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
    }
}
