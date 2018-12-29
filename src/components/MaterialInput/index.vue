<template>
  <div class="van-hairline--bottom material-input__component" :class="computedClasses">
    <input v-if="type === 'email'" type="email" class="material-input" :name="name" :id="id" :placeholder="placeholder" v-model="valueCopy" :readonly="readonly" :disabled="disabled" :autocomplete="autocomplete" :required="required" @focus="handleFocus(true)" @blur="handleFocus(false)" @input="handleModelInput">
    <input v-if="type === 'url'" type="url" class="material-input" :name="name" :id="id" :placeholder="placeholder" v-model="valueCopy" :readonly="readonly" :disabled="disabled" :autocomplete="autocomplete" :required="required" @focus="handleFocus(true)" @blur="handleFocus(false)" @input="handleModelInput">
    <input v-if="type === 'number'" type="number" class="material-input" :name="name" :id="id" :placeholder="placeholder" v-model="valueCopy" :readonly="readonly" :disabled="disabled" :autocomplete="autocomplete" :max="max" :min="min" :step="step" :minlength="minlength" :maxlength="maxlength" :required="required" @focus="handleFocus(true)" @blur="handleFocus(false)" @input="handleModelInput">
    <input v-if="type === 'password'" type="password" class="material-input" :name="name" :id="id" :placeholder="placeholder" v-model="valueCopy" :readonly="readonly" :disabled="disabled" :autocomplete="autocomplete" :max="max" :min="min" :step="step" :required="required" @focus="handleFocus(true)" @blur="handleFocus(false)" @input="handleModelInput">
    <input v-if="type === 'tel'" type="tel" class="material-input" :name="name" :id="id" :placeholder="placeholder" v-model="valueCopy" :readonly="readonly" :disabled="disabled" :autocomplete="autocomplete" :required="required" @focus="handleFocus(true)" @blur="handleFocus(false)" @input="handleModelInput">
    <input v-if="type === 'text'" type="text" class="material-input" :name="name" :id="id" :placeholder="placeholder" v-model="valueCopy" :readonly="readonly" :disabled="disabled" :autocomplete="autocomplete" :minlength="minlength" :maxlength="maxlength" :required="required" @focus="handleFocus(true)" @blur="handleFocus(false)" @input="handleModelInput">
    
    <span class="material-input-bar"></span>
    
    <label class="material-label">
      <slot></slot>
    </label>

    <div v-if="errorMessages" class="material-errors">
      <div v-for="(error,index) in computedErrors" class="material-error" :key="index">{{ error }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'material-input',
  computed: {
    computedErrors() {
      return typeof this.errorMessages === 'string' ? [this.errorMessages] : this.errorMessages
    },
    computedClasses() {
      return {
        'material--active': this.focus,
        'material--disabled': this.disabled,
        'material--has-errors': Boolean(!this.valid || (this.errorMessages && this.errorMessages.length)),
        'material--raised': Boolean(
          this.focus ||
          this.valueCopy || // has value
            (this.placeholder && !this.valueCopy)
        ) // has placeholder
      }
    }
  },
  data() {
    return {
      valueCopy: null,
      focus: false,
      valid: true
    }
  },
  beforeMount() {
    // Here we are following the Vue2 convention on custom v-model:
    // https://github.com/vuejs/vue/issues/2873#issuecomment-223759341
    this.copyValue(this.value)
  },
  methods: {
    handleModelInput(event) {
      if (this.type === 'number' && this.valueCopy.length > this.maxlength) {
        this.valueCopy = event.target.value = event.target.value.slice(0, this.maxlength)
      }
      this.$emit('input', event.target.value, event)
      this.handleValidation()
    },
    handleFocus(focused) {
      this.focus = focused
      if (focused == true) {
        this.$emit('focus', focused)
      } else {
        this.$emit('blur', focused)
      }
    },
    handleValidation() {
      this.valid = this.$el ? this.$el.querySelector('.material-input').validity.valid : this.valid
    },
    copyValue(value) {
      this.valueCopy = value
      this.handleValidation()
    }
  },
  watch: {
    value: {
      handler(newValue) {
        // This watch works from the code side of the 2-way-binding:
        this.copyValue(newValue)
      },
      immediate: true
    }
  },
  props: {
    id: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: 'text'
    },
    value: {
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    min: {
      type: String,
      default: null
    },
    max: {
      type: String,
      default: null
    },
    step: {
      type: Number,
      default: null
    },
    minlength: {
      type: Number,
      default: null
    },
    maxlength: {
      type: Number,
      default: null
    },
    required: {
      type: Boolean,
      default: true
    },
    autocomplete: {
      type: String,
      default: null
    },
    errorMessages: {
      type: [Array, String],
      default: null
    }
  }
}
</script>

<style <style lang="less">
.material-input__component .material-input-bar:after,
.material-input__component .material-input-bar:before {
  content: '';
  height: 1px;
  width: 0;
  bottom: 0;
  position: absolute;
  transition: 0.2s ease all;
}
.material-input__component {
  margin-top: 25px;
  position: relative;
  background: white;
  * {
    box-sizing: border-box;
  }
  .material-input {
    font-size: 16px;
    padding: 10px 10px 10px 5px;
    display: block;
    width: 100%;
    border: none;
    border-radius: 0;
    background: none;
    color: black;
    border-bottom: 1px solid #ebedf0;
    &:focus {
      outline: none;
      border: none;
      border-bottom: 1px solid transparent;
    }
  }
  .material-label {
    font-size: 16px;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 0;
    top: 10px;
    transition: 0.2s ease all;
    color: #9e9e9e;
  }
  .material-input-bar {
    position: relative;
    display: block;
    width: 100%;
    &:before {
      left: 50%;
    }
    &:after {
      right: 50%;
    }
  }
  &.material--disabled {
    .material-input {
      border-bottom-style: dashed;
    }
  }
  &.material--raised {
    .material-label {
      top: -20px;
      font-size: 14px;
    }
  }
  .material-errors {
    position: relative;
    overflow: hidden;
    .material-error {
      font-size: 12px;
      line-height: 14px;
      overflow: hidden;
      margin-top: 0;
      padding-top: 5px;
      padding-right: 5px;
      padding-left: 0;
    }
  }
  &.material--active {
    .material-label {
      color: #2196f3;
    }
  }
  &.material--has-errors {
    &.material--active {
      .material-label {
        color: #f44336;
      }
    }
    .material-errors {
      color: #f44336;
    }
  }
}
.material-input__component.material--active .material-input-bar:before,
.material-input__component.material--active .material-input-bar:after {
  width: 50%;
}
.material-input__component .material-input-bar:before,
.material-input__component .material-input-bar:after {
  background: #2196f3;
}
.material-input__component.material--has-errors .material-input-bar:before,
.material-input__component.material--has-errors .material-input-bar:after {
  background: #f44336;
}
</style>
