
import Treeselect from './treeselect-js.js';

let family_api_array=[];
payload = {}
let ajaxRequest = $.ajax({
    type: "POST",
    url: getPredefinedApis,
    data: JSON.stringify(payload),
    success: function (response) {
        if (response.length > 0) {
            let full_family_api_mapping_tmp=[];
            for (let i = 0; i < response.length; i++) {
                let apiId = response[i]["family_api_id"];
                let family_id=response[i]["family_id"];
                let family_value=response[i]["family_value"];
                let api=response[i]["api_name"];
                let family=response[i]["family"];
                let isDefault=response[i]["isdefault"];
                let f_item = {"family":family,"family_value":family_value,"apiId":apiId,"api":api,"isDefault":isDefault};
                full_family_api_mapping_tmp.push(f_item);
            }
            console.log("----------- full_family_api_mapping_tmp ---- "+JSON.stringify(full_family_api_mapping_tmp));
            family_api_array = full_family_api_mapping_tmp;
            assignvar();
        }
        //console.log("ajax ---------------------------- "+full_family_api_mapping_tmp)
        return { ok: true, data: response };
    },
    error: function (error) {
        console.log("Something went wrong");
        console.log(error.responseText);
        return { ok: "false" }
    }
});



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
                children: [{
                name: arrItem.api,
                value: arrItem.apiId,
                children: [],
                }],
            })
        }

    })
    return tmpOptions;
};

function assignvar(){
    const testOption = makeOptions(family_api_array);

    console.log("testOption", testOption);
    const slot = document.createElement('div')
    slot.innerHTML = '<a class="test" href="">Add new element</a>'
    const domEl = document.querySelector('.family_tree')
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
        window.treeValues = treeselect.value;
        console.log("Parent RelationData", e.detail);
        window.treeRelatinVals = e.detail;
    })

}