import Treeselect from '../lib/treeselect-js.js';
const inputArr1=
[
{"family":"ABC_PARENT_NAME_1","family_value":"abc_parent_value_1","apiId":1,"api":"abc_child_name1","isDefault":"Y"},
{"family":"ABC_PARENT_NAME_1","family_value":"abc_parent_value_1","apiId":2,"api":"abc_child_name2","isDefault":"Y"},
{"family":"ABC_PARENT_NAME_1","family_value":"abc_parent_value_1","apiId":3,"api":"abc_child_name3","isDefault":"Y"},
{"family":"XYZ_PARENT_NAME_1","family_value":"xyz_parent_value_1","apiId":4,"api":"xyz_child_name1","isDefault":"Y"},
{"family":"XYZ_PARENT_NAME_1","family_value":"xyz_parent_value_1","apiId":5,"api":"xyz_child_name2","isDefault":"Y"}
];
function makeOptions(apiArr){
    const tmpOptions = [];
    apiArr.map(arrItem => {
        const existOption = tmpOptions.find(tmpItem => tmpItem.name == arrItem.family);
        if(existOption){
            existOption.children.push({
                name: arrItem.api,
                value: arrItem.apiId,
                children: [],
            })
        }else{
            tmpOptions.push({
                name: arrItem.family,
                value: arrItem.family_value,
                children: [],
            })    
        }
        
    })
    return tmpOptions;
};

const testOption = makeOptions(inputArr1);
console.log("testOption", testOption);

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

let treeValues;
let treeRelatinVals;

const slot = document.createElement('div')
slot.innerHTML = '<a class="test" href="">Add new element</a>'
const domEl = document.querySelector('.treeselect-test')
const treeselect = new Treeselect({
    parentHtmlContainer: domEl,
    value: [],
    options: testOption,
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
  console.log("getting Child Values", treeselect.value);
  treeValues = treeselect.value; 
  console.log("Parent RelationData",  e.detail);
  treeRelatinVals = e.detail;
})

document.getElementById("result-Btn").addEventListener('click', (e) => {
    console.log('Result', treeValues, treeRelatinVals);
})
  

function formSubmitOrButtonClick() {
    console.log('Result', treeValues, treeRelatinVals);
}