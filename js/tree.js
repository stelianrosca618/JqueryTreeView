import Treeselect from '../lib/treeselect-js.js';
const options = [{
    name: 'JavaScript',
    value: 'JavaScript',
    children: [{
        name: 'React',
        value: 'React',
        children: []
    }, {
        name: 'Vue',
        value: 'Vue',
        children: []
    }, {
        name: 'Angular',
        value: 'Angular',
        children: []
    }]
}, {
    name: 'HTML',
    value: 'html',
    children: [{
        name: 'HTML5',
        value: 'HTML5',
        children: []
    }, {
        name: 'XML',
        value: 'XML',
        children: []
    }]
}]
const slot = document.createElement('div')
slot.innerHTML = '<a class="test" href="">Add new element</a>'
const domEl = document.querySelector('.treeselect-test')
const treeselect = new Treeselect({
    parentHtmlContainer: domEl,
    value: [],
    options: options,
    alwaysOpen: false,
    showTags: true,
    appendToBody: true,
    listSlotHtmlComponent: null,
    disabled: false,
    isGroupedValue: true,
    expandSelected: true,
    isIndependentNodes: true,
    emptyText: 'No data text',
})
treeselect.srcElement.addEventListener('input', (e) => {
  
  e.detail.map(valItem => {
    let optionItem = null
    var iCounter = 0;
    for(iCounter = 0; iCounter < treeselect.options.length; iCounter++){
      optionItem = searchTree(treeselect.options[iCounter], valItem);
      if(optionItem != null && optionItem != undefined) {break ; }
    }
  const elementSrc = `<div class="treeselect-input__tags-element" tabindex="-1" tag-id="${optionItem.value}" title="${optionItem.name}">
    <span class="treeselect-input__tags-name">${optionItem.name}</span>
    <span class="treeselect-input__tags-cross">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 25 25" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </span>
    </div>`;
    treeselect.srcElement.querySelector('.treeselect-input__tags').innerHTML += elementSrc;
  })

})

treeselect.srcElement.addEventListener('close', (e) => {
  // ...
  console.log('close', e);
})


function searchTree(element, matchingTitle){
  
  if(element.value == matchingTitle){
       return element;
  }else if (element.value != matchingTitle && element.children.length > 0){
       let i = 0;
       let result = null;
       for(i=0; i < element.children.length; i++){
            result = searchTree(element.children[i], matchingTitle);
            if(result != null && result != undefined){
              break;
            }
       }
       return result;
       
  }
}