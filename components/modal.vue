<template>
    <transition name="v-modal">
        <div
            @click="close"
            class="v-modal-mask"
            v-if="show">
            <div class="v-modal-wrapper" :style="theme">
                <div @click.stop class="v-modal-content" :class="size" :id="'v-modal-' + modals.length">
                    <div class="v-modal-panel">
                        <div class="v-modal-heading">
                            <div class="panel-title"><slot name="header"></slot></div>
                            <span class="close-btn" @click="close">&times;</span>
                        </div>
                        <div class="v-modal-body">
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
                type: Number,
                required: false
            },

            height: {
                type: Number,
                required: false
            },

            theme: {
                type: String,
                required: false
            },

            onClose: {
                type: Function,
                required: true
            }
        },

        data() {
            return {
                modals: null,
                show: false,
                id: null
            }
        },

        watch: {
            modals() {
                this.showModal();
            }
        },

        methods: {
            close () {
                this.$modals.hide(this.name);
                this.onClose();
                this.$emit('close-modal', this.name);
            },

            showModal() {
                this.show = this.$modals.isActive(this.name);
                this.centerModal();
            },

            centerModal() {
                var modal = document.getElementById(this.id);

                if(modal) {
                    var margin = (window.innerWidth - modal.offsetWidth) / 2;
                    modal.style.marginLeft = margin + 'px';
                }
            }
        },

        mounted() {
            this.modals = this.$modals.all();

            this.id = 'v-modal-' + this.modals.length;

            var modal = document.getElementById(this.id);

            if(this.width) {
                modal.style.width = this.width + 'px';
            }

            if(this.height) {
                modal.style.height = this.height + 'px';
            }
        }
    }
</script>

<style lang="scss" scoped>
    .v-modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        transition: opacity .3s ease;
        overflow-y: scroll;
    }

    .v-modal-wrapper {
        width: 100%;
        height: 100%;

        .v-modal-content {
            margin: 0px auto;
            margin-top: 5%;
            width: 50%;
            background-color: #fff;

            &.large {
                width: 70%;
            }

            &.small {
                width: 25%;
            }

            transition: all 0.5s ease;

            .v-modal-heading {
                position: relative;
                overflow: hidden;
                padding: 20px;

                .v-modal-title {
                    display: inline;
                }

                .close-btn {
                    float: right;
                    font-size: 20px;
                    line-height: 22px;
                    cursor: pointer;
                    font-weight: 700;
                }
            }

            .v-modal-body {
                padding: 60px;
                padding-top: 0px;
            }
        }
    }

    /* Modal transition styles */

    .v-modal-enter {
        opacity: 0;
    }

    .v-modal-leave-active {
        opacity: 0;
    }

    .v-modal-enter .v-modal-content, .v-modal-leave-active .v-modal-content {
        web-kit-transform: scale(2);
        moz-transform: scale(2);
        ms-transform: scale(2);
        o-transform: scale(2);
        transform: scale(2);
    }

</style>
