/*
  SOJUZ TARGETER
*/
import { runActions } from '~/plugins/soyuz-actions-api';
import { S, store, setTick } from '~/plugins/soyuz-store-api';

export const action = (e, attrs) => {
	if(attrs.actions){
		e.preventDefault();
  		e.stopPropagation();
  		// getClick(e, attrs)
  		attrs.actions ? runActions(attrs.actions) : null
	}
};

export const getClick = (e,attrs) =>{
	setTick()
	refreshBlockPaths(attrs);
	const box = cumulativeOffset(e.target)
	S.set({source:'native_click',value:{...attrs, box}})
	console.log('store', store)
}

var cumulativeOffset = function(element) {
	var rect = element.getBoundingClientRect();
	var top = 0,left = 0;
	do {
		top += element.offsetTop || 0;
		left += element.offsetLeft || 0;
		element = element.offsetParent;
	} while (element);
	return {
		top: top,
		left: left,
		w: rect.width,
		h: rect.height,
	};
};

/* refreshBlockPaths block path properties */
export const refreshBlockPaths = (attrs) => {
	const p = S.get({source:'pages',query_variables:{slug:attrs.source_slug}})[0]
	p.blocks = p.blocks.map((b, i) => genBlockPath(b, [i]))
	S.push({source:'pages',query_variables:{slug:attrs.source_slug}, value:p})
};

/* generate block path properties */
export const genBlockPath = (block, __blockPath = []) => {
  return {
    ...block,
    attrs: { ...block?.attrs, __blockPath },
    ...(block.innerBlocks && { innerBlocks: block.innerBlocks.map((b, i) => genBlockPath(b, [...__blockPath, i])) })

  }
};

/* sync path to gutenberg model */
export const fixPath = (p) => {
  return p
    .flatMap((el) => {
      return [el, 'innerBlocks'];
    })
    .slice(0, -1);
};