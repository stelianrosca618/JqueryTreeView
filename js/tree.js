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
    isGroupedValue: false,
    expandSelected: true,
    isIndependentNodes: false,
    emptyText: 'No data text',
})
treeselect.srcElement.addEventListener('input', (e) => {
  console.log("getting Values", treeselect.value);
})
