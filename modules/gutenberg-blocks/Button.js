/* register action method */
import { S, store, tick } from '~/plugins/soyuz-store-api';
import { transformer } from '~/plugins/soyuz-walker';
import { runAction } from '~/plugins/soyuz-actions-api';
const action = (e, attrs) => {
  runAction(attrs)
};
export default {
  // functional: true,
  props: {
    blockAttrs: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    attrs() { 
      if(this.blockAttrs.watch){
        /* Hack to run reactivity with store */
        this.blockAttrs.tick = tick.value
        console.log('button', transformer(this.blockAttrs,'', this.blockAttrs))
        return Object.assign({}, transformer(this.blockAttrs,'', this.blockAttrs))
      }
      return this.blockAttrs;
    },
  },
  render(h) {
    return  (
      <div onClick={(e) => action(e, this.attrs)} class={[this.attrs?.className]}>
      	<span>{this.attrs?.content}</span>
      </div>
    );
  },
};