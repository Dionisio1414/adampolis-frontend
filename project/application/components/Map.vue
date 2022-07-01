<template>
    <GmapMap
        v-if="google && geocoder"
        :center="center"
        :zoom="zoom"
        :options="{ ...options }"
    >
        <GmapCluster
            :zoomOnClick="true"
        >
            <GmapMarker
                :key="index"
                v-for="(m, index) in markers"
                :clickable="true"
                :draggable="true"
                :position="{ ...m }"
                :icon="{
                    url: require(`~/assets/images/pin-store.svg`)
                }"
                @click="center=m.position"
            />
        </GmapCluster>
    </GmapMap>
</template>

<script lang="ts">
import { Component, Prop, mixins } from 'nuxt-property-decorator';
import { IMarkers } from '~/types/markers.interface';
import { IMapOptions } from '~/types/map-options.interface';
import MixinGMapGeocoding from '~/mixins/gmap-geocoding';

@Component({})
export default class ComponentMap extends mixins(MixinGMapGeocoding) {
    @Prop() public markers!: IMarkers[];
    @Prop() public options!: IMapOptions;
    @Prop() public zoom!: number;
    @Prop() public center!: IMarkers;

    public mapMarkers: any = null;

    private async codeAddress(address: string): Promise<any> {
        return new Promise(res => {
            this
                .geocoder
                .geocode(
                    { address },
                    function (results: any, status: string) {
                        if (status !== 'OK') {
                            return;
                        }

                        res(results[0]?.geometry?.location || null);
                    }
                );
        });
    }
}
</script>
