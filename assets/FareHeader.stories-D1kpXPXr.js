import{i as e}from"./preload-helper-CT_b8DTk.js";import{N as t}from"./iframe-tGAbOaMs.js";import{t as n}from"./jsx-runtime-DqZldVDK.js";import{n as r,t as i}from"./PriceDisplay-orkjrZI7.js";import{n as a,t as o}from"./Card-RSmjGz6O.js";var s,c,l=e((()=>{t(),a(),r(),s=n(),c=({destination:e,tripType:t,cabinClass:n,price:r,priceUnit:a})=>(0,s.jsxs)(o,{variant:`surface`,className:`p-6 flex items-center justify-between`,children:[(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`h2`,{className:`text-xl md:text-2xl font-bold text-brand-dark`,children:e}),(0,s.jsxs)(`p`,{className:`text-xs md:text-sm text-slate-400 font-medium mt-1`,children:[t,` • `,n]})]}),(0,s.jsxs)(`div`,{className:`text-right`,children:[(0,s.jsx)(i,{amount:`$${r}`,size:`md`}),(0,s.jsx)(`p`,{className:`text-xs text-slate-400 mt-0.5`,children:a})]})]}),c.__docgenInfo={description:``,methods:[],displayName:`FareHeader`,props:{destination:{required:!0,tsType:{name:`string`},description:``},tripType:{required:!0,tsType:{name:`string`},description:``},cabinClass:{required:!0,tsType:{name:`string`},description:``},price:{required:!0,tsType:{name:`number`},description:``},priceUnit:{required:!0,tsType:{name:`string`},description:``}}}})),u,d,f,p,m,h;e((()=>{l(),u=n(),d={title:`Fare/FareHeader`,component:c,decorators:[e=>(0,u.jsx)(`div`,{className:`p-6 bg-slate-50 max-w-2xl mx-auto`,children:(0,u.jsx)(e,{})})],argTypes:{destination:{control:`text`},tripType:{control:`text`},cabinClass:{control:`text`},price:{control:{type:`number`,min:0}},priceUnit:{control:`text`}}},f={args:{destination:`Lagos to Owerri`,tripType:`Round trip`,cabinClass:`Economy Class`,price:320,priceUnit:`per passenger`}},p={args:{destination:`Tokyo to Paris`,tripType:`Round trip`,cabinClass:`Business Class`,price:2450,priceUnit:`total base fare`}},m={args:{destination:`Da Nang to Hanoi`,tripType:`One way`,cabinClass:`Economy Class`,price:85,priceUnit:`incl. taxes & fees`}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    destination: 'Lagos to Owerri',
    tripType: 'Round trip',
    cabinClass: 'Economy Class',
    price: 320,
    priceUnit: 'per passenger'
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    destination: 'Tokyo to Paris',
    tripType: 'Round trip',
    cabinClass: 'Business Class',
    price: 2450,
    priceUnit: 'total base fare'
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    destination: 'Da Nang to Hanoi',
    tripType: 'One way',
    cabinClass: 'Economy Class',
    price: 85,
    priceUnit: 'incl. taxes & fees'
  }
}`,...m.parameters?.docs?.source}}},h=[`RoundTrip`,`BusinessClass`,`OneWay`]}))();export{p as BusinessClass,m as OneWay,f as RoundTrip,h as __namedExportsOrder,d as default};