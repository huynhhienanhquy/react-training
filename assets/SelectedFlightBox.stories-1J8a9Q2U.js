import{i as e,s as t}from"./preload-helper-CT_b8DTk.js";import{N as n}from"./iframe-C-YwG8bY.js";import{t as r}from"./jsx-runtime-DqZldVDK.js";import{n as i,t as a}from"./SectionHeader-C6q42-yv.js";import{n as o,t as s}from"./Card-CtF7C0k0.js";var c,l,u,d=e((()=>{c=t(n(),1),i(),o(),l=r(),u=({airlineName:e,defaultFlightLogo:t,iconHeart:n,legs:r,cancellationPolicy:i})=>{let[o,u]=(0,c.useState)(!1);return(0,l.jsxs)(`div`,{className:`space-y-3`,children:[(0,l.jsx)(a,{title:`Selected flights`}),(0,l.jsxs)(s,{variant:`surface`,className:`p-6 space-y-4`,children:[(0,l.jsxs)(`div`,{className:`flex items-center justify-between`,children:[(0,l.jsxs)(`div`,{className:`flex items-center gap-2.5`,children:[(0,l.jsx)(`img`,{src:t,alt:e,className:`w-5 h-5 object-contain`}),(0,l.jsx)(`span`,{className:`text-sm font-semibold text-slate-600`,children:e})]}),(0,l.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,l.jsx)(`button`,{onClick:()=>u(!o),className:`w-9 h-9 rounded-xl flex items-center justify-center transition p-2 cursor-pointer active:scale-95 ${o?`bg-blue-100`:`bg-surface-section hover:bg-blue-100`}`,children:(0,l.jsx)(`img`,{src:n,alt:`Favorite`,className:`w-4 h-4 object-contain transition-transform ${o?`scale-110`:``}`})}),(0,l.jsx)(`button`,{className:`px-4 py-2 bg-surface-section hover:bg-blue-100 text-blue-600 text-xs font-semibold rounded-xl transition cursor-pointer active:scale-95`,children:`Change Flight`})]})]}),(0,l.jsx)(`div`,{className:`space-y-2 text-xs md:text-sm pt-2`,children:r.map(e=>(0,l.jsxs)(`div`,{className:`flex items-center gap-4`,children:[(0,l.jsx)(`span`,{className:`font-bold text-brand-dark w-24 md:w-32 text-xs md:text-sm`,children:e.times}),(0,l.jsxs)(`span`,{className:`text-slate-400 text-xs md:text-sm`,children:[e.route,` • `,e.duration,` • `,e.stops]})]},e.id))}),(0,l.jsx)(`p`,{className:`text-xs text-slate-400 pt-2 border-t border-slate-100`,children:i})]})]})},u.__docgenInfo={description:``,methods:[],displayName:`SelectedFlightBox`,props:{airlineName:{required:!0,tsType:{name:`string`},description:``},defaultFlightLogo:{required:!0,tsType:{name:`string`},description:``},iconHeart:{required:!0,tsType:{name:`string`},description:``},legs:{required:!0,tsType:{name:`Array`,elements:[{name:`FlightLeg`}],raw:`FlightLeg[]`},description:``},cancellationPolicy:{required:!0,tsType:{name:`string`},description:``}}}})),f,p,m,h,g;e((()=>{d(),f={title:`Fare/SelectedFlightBox`,component:u},p=[{id:`leg1`,times:`9:15am - 9:15pm`,route:`QOW - LAG`,duration:`9h 24m`,stops:`1 stop`},{id:`leg2`,times:`4:25am - 10:20pm`,route:`LAG - QOW`,duration:`9h 24m`,stops:`1 stop`}],m={args:{airlineName:`AirPeace Airways, Nigerian`,defaultFlightLogo:`https://via.placeholder.com/20`,iconHeart:`https://via.placeholder.com/16`,legs:p,cancellationPolicy:`Free cancellation 24 hours before departure`}},h={args:{airlineName:`Green Africa Airways`,defaultFlightLogo:`https://via.placeholder.com/20`,iconHeart:`https://via.placeholder.com/16`,legs:[{id:`leg3`,times:`6:00am - 8:30am`,route:`LOS - ABV`,duration:`2h 30m`,stops:`Direct`}],cancellationPolicy:`Non-refundable`}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    airlineName: 'AirPeace Airways, Nigerian',
    defaultFlightLogo: 'https://via.placeholder.com/20',
    iconHeart: 'https://via.placeholder.com/16',
    legs: MOCK_LEGS,
    cancellationPolicy: 'Free cancellation 24 hours before departure'
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    airlineName: 'Green Africa Airways',
    defaultFlightLogo: 'https://via.placeholder.com/20',
    iconHeart: 'https://via.placeholder.com/16',
    legs: [{
      id: 'leg3',
      times: '6:00am - 8:30am',
      route: 'LOS - ABV',
      duration: '2h 30m',
      stops: 'Direct'
    }],
    cancellationPolicy: 'Non-refundable'
  }
}`,...h.parameters?.docs?.source}}},g=[`Default`,`DirectFlight`]}))();export{m as Default,h as DirectFlight,g as __namedExportsOrder,f as default};