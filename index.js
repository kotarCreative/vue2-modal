import Modal from './components/modal.vue'

export default {
    install (Vue, options) {
        Vue.component('vue-modal', Modal);

        Vue.prototype.$modals = {

            modals: [],

            /**
             * Shows a named modal.
             *
             * @param string modalName
             *
             * @return void
             */
            show(modalName) {
                this.modals.indexOf(modalName) == -1 ? this.modals.push(modalName) : null;
                if(options && options.logging) {
                    console.log('show modal: ' + modalName);
                    console.log('all modals: ', this.modals);
                }
            },

            /**
             * Hides a named modal.
             *
             * @param string modalName
             *
             * @return void
             */
            hide(modalName) {
                var ind = this.modals.indexOf(modalName);
                this.modals.splice(ind, 1);
                if(options && options.logging) {
                    console.log('removed modal: ' + modalName);
                    console.log('all modals: ', this.modals);
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
                return this.modals.indexOf(modalName) > -1;
            },

            /**
             * Return all modals that are currently shown.
             *
             * @return array
             */
            all() {
                return this.modals;
            }

        }
    }
}
