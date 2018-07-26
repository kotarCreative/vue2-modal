import Modal from './components/modal.vue'

export default {
    install (Vue, options) {
        Vue.component('vue-modal', Modal);

        Vue.prototype.$modals = {

            /**
             * Modals that are currently shown.
             *
             * @var array
             */
            shownModals: [],

            /**
             * All modals loaded to the view app.
             *
             * @var array
             */
            allModals: [],

            /**
             * Shows a named modal.
             *
             * @param string modalName
             *
             * @return void
             */
            show(modalName) {
                this.shownModals.indexOf(modalName) == -1 ? this.shownModals.push(modalName) : null;
                if(options && options.logging) {
                    console.log('Show modal: ' + modalName);
                    console.log('All modals showing: ', this.shownModals);
                }
            },

            /**
             * Hides a named modal.
             *
             * @param string| array modalNames
             *
             * @return void
             */
            hide(modalNames) {
                /* Removes the scroll lock */
                document.body.classList.remove('v-modal__no-scroll');

                if (modalNames.constructor === Array) {
                    modalNames.forEach(modalName => {
                        var ind = this.shownModals.indexOf(modalName);
                        this.shownModals.splice(ind, 1);
                    });
                } else {
                    var ind = this.shownModals.indexOf(modalNames);
                    this.shownModals.splice(ind, 1);
                }
                if(options && options.logging) {
                    console.log('Removed modal: ' + modalNames);
                    console.log('All shown modals: ', this.shownModals);
                }
            },

            /**
             * Determines if a modal should be shown or not.
             *
             * @param string modalName
             *
             * @return boolean
             */
            isActive(modalName) {
                return this.shownModals.indexOf(modalName) > -1;
            },

            /**
             * Return all modals that are currently shown.
             *
             * @return array
             */
            shown() {
                return this.shownModals;
            },

            /**
             * Return all modals bound to the current Vue context.
             *
             * @return array
             */
            all() {
                return this.allModals;
            },

            /**
             * Mount a new modal to the state.
             *
             * @return null
             */
            mount(name) {
                if (this.allModals.indexOf(name) == -1) {
                    this.allModals.push(name);
                } else if (options && options.logging) {
                    console.log('The modal name "' + name + '" has already been mounted.');
                }
            }

        }
    }
}
