<template>
    <div :class="internalWrapperClassNames">
        <h2 
            class="h2 locations__title"
            v-if="title"
            v-html="$sanitize(title)"
        >
        </h2>
        <GmapMap
            :center="center"
            :zoom="zoom"
            :options="{ ...options }"
            ref="gmap"
            @bounds_changed="boundsChanged"
        >
            <GmapCluster
                :zoomOnClick="true"
                :styles="clusterStyles"
            >
                <GmapMarker
                    :key="index"
                    v-for="(m, index) in mapMarkers"
                    :clickable="true"
                    :draggable="true"
                    :position="{ ...m.position }"
                    :icon="{
                        url: m.url
                    }"
                    @click="center=m.position"
                />
            </GmapCluster>
        </GmapMap>
    </div>
</template>

<script lang="ts">
import { Component, Prop, mixins, Inject } from 'nuxt-property-decorator';
import { IMapOptions } from '~/types/map-options.interface';
import MixinGMapGeocoding from '~/mixins/gmap-geocoding';
import { IClusterStyles, IContentLocations, IContentLocationsCoordinates, IContentMarkers, IContentMarkersPositions, IContentType } from '~/types/content-type.interface';
import { EMarkerTypes } from '~/constants/marker-types';

// @ts-ignore
const pinStore: string = require('~/assets/images/pin-store.svg');
// @ts-ignore
const pinServices: string = require('~/assets/images/pin-services.svg');
const zoomLevel: number = 8;

@Component({})
export default class ComponentLocations extends mixins(MixinGMapGeocoding) {
    @Prop() public readonly contentType!: IContentType;
    @Inject('CT_LOCATIONS') public readonly wrapperClassNames?: string[];

    public mapMarkers: IContentMarkers[] | null = null;
    public options: IMapOptions = {
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        disableDefaultUi: false
    };
    public clusterStyles: IClusterStyles[] = [{
        textColor: "white",
        url: require("~/assets/images/pin-cluster1.svg"),
        height: 40,
        width: 33,
        textSize: 15,
        anchorText: [-3, 0]
    }];
    public center: IContentMarkersPositions | {} = {
        lat: 0,
        lng: 0
    };
    public zoom: number = zoomLevel;
    private mapObject: any = null;
    private mapZoom: number | null = null;

    public get title(): string | null {
        return (this.contentType.items as IContentLocations)?.title ?? null;
    }

    public get internalWrapperClassNames(): string[] {
        const result: string[] = ['locations'];
        if(this.wrapperClassNames) result.push(...this.wrapperClassNames);
        return result;
    }

    private get coordinatesBlock(): IContentLocationsCoordinates[] {
        return (this.contentType.items as IContentLocations)?.coordinates ?? [];
    }

    private getMarkers(): Promise<IContentMarkers[]> {
        const value: IContentLocationsCoordinates[] = this.coordinatesBlock;

        const result: any = value.map(async gmapItem => {
                if(gmapItem?.location) {
                    const location: any = await this.codeAddress(gmapItem?.location);
                    const url: string = (gmapItem?.type === EMarkerTypes.STORE) ? pinStore : pinServices;

                    if(!location) {
                        return null;
                    }

                    return { 
                        position: { 
                            lat: location.lat(),
                            lng: location.lng() 
                        }, 
                        url 
                    };
                }
        })

        return Promise.all(result);
    }

    private scaleToMarkers(map: any): void {
        const bounds = new this.google.maps.LatLngBounds();
        for (let m of (this.mapMarkers as IContentMarkers[])) { bounds.extend(m.position); }
        map.fitBounds(bounds);
    }

    public async codeAddress(address: string): Promise<any> {
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

    public boundsChanged(bounds: any): void {
        if(bounds && this.mapObject && this.mapZoom) {
            this.mapZoom >= zoomLevel ? (this.$refs.gmap as any).$mapObject.setZoom(zoomLevel) : null;
        }

        return;
    }
 
    public mounted(): void {
        (this.$refs.gmap as any).$mapPromise.then( async (map: any) => {
            this.mapObject = await (this.$refs.gmap as any).$mapObject;
            await this.getMarkers().then((data: IContentMarkers[]) => { 
                this.mapMarkers = data;
                if(data && data.length > 1) {
                    this.scaleToMarkers(map);
                }
                if(data && data.length === 1) {
                    this.center = { ...data[0].position }
                }
                this.mapZoom = map.zoom;
            });
        });
    }

}
</script>
<style lang="scss" scoped>
@import '~/assets/styles/variables';

.locations {
    &__title {
        margin-bottom: 20px;
    }
}
</style>
