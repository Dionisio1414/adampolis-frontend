<script lang="ts">
import { CreateElement, VNode } from 'vue';
import { Component, Prop, Vue } from 'nuxt-property-decorator';

@Component({})
export default class ComponentHeading extends Vue {
    @Prop({ required: true }) public tag!: string;

    public render(createElement: CreateElement): VNode {
        return createElement(
            this.tag, 
            {
                class: {
                    [this.tag]: true
                }
            }
        );
    }

}
</script>

