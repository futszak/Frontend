/* eslint-disable react/jsx-key */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable complexity */

/* dynamic modules */
import { modules } from '~/nuxt.modules.js';
// import { InnerBlock } from '~/modules/soyuz-core/InnerBlock.js';

export default {
  functional: true,
  props: {
    blocks: {
      type: Object,
      default: () => ({}),
    },
  },
  // eslint-disable-next-line react/display-name
  render(
    h,
    {
      props: {
        blocks: { blockName = '', blockAttrs = {}, attrs = blockAttrs, innerBlocks = [] },
      },
    }
  ) {
    const compName = blockName.replace(/[\/-]/g, '');
    const Block = modules[compName];

    const Attrs = Object.assign({}, attrs, attrs.componentAttrs, { compName });
    delete Attrs.componentAttrs;
    const Tpl = (
      <Block
        blockAttrs={Attrs}
        scopedSlots={{
          default: innerBlocks
            ? () =>
                innerBlocks.map((block, i) =>  (
                  // <InnerBlock r={r} key={i} blocks={{ ...block, attrs: { ...block.attrs } }} />
                  <InnerBlock key={i} blocks={{ ...block, attrs: { ...block.attrs } }} />
                ))
            : null,
        }}
      />
    );
    return Block ? (
      Tpl
    ) : (
      // Vue bug - if we return null but when rendering InnerBlock added some prop
      // eg: ':key="key"' - vue throws error and sometimes duplicate render tree
      <template />
    );
  },
};