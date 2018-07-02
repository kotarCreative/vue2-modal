<template>
    <transition :name="'v-modal-' + transitionName">
        <div
            @click.stop="close"
            class="v-modal__mask"
            v-if="show">
            <div class="v-modal__wrapper" :style="theme">
                <div @click.stop class="v-modal__content" :class="size" :id="id" :style="style">
                    <div class="v-modal__panel">
                        <div class="v-modal__heading">
                            <div class="v-modal__title"><slot name="header"></slot></div>
                            <span class="v-modal__close-btn" @click="close">&times;</span>
                        </div>
                        <div class="v-modal__body">
                            <slot></slot>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'v-modal',

        props: {
            name: {
                type: String,
                required: true
            },

            size: {
                type: String,
                required: false
            },

            width: {
                type: String,
                required: false
            },

            height: {
                type: String,
                required: false
            },

            theme: {
                type: String,
                required: false
            },

            transitionName: {
                type: String,
                default: 'zoom-out',
                validator(val) {
                    return val === 'zoom-out' ||
                           val === 'zoom-in' ||
                           val === 'fade' ||
                           val === 'slide-in-top';
                }
            },

            onClose: {
                type: Function,
                required: false
            },

            onShow: {
                type: Function,
                required: false
            }
        },

        data() {
            return {
                modals: null,
                show: false,
                id: null,
                style: ''
            }
        },

        watch: {
            modals() {
                this.showModal();
            },

            show(val) {
                if (val && this.onShow) {
                    this.onShow();
                }
            }
        },

        methods: {
            close () {
                this.$modals.hide(this.name);
                if (this.onClose) { this.onClose() }
                this.$emit('close-modal', this.name);
                document.body.classList.remove('v-modal__no-scroll');
            },

            showModal() {
                this.show = this.$modals.isActive(this.name);
                if (this.show) {
                    document.body.classList.add('v-modal__no-scroll');

                    this.centerModal();
                }
            },

            centerModal() {
                var modal = document.getElementById(this.id);

                if (modal) {
                    var margin = (window.innerWidth - modal.offsetWidth) / 2;
                    modal.style.marginLeft = margin + 'px';
                }
            }
        },

        created() {
            this.modals = this.$modals.shown();

            this.$modals.mount(this.name);
            this.id = 'v-modal-' + this.$modals.all().indexOf(this.name);
        },

        mounted() {
            if (this.width) {
                this.style = this.style + 'width: ' + this.width + 'px;';
            }

            if (this.height) {
                this.style = this.style + 'height: ' + this.height + 'px;';
            }
        }
    }
</script>

<style lang="scss">
    $pkgName: 'v-modal';
    $mobileSize: '600px';

    .#{$pkgName} {
        &__mask {
            position:           fixed;
            z-index:            9998;
            top:                0;
            left:               0;
            width:              100%;
            height:             100%;
            background-color:   rgba(0, 0, 0, .5);
            transition:         opacity .3s ease;
            overflow-y:         scroll;
        }

        &__wrapper {
            width: 100%;
        }

        &__content {
            margin:             0px auto;
            margin-bottom:      5%;
            margin-top:         5%;
            width:              50%;
            background-color:   #fff;
            transition:         all 0.5s ease;

            &.lg {
                width: 70%;
            }

            &.md {
                width: 50%;
            }

            &.sm {
                width: 25%;
            }
        }

        &__heading {
            padding:        20px;
            display:        flex;
            align-items:    center;

            .#{$pkgName}__title {
                h1, h2, h3, h4, h5 {
                    padding:    0px;
                    margin:     0px;
                }
            }

            .#{$pkgName}__close-btn {
                margin-left:    auto;
                font-size:      20px;
                line-height:    22px;
                cursor:         pointer;
                font-weight:    700;
            }
        }

        &__body {
            padding:        20px;
            padding-top:    0px;
        }

        &__no-scroll {
            overflow: hidden;
        }

        /* Modal transition styles */

        // Zoom Out
        &-zoom-out-enter {
            opacity: 0;

            .#{$pkgName}__content {
                web-kit-transform:  scale(2);
                moz-transform:      scale(2);
                ms-transform:       scale(2);
                o-transform:        scale(2);
                transform:          scale(2);
            }
        }

        &-zoom-out-leave-active {
            opacity: 0;

            .#{$pkgName}__content {
                web-kit-transform:  scale(2);
                moz-transform:      scale(2);
                ms-transform:       scale(2);
                o-transform:        scale(2);
                transform:          scale(2);
            }
        }

        // Zoom In
        &-zoom-in-enter {
            opacity: 0;

            .#{$pkgName}__content {
                web-kit-transform:  scale(0.5);
                moz-transform:      scale(0.5);
                ms-transform:       scale(0.5);
                o-transform:        scale(0.5);
                transform:          scale(0.5);
            }
        }

        &-zoom-in-leave-active {
            opacity: 0;

            .#{$pkgName}__content {
                web-kit-transform:  scale(0.5);
                moz-transform:      scale(0.5);
                ms-transform:       scale(0.5);
                o-transform:        scale(0.5);
                transform:          scale(0.5);
            }
        }

        // Fade
        &-fade-enter {
            opacity: 0;
        }

        &-fade-leave-active {
            opacity: 0;
        }

        // Slide in top
        &-slide-in-top-enter {
            opacity: 0;

            .#{$pkgName}__content {
                web-kit-transform:  translateY(-100px);
                moz-transform:      translateY(-100px);
                ms-transform:       translateY(-100px);
                o-transform:        translateY(-100px);
                transform:          translateY(-100px);
            }
        }

        &-slide-in-top-leave-active {
            opacity: 0;

            .#{$pkgName}__content {
                web-kit-transform:  translateY(-100px);
                moz-transform:      translateY(-100px);
                ms-transform:       translateY(-100px);
                o-transform:        translateY(-100px);
                transform:          translateY(-100px);
            }
        }
    }

    @media screen and (max-width: $mobileSize) {
        .#{$pkgName}__content {
            width:      100%;
            margin-top: 0px;
        }
    }
</style>
