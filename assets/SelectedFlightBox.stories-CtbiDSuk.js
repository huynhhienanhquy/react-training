import{i as e,s as t}from"./preload-helper-CT_b8DTk.js";import{N as n}from"./iframe-tGAbOaMs.js";import{t as r}from"./jsx-runtime-DqZldVDK.js";import{n as i,t as a}from"./SectionHeader-BdM2Va8n.js";import{n as o,t as s}from"./Card-RSmjGz6O.js";var c,l,u,d=e((()=>{c=t(n(),1),i(),o(),l=r(),u=({airlineName:e,defaultFlightLogo:t,iconHeart:n,legs:r,cancellationPolicy:i})=>{let[o,u]=(0,c.useState)(!1);return(0,l.jsxs)(`div`,{className:`space-y-3`,children:[(0,l.jsx)(a,{title:`Selected flights`}),(0,l.jsxs)(s,{variant:`surface`,className:`p-6 space-y-4`,children:[(0,l.jsxs)(`div`,{className:`flex items-center justify-between`,children:[(0,l.jsxs)(`div`,{className:`flex items-center gap-2.5`,children:[(0,l.jsx)(`img`,{src:t,alt:e,className:`w-5 h-5 object-contain`}),(0,l.jsx)(`span`,{className:`text-sm font-semibold text-slate-600`,children:e})]}),(0,l.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,l.jsx)(`button`,{onClick:()=>u(!o),className:`w-9 h-9 rounded-xl flex items-center justify-center transition p-2 cursor-pointer active:scale-95 ${o?`bg-blue-100`:`bg-surface-section hover:bg-blue-100`}`,children:(0,l.jsx)(`img`,{src:n,alt:`Favorite`,className:`w-4 h-4 object-contain transition-transform ${o?`scale-110`:``}`})}),(0,l.jsx)(`button`,{className:`px-4 py-2 bg-surface-section hover:bg-blue-100 text-blue-600 text-xs font-semibold rounded-xl transition cursor-pointer active:scale-95`,children:`Change Flight`})]})]}),(0,l.jsx)(`div`,{className:`space-y-2 text-xs md:text-sm pt-2`,children:r.map(e=>(0,l.jsxs)(`div`,{className:`flex items-center gap-4`,children:[(0,l.jsx)(`span`,{className:`font-bold text-brand-dark w-24 md:w-32 text-xs md:text-sm`,children:e.times}),(0,l.jsxs)(`span`,{className:`text-slate-400 text-xs md:text-sm`,children:[e.route,` • `,e.duration,` • `,e.stops]})]},e.id))}),(0,l.jsx)(`p`,{className:`text-xs text-slate-400 pt-2 border-t border-slate-100`,children:i})]})]})},u.__docgenInfo={description:``,methods:[],displayName:`SelectedFlightBox`,props:{airlineName:{required:!0,tsType:{name:`string`},description:``},defaultFlightLogo:{required:!0,tsType:{name:`string`},description:``},iconHeart:{required:!0,tsType:{name:`string`},description:``},legs:{required:!0,tsType:{name:`Array`,elements:[{name:`FlightLeg`}],raw:`FlightLeg[]`},description:``},cancellationPolicy:{required:!0,tsType:{name:`string`},description:``}}}})),f,p,m,h,g,_,v,y;e((()=>{d(),f=r(),p=`data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%232563EB"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>`,m=`data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%232563EB" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,h={title:`Fare/SelectedFlightBox`,component:u,decorators:[e=>(0,f.jsx)(`div`,{className:`p-6 bg-slate-50 max-w-xl mx-auto`,children:(0,f.jsx)(e,{})})],argTypes:{airlineName:{control:`text`},cancellationPolicy:{control:`text`}}},g={args:{airlineName:`Qatar Airways`,defaultFlightLogo:p,iconHeart:m,cancellationPolicy:`Refundable up to 24 hours before departure (fee may apply).`,legs:[{id:`leg-1`,times:`08:30 - 14:15`,route:`SGN - DOH`,duration:`7h 45m`,stops:`Non-stop`},{id:`leg-2`,times:`18:00 - 06:20 (+1)`,route:`DOH - SGN`,duration:`8h 20m`,stops:`Non-stop`}]}},_={args:{airlineName:`Vietnam Airlines`,defaultFlightLogo:p,iconHeart:m,cancellationPolicy:`Non-refundable. Ticket change allowed with a fee.`,legs:[{id:`leg-1`,times:`10:00 - 12:15`,route:`HAN - DAD`,duration:`2h 15m`,stops:`Direct`}]}},v={args:{airlineName:`Emirates`,defaultFlightLogo:p,iconHeart:m,cancellationPolicy:`Free cancellation within 24 hours of booking.`,legs:[{id:`leg-1`,times:`23:55 - 11:30 (+1)`,route:`SGN - DXB - LHR`,duration:`15h 35m`,stops:`1 Stop (DXB)`}]}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    airlineName: 'Qatar Airways',
    defaultFlightLogo: MOCK_AIRLINE_LOGO,
    iconHeart: MOCK_HEART_ICON,
    cancellationPolicy: 'Refundable up to 24 hours before departure (fee may apply).',
    legs: [{
      id: 'leg-1',
      times: '08:30 - 14:15',
      route: 'SGN - DOH',
      duration: '7h 45m',
      stops: 'Non-stop'
    }, {
      id: 'leg-2',
      times: '18:00 - 06:20 (+1)',
      route: 'DOH - SGN',
      duration: '8h 20m',
      stops: 'Non-stop'
    }]
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    airlineName: 'Vietnam Airlines',
    defaultFlightLogo: MOCK_AIRLINE_LOGO,
    iconHeart: MOCK_HEART_ICON,
    cancellationPolicy: 'Non-refundable. Ticket change allowed with a fee.',
    legs: [{
      id: 'leg-1',
      times: '10:00 - 12:15',
      route: 'HAN - DAD',
      duration: '2h 15m',
      stops: 'Direct'
    }]
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    airlineName: 'Emirates',
    defaultFlightLogo: MOCK_AIRLINE_LOGO,
    iconHeart: MOCK_HEART_ICON,
    cancellationPolicy: 'Free cancellation within 24 hours of booking.',
    legs: [{
      id: 'leg-1',
      times: '23:55 - 11:30 (+1)',
      route: 'SGN - DXB - LHR',
      duration: '15h 35m',
      stops: '1 Stop (DXB)'
    }]
  }
}`,...v.parameters?.docs?.source}}},y=[`RoundTrip`,`OneWay`,`MultiStop`]}))();export{v as MultiStop,_ as OneWay,g as RoundTrip,y as __namedExportsOrder,h as default};