import Modal from './components/modal.vue';

const install = function (Vue, options) {
    Vue.component('vue-modal', Modal);

    Vue.prototype.$modals = {
        /**
         * Modals that are currently shown.
         *
         * @var array
         */
        shownModals: new Array(),

        /**
         * All modals loaded to the view app.
         *
         * @var array
         */
        allModals: new Array(),

        /**
         * Shows a named modal.
         *
         * @param string modalName
         *
         * @return void
         */
        show: function (modalName) {
            this.shownModals.indexOf(modalName) == -1 ? this.shownModals.push(modalName) : null;
            if (options && options.logging) {
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
        hide: function (modalNames) {
            /* Removes the scroll lock */
            document.body.classList.remove('v-modal__no-scroll');

            if (modalNames.constructor === Array) {
                var _this = this;
                modalNames.forEach(function (modalName) {
                    var ind = _this.shownModals.indexOf(modalName);
                    _this.shownModals.splice(ind, 1);
                });
            } else {
                var ind = this.shownModals.indexOf(modalNames);
                this.shownModals.splice(ind, 1);
            }
            if (options && options.logging) {
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
        isActive: function (modalName) {
            return this.shownModals.indexOf(modalName) > -1;
        },

        /**
         * Return all modals that are currently shown.
         *
         * @return array
         */
        shown: function () {
            return this.shownModals;
        },

        /**
         * Return all modals bound to the current Vue context.
         *
         * @return array
         */
        all: function () {
            return this.allModals;
        },

        /**
         * Mount a new modal to the state.
         *
         * @return null
         */
        mount: function (name) {
            if (this.allModals.indexOf(name) == -1) {
                this.allModals.push(name);
            } else if (options && options.logging) {
                console.log('The modal name "' + name + '" has already been mounted.');
            }
        }

    }
}

export default install;
