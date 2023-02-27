## What is it?
It's a simple package to work with masks on input fields.

## Installing
Run the following command to install it

```
$ npm i masked-text-field
```

## Usage
The mask function works replacing all the "#" (pound) signs for **numbers or letters**. For example, if we need a mask for dd/mm/yyyy we would use this pattern: `##/##/####`. Note that are no distinction between numbers or letters, it can replace both.

> A important thing to understand is that no regular expression validations are being made. The functionality of this package will only replace all the pound signs with the values provided until the mask is fullfiled. That been said, let's get started!

#### Vanilla JS
To make it work with vanilla javascript I'll be using `HTML data-* attributes`. Just to be clear, this is not a rule!

In your input field, set this `data-mask` property. It will help us to add an event listener to this element.

```html
  <input data-mask="(##) # ####-####"/>
```

And in your .js file
```js
  import useMask from 'masked-text-field';

  let inputs = document.querySelectorAll('input[data-mask]');

  inputs.forEach(input => input.addEventListener('input', ({target: element}) => {
    element.value = useMask(element.dataset.mask, element.value, element.dataset?.type)
  }));
```

Here I used the `CSS property selector` to get all inputs. Then I added an event listener for each of then, which is triggered on each input event. The value been set to the input will be the result of useMask function, which receives a mask, a value and a type, this last one is optional and can be `text` or `number`, being `number` the default value.

> Tip: If you stick with the "number" type option, only numbers will be accepted in the input field

Here some examples with the data-type property

```html
  <input placeholder="___.___.___-__" data-mask="###.###.###-##" data-type="number" />   // 123.456.789-00
  <input placeholder="_____-___" data-mask="#####-##" data-type="number" />              // 69312-123
  <input placeholder="__/__/____" data-mask="##/##/####" data-type="number" />           // 26/02/2023
  <input placeholder="___/__" data-mask="###/##" data-type="text" />                     // feb/23
  <input placeholder="--:--" data-mask="##:##" data-type="number" />                     // 18:31
```

#### VueJS
If you are a Vue developer like me you can create your own component to make it reusable. I'll show you the simpler way first.

```vue
  <script setup>
    // Composition API
    import { ref } from 'vue';
    import useMask from 'masked-text-field';

    const contact = ref(null);
    const mask = "+## (##) # ####-####";

    function replaceWithMask() {
      contact.value = useMask(mask, contact.value)
    }

    // Options API
    // export default {
    //   data() {
    //     return {
    //       contact: null,
    //       mask: "+## (##) # ####-####"
    //     }
    //   },
    //   methods: {
    //     replaceWithMask() {
    //       this.contact = useMask(this.mask, this.contact)
    //     }
    //   }
    // }
  </script>

  <template>
    <input v-model="contact" @input="replaceWithMask" :mask="mask">
  </template>
```
Using the `@input` directive we can call the replaceWithMask function to update the contact ref. This function is doing the same thing we did inside the event listener callback of the previous example.

#### Vuetify
The downside of the previous example is that if you have more forms that needs a input with mask you'll find your self copying and paste this `replaceWithMask` function in those files. So now we're going to create a custom input component.

As I've been working with Vuetify 3 I'll be using it in this example

First, let's create a SFC, I'll call it of VMaskedTextField.vue

```vue
<script setup>
  import useMask from "masked-text-field";

  const { mask, type } = defineProps(["mask", "modelValue", "type"]);
  const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <v-text-field :value="modelValue" @input="emit("update:modelValue", useMask(mask, $event.target.value, type))" :maxlength="mask.length">
    <!-- slots -->
  </v-text-field>
</template>
```

Two important things are being done here. The first is the definition of our props. And the second is the use of the emit function to update the value received into our masked value.

> If you're not familiar on how to create components using v-model, I encorage you to check [this section](https://vuejs.org/guide/components/v-model.html) of vue documention.


And now we can reuse this component wherever we want. Nice and easy :)

```vue
<script setup>
  import { ref } from vue;
  import { VMaskedTextField } from 'path-to-your-components/VMaskedTextField';

  const contact = ref(null);
</script>

<template>
  <!-- form -->
    <v-masked-text-field
      label="Contact"
      type="number"
      v-model="contact"
      :rules="[required]"
      mask="+## (##) # ####-####"
      placeholder="+__ (__) _ ____-____"
    >
    </v-masked-text-field>
  <!-- others inputs -->
</template>
```

And that's it, hope that fill your needs ;)