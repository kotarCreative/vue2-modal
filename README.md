# Vue Modal
A vue.js component for creating modals. Create modals and fill them with whatever components or HTML you want.

## How to initialize Vue Modal
Vue modal is built as a vue plugin. It can be initialized just as the Vue documentation states.

```javascript
import VueModal from "vue2-modal";

Vue.use(VueModal);
```
## Usage

#### Creation
Vue modals are all accessed and run through the name that is given to a modal.<br>
A modal can be created by giving it a name and a function to run when it's closed.<br>
Modals also contain a slot for the title section. Here is a very simple modal.
```HTML
<vue-modal :on-close="closeModal" name="my-modal">
    <h2 slot="header">Hello World</h2>
    <p>This modal will do stuff.</p>
</vue-modal>
```

#### Show and Hide
Vue modals contains a very simple API for interacting with modals.
- Show Modal: `this.$modals.show("my-modal")`
- Manually close modal: `this.$modals.hide("my-modal")`
- Check if a modal showing:  `this.$modals.isActive("my-modal")`

#### Styling
There are some built in stylings that can be changed or a manual theme can also be applied.
There are three props which are used to change the size of the modals themselves.
1. size (sm, md, lg)
2. width
3. height

To apply custom themes simply create a string of standard css and pass it into the `theme` prop.

## License
This project is covered under the MIT License. Feel free to use it wherever you like.
