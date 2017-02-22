
<template>
	<li :id="id" class="itm" @click="_selectOption()" :class="{active: selected, disabled: disabled}" >
		<slot>
			<span class="txt">{{name}}</span>
			<i class="u-icon-tickblue"></i>
		</slot>
	</li>
</template>

<script type="text/javascript">
	module.exports = {
		name: 'sf-option',
		componentName: 'option',
		computed: {
			selected: function(){
				return this.$parent.selected.id == this.id;
			}
		},
		props: {
			id: [String, Number],
			name: String,
			disabled: {
				type: Boolean,
				default: false
			} 
		},
		data() {
			return {};
		},
		methods: {
			_selectOption() {
				if(this.disabled) return;
				this.dispatch('select', 'selectOption', this);
			},
			dispatch(componentName, eventName, params) {
			  var parent = this.$parent || this.$root;
			  var name = parent.$options.componentName;
			  while (parent && (!name || name !== componentName)) {
			    parent = parent.$parent;
			    if (parent) {
			      name = parent.$options.componentName;
			    }
			  }
			  if (parent) {
			    parent.$emit.apply(parent, [eventName].concat(params));
			  }
			}
		},
		created() {
      		
      	}
	}
</script>