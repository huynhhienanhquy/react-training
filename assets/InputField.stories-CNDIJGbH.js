import{i as e}from"./preload-helper-CT_b8DTk.js";import{n as t,t as n}from"./InputField-BPvoZ2kx.js";var r,i,a,o,s,c;e((()=>{t(),r={title:`UI/InputField`,component:n,argTypes:{type:{control:`select`,options:[`text`,`email`,`password`]},placeholder:{control:`text`},label:{control:`text`}}},i={args:{label:`Full Name`,type:`text`,placeholder:`Enter your full name`}},a={args:{label:`Email address`,type:`email`,placeholder:`Enter your email`}},o={args:{label:`Password`,type:`password`,placeholder:`Enter your password`}},s={args:{label:`Email address`,type:`email`,value:`user@example.com`,onChange:()=>{}}},i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Full Name',
    type: 'text',
    placeholder: 'Enter your full name'
  }
}`,...i.parameters?.docs?.source}}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Email address',
    type: 'email',
    placeholder: 'Enter your email'
  }
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password'
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Email address',
    type: 'email',
    value: 'user@example.com',
    onChange: () => {}
  }
}`,...s.parameters?.docs?.source}}},c=[`Text`,`Email`,`Password`,`WithValue`]}))();export{a as Email,o as Password,i as Text,s as WithValue,c as __namedExportsOrder,r as default};