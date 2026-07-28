import{i as e}from"./preload-helper-CT_b8DTk.js";import{N as t}from"./iframe-tGAbOaMs.js";import{t as n}from"./jsx-runtime-DqZldVDK.js";import{n as r,t as i}from"./Card-RSmjGz6O.js";import{n as a,t as o}from"./InfoRow-EVUtyYK9.js";var s,c,l=e((()=>{t(),r(),a(),s=n(),c=({pricePerTraveller:e,flightDues:t,taxesAndFees:n,totalAmount:r})=>(0,s.jsxs)(i,{variant:`surface`,className:`p-6 space-y-6 lg:sticky lg:top-24`,children:[(0,s.jsx)(`h3`,{className:`text-lg font-bold text-brand-dark`,children:`Price Details`}),(0,s.jsxs)(`div`,{className:`space-y-4`,children:[(0,s.jsx)(o,{label:`Price per traveller`,value:`$${e}`}),(0,s.jsx)(o,{label:`Flight dues`,value:`$${t}`}),(0,s.jsx)(o,{label:`Taxes and fees`,value:`$${n}`}),(0,s.jsxs)(`div`,{className:`pt-4 border-t border-slate-100 flex justify-between items-center`,children:[(0,s.jsx)(`span`,{className:`font-bold text-brand-dark`,children:`Trip Total`}),(0,s.jsxs)(`span`,{className:`text-xl font-bold text-brand-dark`,children:[`$`,r]})]})]}),(0,s.jsx)(`button`,{className:`w-full py-3.5 bg-surface-section hover:bg-blue-600 hover:text-white text-blue-600 font-semibold text-xs md:text-sm rounded-2xl transition cursor-pointer active:scale-95`,children:`Select booking platform`})]}),c.__docgenInfo={description:``,methods:[],displayName:`PriceDetailsSidebar`,props:{pricePerTraveller:{required:!0,tsType:{name:`number`},description:``},flightDues:{required:!0,tsType:{name:`number`},description:``},taxesAndFees:{required:!0,tsType:{name:`number`},description:``},totalAmount:{required:!0,tsType:{name:`number`},description:``}}}})),u,d,f,p,m,h;e((()=>{l(),u=n(),d={title:`Fare/PriceDetailsSidebar`,component:c,decorators:[e=>(0,u.jsx)(`div`,{className:`p-6 bg-slate-50 max-w-sm mx-auto`,children:(0,u.jsx)(e,{})})],argTypes:{pricePerTraveller:{control:{type:`number`,min:0}},flightDues:{control:{type:`number`,min:0}},taxesAndFees:{control:{type:`number`,min:0}},totalAmount:{control:{type:`number`,min:0}}}},f={args:{pricePerTraveller:320,flightDues:45,taxesAndFees:35,totalAmount:400}},p={args:{pricePerTraveller:1280,flightDues:180,taxesAndFees:140,totalAmount:1600}},m={args:{pricePerTraveller:199,flightDues:0,taxesAndFees:21,totalAmount:220}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    pricePerTraveller: 320,
    flightDues: 45,
    taxesAndFees: 35,
    totalAmount: 400
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    pricePerTraveller: 1280,
    // Cho 4 người
    flightDues: 180,
    taxesAndFees: 140,
    totalAmount: 1600
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    pricePerTraveller: 199,
    flightDues: 0,
    taxesAndFees: 21,
    totalAmount: 220
  }
}`,...m.parameters?.docs?.source}}},h=[`SingleTraveller`,`FamilyGroup`,`DiscountedFare`]}))();export{m as DiscountedFare,p as FamilyGroup,f as SingleTraveller,h as __namedExportsOrder,d as default};