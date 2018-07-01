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

##### Hooks
There are life cycle hooks that can be utilized to run actions at different points in the modals life.
- onClose: Runs right before the close modal event is emitted
- onShow: Runs after the modal have been rerendered to the screen.

### Props

| Prop           | Description                                         | Value                                 |
|--------------------------------------------------------------------------------------------------------------|
| name           | The name of the modal. Used to show and hide modal. | String                                |
| size           | The size of the modal                               | sm, md, lg                            |
| width          | A fixed width for the modal                         | Number                                |
| height         | A fixed height for the modal                        | Number                                |
| theme          | Css styles to be applied directly                   | String                                |
| transitionName | The style of transition                             | zoom-in, zoom-out, fade, slide-in-top |
| onClose        | A function that runs when a modal closes            | Function                              |
| onShow         | A function that runs when a modal is shown          | Function                              |

## License
This project is covered under the MIT License. Feel free to use it wherever you like.
