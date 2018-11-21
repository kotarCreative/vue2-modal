<template>
    <transition :name="'v-modal-' + transitionName">
        <div
            @click.stop="close('outer')"
            class="v-modal__mask"
            v-if="show">
            <div class="v-modal__wrapper" :style="theme">
                <div @click.stop class="v-modal__content" :class="size" :id="id" :style="style">
                    <div class="v-modal__panel">
                        <div class="v-modal__heading">
                            <div class="v-modal__title"><slot name="header"></slot></div>
                            <span class="v-modal__close-btn" @click="close('inner')" v-if="!hideCloseBtn">&times;</span>
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
            /**
             * Defines a static height for the modal.
             *
             * @type {String|Number|null}
             */
            height: {
                type: [ String, Number ],
                required: false
            },

            /**
             * Hides the close button.
             *
             * @type Boolean
             */
            hideCloseBtn: {
                type: Boolean,
                default: false
            },

            /**
             * Lifecycle hook that runs after a modal closes.
             *
             * @type {Function|null}
             */
            onClose: {
                type: Function,
                required: false
            },

            /**
             * Lifecycle hook that runs after a modal opens.
             *
             * @type {Function|null}
             */
            onShow: {
                type: Function,
                required: false
            },

            /**
             * Disables clicking grey space around modal
             * to close the modal.
             *
             * @type {Boolean|null}
             */
            outerClose: {
                type: Boolean,
                default: true
            },

            /**
             * Unique identifier for modal.
             *
             * @type {String}
             */
            name: {
                type: String,
                required: true
            },

            /**
             * Defined sizing for modal.
             * Can be defined as xsm, sm, md, lg, or xlg
             *
             * @type {String|null}
             */
            size: {
                type: String,
                required: false,
                validator(val) {
                    return val === 'xsm' ||
                        val === 'sm' ||
                        val === 'md' ||
                        val === 'lg' ||
                        val === 'xlg';
                }
            },

            /**
             * Custom css styling to apply to modal.
             *
             * @type {String|null}
             */
            theme: {
                type: String,
                required: false
            },

            /**
             * Defines the transition that occurs when
             * a modal enters the screen. Can be defined
             * as zoom-out, zoom-in, fade and slide-in-top.
             *
             * @type {String|null}
             */
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

            /**
             * Defines a static width for the modal.
             *
             * @type {String|Number|null}
             */
            width: {
                type: [ String, Number ],
                required: false
            },
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
            close (location) {
                if (location === 'outer' && !this.outerClose) return;

                this.$modals.hide(this.name);
                if (this.onClose) this.onClose();
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

            &.xlg {
                width: 85%;
            }

            &.lg {
                width: 70%;
            }

            &.md {
                width: 50%;
            }

            &.sm {
                width: 25%;
            }

            &.xsm {
                width: 15%;
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
