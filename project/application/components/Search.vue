<template>
    <div class="search flex-1 d-flex">
        <div class="search__wrapper flex-1">
            <input
                v-model="searchValue"
                tabindex="-1"
                type="text"
                class="form-search truncate-text"
                :placeholder="$t('Search.placeholder')"
                @keyup.enter="searchHandler"
            >
            <div class="search__filter-container">
                <Dropdown
                    :ref="searchFilterRef"
                    :options="{
                        placement: 'bottom-end',
                        modifiers: {
                            flip: {
                                name: 'flip',
                                enabled: false
                            },
                            offset: {
                                offset: '25px,6px'
                            },
                            keepTogether: {
                                enabled: false
                            }
                        }
                    }"
                    :appendToBody="true"
                    rootClass="search-container"
                >
                    <template>
                        <div class="dropdown__body search__dropdown">
                            <div
                                class="search__item"
                                :class="{ 'search__item--active': item.id === filterValue.id }"
                                v-for="item in items"
                                :key="item.title"
                                @click="setFilterValue(item)"
                            >
                                {{ item.value }}
                                <i 
                                    v-show="item.id === filterValue.id" 
                                    class="icon search__item-icon"
                                    :class="{
                                        'icon--check': !isMobile,
                                        'icon--check-mobile': isMobile
                                    }"
                                >
                                </i>
                            </div>
                        </div>
                    </template>
                    <template v-slot:reference="{ isOpen }">
                        <button class="btn btn--flex btn--default">
                            <div class="search__filter d-lg-flex">
                                <div>{{ filterValue.value }}</div>
                                <span
                                    class="icon icon--arrow-down dropdown__arrow"
                                    :class="{ 'dropdown__arrow--active': isOpen }"
                                ></span>
                            </div>
                            <div class="search__filter-mobile d-lg-none">
                                <span class="icon icon--filter-grey" :class="{ 'icon--filter-black': isOpen }"></span>
                                <span :class="{ 'filter-mobile--active': !isOpen && filterValue.id !== 1 }"></span>
                            </div>
                        </button>
                    </template>
                </Dropdown>
            </div>
        </div>
        <div 
            class="search__button" 
            @click="searchHandler"
        >
            <i class="icon icon--search search__icon"></i>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, mixins, Emit } from 'nuxt-property-decorator';
import Dropdown from '~/components/Dropdown.vue';
import MixinWindowSize from '~/mixins/window-size';
import { required } from 'vuelidate/lib/validators';
import FormControlErrors from '~/components/FormControlErrors.vue';
import { validationMixin } from 'vuelidate';

export interface ISearchTypes {
    id: number;
    value: string;
}

const validations: any = {
    searchValue: { required }
}

@Component({
    validations,
    mixins: [validationMixin],
    components: { Dropdown, FormControlErrors }
})
export default class ComponentSearch extends mixins(MixinWindowSize) {
    public searchValue: string | null = null;
    public localePath!:(value: string) => string;

    public searchFilterRef = 'searchFilterRef';
    setFilterValue(item: { id: number; value: string }) {
        (this.$refs[this.searchFilterRef] as any).doClose();
        this.filterValue = item;
    }
    public filterValue: { id: number; value: string } = {
        id: 2,
        value: this.$t('Search.search_type_oem_label').toString()
    };

    public items: ISearchTypes[] = [
        // {
        //     id: 0,
        //     value: this.$t('Search.search_type_number_label').toString()
        // },
        {
            id: 2,
            value: this.$t('Search.search_type_oem_label').toString()
        },
        {
            id: 1,
            value: this.$t('Search.search_type_all_label').toString()
        }
    ];

    @Emit('search')
    private searchEmitHandler(): void {};

    public searchHandler(): void {
        this.$v.$touch();

        if(this.$v.$invalid) return;

        if(this.isMobile) this.searchEmitHandler();

        this.$router.replace({ 
            path: this.localePath('/search'), 
            query: { 
                type: this.filterValue.id.toString(),
                q: this.searchValue
            } 
        });

        this.searchValue = null;
        
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';
@import '~/assets/styles/mixins/media';

.search {
    &__wrapper {
        position: relative;
    }

    &__filter-container {
        position: absolute;
        right: 10px;
        top: 0;
        bottom: 0;
        display: flex;
        align-items: center;
    }

    &__filter {
        color: $color-dark-grey;
        font-size: 14px;
        letter-spacing: 0;
        line-height: 22px;
    }

    &__filter-mobile {
        height: 100%;
        height: 40px;
        width: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 24px;
        position: relative;

        &--active {
            &:after {
                content: '';
                position: absolute;
                background-color: $color-blue;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                right: 10px;
                top: 9px;
            }
        }
    }

    &__button {
        height: 40px;
        width: 40px;
        border-radius: 0 4px 4px 0;
        background-color: $color-default;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }

    &__icon {
        font-size: 20px;
    }

    &__dropdown {
        background: $color-white;
        min-width: 260px;
        @media screen and (min-width: $breakpoint-lg) {
            background: $color-default;
            min-width: 174px;
        }
    }

    &__item {
        padding: 10px 15px;
        margin: 2px 0;
        color: $color-dark-blue;
        transition: .35s ease-in-out;
        cursor: pointer;
        @media screen and (min-width: $breakpoint-lg) {
            color: $color-white;
        }   
        &:hover,
        &--active {
            font-weight: 600;
        }

        &-icon {
            font-size: 11px;
            margin-left: 8px;
        }
    }
}

</style>
