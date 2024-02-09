"use strict";(globalThis.webpackChunkgutenberg=globalThis.webpackChunkgutenberg||[]).push([[3134],{"./packages/components/src/utils/space.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{D:()=>space});const GRID_BASE="4px";function space(value){if(void 0===value)return;if(!value)return"0";const asInt="number"==typeof value?value:Number(value);return"undefined"!=typeof window&&window.CSS?.supports?.("margin",value.toString())||Number.isNaN(asInt)?value.toString():`calc(${GRID_BASE} * ${value})`}},"./packages/components/src/custom-select-control-v2/stories/index.story.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Controlled:()=>Controlled,Default:()=>Default,MultiSelect:()=>MultiSelect,__namedExportsOrder:()=>__namedExportsOrder,default:()=>index_story});var react=__webpack_require__("./node_modules/react/index.js"),FMVHAVXA=__webpack_require__("./node_modules/@ariakit/react-core/esm/__chunks/FMVHAVXA.js"),NUNVG4IK=__webpack_require__("./node_modules/@ariakit/react-core/esm/__chunks/NUNVG4IK.js"),select_item_check=__webpack_require__("./node_modules/@ariakit/react-core/esm/select/select-item-check.js"),build_module=__webpack_require__("./packages/i18n/build-module/index.js"),emotion_styled_base_browser_esm=__webpack_require__("./node_modules/@emotion/styled/base/dist/emotion-styled-base.browser.esm.js"),select_label=__webpack_require__("./node_modules/@ariakit/react-core/esm/select/select-label.js"),select_select=__webpack_require__("./node_modules/@ariakit/react-core/esm/select/select.js"),select_popover=__webpack_require__("./node_modules/@ariakit/react-core/esm/select/select-popover.js"),select_item=__webpack_require__("./node_modules/@ariakit/react-core/esm/select/select-item.js"),colors_values=__webpack_require__("./packages/components/src/utils/colors-values.js"),space=__webpack_require__("./packages/components/src/utils/space.ts");const CustomSelectLabel=(0,emotion_styled_base_browser_esm.Z)(select_label.n,{target:"e1p3eej73"})("font-size:11px;font-weight:500;line-height:1.4;text-transform:uppercase;margin-bottom:",(0,space.D)(2),";"),inputHeights={default:40,small:24},CustomSelectButton=(0,emotion_styled_base_browser_esm.Z)(select_select.P,{shouldForwardProp:prop=>"hasCustomRenderProp"!==prop,target:"e1p3eej72"})((({size,hasCustomRenderProp})=>{const isSmallSize="small"===size&&!hasCustomRenderProp,heightProperty=hasCustomRenderProp?"minHeight":"height";return{display:"flex",justifyContent:"space-between",alignItems:"center",backgroundColor:colors_values.D.white,border:`1px solid ${colors_values.D.gray[600]}`,borderRadius:(0,space.D)(.5),cursor:"pointer",width:"100%",[heightProperty]:`${inputHeights[size]}px`,padding:isSmallSize?(0,space.D)(2):(0,space.D)(4),fontSize:isSmallSize?"11px":"13px","&[data-focus-visible]":{outlineStyle:"solid"},'&[aria-expanded="true"]':{outlineStyle:`1.5px solid ${colors_values.D.theme.accent}`}}}),""),CustomSelectPopover=(0,emotion_styled_base_browser_esm.Z)(select_popover.v,{target:"e1p3eej71"})("border-radius:",(0,space.D)(.5),";background:",colors_values.D.white,";border:1px solid ",colors_values.D.gray[900],";"),CustomSelectItem=(0,emotion_styled_base_browser_esm.Z)(select_item.Q,{target:"e1p3eej70"})("display:flex;align-items:center;justify-content:space-between;padding:",(0,space.D)(2),";&[data-active-item]{background-color:",colors_values.D.gray[300],";}");var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const CustomSelectContext=(0,react.createContext)(void 0);function defaultRenderSelectedValue(value){return(Array.isArray(value)?0===value.length:null==value)?(0,build_module.__)("Select an item"):Array.isArray(value)?1===value.length?value[0]:(0,build_module.gB)((0,build_module.__)("%s items selected"),value.length):value}function CustomSelect({children,defaultValue,label,onChange,size="default",value,renderSelectedValue,...props}){const store=FMVHAVXA.I({setValue:nextValue=>onChange?.(nextValue),defaultValue,value,virtualFocus:!1}),{value:currentValue}=store.useState(),computedRenderSelectedValue=null!=renderSelectedValue?renderSelectedValue:defaultRenderSelectedValue;return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(CustomSelectLabel,{store,children:label}),(0,jsx_runtime.jsxs)(CustomSelectButton,{...props,size,hasCustomRenderProp:!!renderSelectedValue,store,children:[computedRenderSelectedValue(currentValue),(0,jsx_runtime.jsx)(NUNVG4IK.n,{})]}),(0,jsx_runtime.jsx)(CustomSelectPopover,{gutter:12,store,sameWidth:!0,children:(0,jsx_runtime.jsx)(CustomSelectContext.Provider,{value:{store},children})})]})}function custom_select_control_v2_CustomSelectItem({children,...props}){const customSelectContext=(0,react.useContext)(CustomSelectContext);return(0,jsx_runtime.jsxs)(CustomSelectItem,{store:customSelectContext?.store,...props,children:[null!=children?children:props.value,(0,jsx_runtime.jsx)(select_item_check.v,{})]})}custom_select_control_v2_CustomSelectItem.displayName="CustomSelectItem";try{CustomSelect.displayName="CustomSelect",CustomSelect.__docgenInfo={description:"",displayName:"CustomSelect",props:{children:{defaultValue:null,description:"The child elements. This should be composed of CustomSelectItem components.",name:"children",required:!0,type:{name:"ReactNode"}},defaultValue:{defaultValue:null,description:"An optional default value for the control. If left `undefined`, the first\nnon-disabled item will be used.",name:"defaultValue",required:!1,type:{name:"string | string[]"}},label:{defaultValue:null,description:"Label for the control.",name:"label",required:!0,type:{name:"string"}},onChange:{defaultValue:null,description:"A function that receives the new value of the input.",name:"onChange",required:!1,type:{name:"(newValue: string | string[]) => void"}},renderSelectedValue:{defaultValue:null,description:"Can be used to render select UI with custom styled values.",name:"renderSelectedValue",required:!1,type:{name:"(selectedValue: string | string[]) => ReactNode"}},size:{defaultValue:{value:"default"},description:"The size of the control.",name:"size",required:!1,type:{name:"enum",value:[{value:'"small"'},{value:'"default"'}]}},value:{defaultValue:null,description:"Can be used to externally control the value of the control.",name:"value",required:!1,type:{name:"string | string[]"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/components/src/custom-select-control-v2/index.tsx#CustomSelect"]={docgenInfo:CustomSelect.__docgenInfo,name:"CustomSelect",path:"packages/components/src/custom-select-control-v2/index.tsx#CustomSelect"})}catch(__react_docgen_typescript_loader_error){}try{custom_select_control_v2_CustomSelectItem.displayName="CustomSelectItem",custom_select_control_v2_CustomSelectItem.__docgenInfo={description:"",displayName:"CustomSelectItem",props:{value:{defaultValue:null,description:"The value of the select item. This will be used as the children if\nchildren are left `undefined`.",name:"value",required:!0,type:{name:"string"}},children:{defaultValue:null,description:"The children to display for each select item. The `value` will be\nused if left `undefined`.",name:"children",required:!1,type:{name:"ReactNode"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/components/src/custom-select-control-v2/index.tsx#CustomSelectItem"]={docgenInfo:custom_select_control_v2_CustomSelectItem.__docgenInfo,name:"CustomSelectItem",path:"packages/components/src/custom-select-control-v2/index.tsx#CustomSelectItem"})}catch(__react_docgen_typescript_loader_error){}const index_story={title:"Components (Experimental)/CustomSelectControl v2",component:CustomSelect,subcomponents:{CustomSelectItem:custom_select_control_v2_CustomSelectItem},argTypes:{children:{control:{type:null}},renderSelectedValue:{control:{type:null}},value:{control:{type:null}}},parameters:{sourceLink:"packages/components/src/custom-select-control-v2",badges:["wip"],actions:{argTypesRegex:"^on.*"},controls:{expanded:!0},docs:{canvas:{sourceState:"shown"},source:{excludeDecorators:!0}}},decorators:[Story=>(0,jsx_runtime.jsx)("div",{style:{minHeight:"150px"},children:(0,jsx_runtime.jsx)(Story,{})})]},Template=props=>(0,jsx_runtime.jsx)(CustomSelect,{...props});Template.displayName="Template";const ControlledTemplate=props=>{const[value,setValue]=(0,react.useState)();return(0,jsx_runtime.jsx)(CustomSelect,{...props,onChange:nextValue=>{setValue(nextValue),props.onChange?.(nextValue)},value})};ControlledTemplate.displayName="ControlledTemplate";const Default=Template.bind({});Default.args={label:"Label",children:(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(custom_select_control_v2_CustomSelectItem,{value:"Small",children:(0,jsx_runtime.jsx)("span",{style:{fontSize:"75%"},children:"Small"})}),(0,jsx_runtime.jsx)(custom_select_control_v2_CustomSelectItem,{value:"Something bigger",children:(0,jsx_runtime.jsx)("span",{style:{fontSize:"200%"},children:"Something bigger"})})]})};const MultiSelect=Template.bind({});MultiSelect.args={defaultValue:["lavender","tangerine"],label:"Select Colors",renderSelectedValue:currentValue=>Array.isArray(currentValue)?0===currentValue.length?"No colors selected":1===currentValue.length?currentValue[0]:`${currentValue.length} colors selected`:currentValue,children:(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:["amber","aquamarine","flamingo pink","lavender","maroon","tangerine"].map((item=>(0,jsx_runtime.jsx)(custom_select_control_v2_CustomSelectItem,{value:item,children:item},item)))})};const renderControlledValue=gravatar=>{const avatar=`https://gravatar.com/avatar?d=${gravatar}`;return(0,jsx_runtime.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[(0,jsx_runtime.jsx)("img",{style:{maxHeight:"75px",marginRight:"10px"},src:avatar,alt:"","aria-hidden":"true"},avatar),(0,jsx_runtime.jsx)("span",{children:gravatar})]})};renderControlledValue.displayName="renderControlledValue";const Controlled=ControlledTemplate.bind({});Controlled.args={label:"Default Gravatars",renderSelectedValue:renderControlledValue,children:(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:["mystery-person","identicon","wavatar","retro"].map((option=>(0,jsx_runtime.jsx)(custom_select_control_v2_CustomSelectItem,{value:option,children:renderControlledValue(option)},option)))})},Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"props => {\n  return <CustomSelect {...props} />;\n}",...Default.parameters?.docs?.source}}},MultiSelect.parameters={...MultiSelect.parameters,docs:{...MultiSelect.parameters?.docs,source:{originalSource:"props => {\n  return <CustomSelect {...props} />;\n}",...MultiSelect.parameters?.docs?.source},description:{story:"Multiple selection can be enabled by using an array for the `value` and\n`defaultValue` props. The argument of the `onChange` function will also\nchange accordingly.",...MultiSelect.parameters?.docs?.description}}},Controlled.parameters={...Controlled.parameters,docs:{...Controlled.parameters?.docs,source:{originalSource:"props => {\n  const [value, setValue] = useState<string | string[]>();\n  return <CustomSelect {...props} onChange={nextValue => {\n    setValue(nextValue);\n    props.onChange?.(nextValue);\n  }} value={value} />;\n}",...Controlled.parameters?.docs?.source}}};const __namedExportsOrder=["Default","MultiSelect","Controlled"];try{MultiSelect.displayName="MultiSelect",MultiSelect.__docgenInfo={description:"Multiple selection can be enabled by using an array for the `value` and\n`defaultValue` props. The argument of the `onChange` function will also\nchange accordingly.",displayName:"MultiSelect",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/components/src/custom-select-control-v2/stories/index.story.tsx#MultiSelect"]={docgenInfo:MultiSelect.__docgenInfo,name:"MultiSelect",path:"packages/components/src/custom-select-control-v2/stories/index.story.tsx#MultiSelect"})}catch(__react_docgen_typescript_loader_error){}}}]);