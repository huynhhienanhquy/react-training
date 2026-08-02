import{i as e,s as t}from"./preload-helper-CT_b8DTk.js";import{N as n}from"./iframe-BbWVxoOj.js";import{t as r}from"./jsx-runtime-DqZldVDK.js";import{t as i,w as a}from"./lucide-react-Bn36gJJk.js";import{n as o,t as s}from"./SectionHeader-D2qnBzio.js";import{n as c,t as l}from"./PriceDisplay-D9BTFBdv.js";var u,d,f=e((()=>{i(),o(),c(),u=r(),d=({fareOptions:e,selectedFareId:t,defaultFlightLogo:n,onSelectFare:r})=>(0,u.jsxs)(`div`,{className:`space-y-3`,children:[(0,u.jsx)(s,{title:`Select fare`}),(0,u.jsx)(`div`,{className:`grid grid-cols-1 md:grid-cols-2 gap-4`,children:e.map(e=>{let i=t===e.id;return(0,u.jsxs)(`div`,{className:`bg-surface p-6 rounded-3xl border transition-all shadow-sm flex flex-col justify-between space-y-6 ${i?`border-blue-500 ring-2 ring-blue-500/20`:`border-slate-100`}`,children:[(0,u.jsxs)(`div`,{className:`space-y-4`,children:[(0,u.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,u.jsx)(`img`,{src:n,alt:e.airline,className:`w-4 h-4 object-contain`}),(0,u.jsx)(`span`,{className:`text-xs font-medium text-slate-500`,children:e.airline})]}),(0,u.jsxs)(`div`,{children:[(0,u.jsx)(l,{amount:`$${e.price}`,size:`md`,className:`text-brand-dark`}),(0,u.jsx)(`div`,{className:`text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5`,children:e.name})]}),(0,u.jsx)(`ul`,{className:`space-y-3 text-xs text-slate-500`,children:e.features.map((e,t)=>(0,u.jsxs)(`li`,{className:`flex items-center gap-2`,children:[(0,u.jsx)(a,{className:`w-4 h-4 text-slate-400 shrink-0`}),(0,u.jsx)(`span`,{children:e})]},t))})]}),(0,u.jsx)(`button`,{onClick:()=>r(e.id),className:`w-full py-3 rounded-2xl text-xs font-bold transition cursor-pointer active:scale-95 ${i?`bg-blue-600 text-white`:`bg-surface-section text-blue-600 hover:bg-blue-100`}`,children:`Select`})]},e.id)})})]}),d.__docgenInfo={description:``,methods:[],displayName:`FareCards`}})),p,m,h,g,_,v,y,b,x;e((()=>{p=t(n(),1),f(),m=r(),h=`data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%232563EB"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>`,g=[{id:`economy`,name:`Economy Standard`,airline:`Emirates`,price:450,features:[`1x Carry-on bag (7kg)`,`1x Checked bag (23kg)`,`Standard seat selection`,`Flight change with fee`]},{id:`business`,name:`Business Class`,airline:`Emirates`,price:1250,features:[`2x Carry-on bags (10kg each)`,`2x Checked bags (32kg each)`,`Priority check-in & Boarding`,`Lounge access included`,`Lie-flat seats & Premium dining`,`Free flight changes & refund`]}],_={title:`Fare/FareCards`,component:d,tags:[`autodocs`],parameters:{layout:`padded`},decorators:[e=>(0,m.jsx)(`div`,{className:`p-6 bg-slate-50 max-w-3xl mx-auto`,children:(0,m.jsx)(e,{})})],argTypes:{selectedFareId:{control:{type:`radio`},options:[`economy`,`business`]},onSelectFare:{action:`fareSelected`}}},v={args:{fareOptions:g,selectedFareId:`economy`,defaultFlightLogo:h}},y={args:{fareOptions:g,selectedFareId:`business`,defaultFlightLogo:h}},b={render:e=>{let[t,n]=(0,p.useState)(`economy`);return(0,m.jsx)(d,{...e,selectedFareId:t,onSelectFare:t=>{n(t),e.onSelectFare?.(t)}})},args:{fareOptions:g,defaultFlightLogo:h}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    fareOptions: MOCK_FARE_OPTIONS,
    selectedFareId: 'economy',
    defaultFlightLogo: MOCK_FLIGHT_LOGO
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    fareOptions: MOCK_FARE_OPTIONS,
    selectedFareId: 'business',
    defaultFlightLogo: MOCK_FLIGHT_LOGO
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [selectedId, setSelectedId] = useState<'economy' | 'business'>('economy');
    return <FareCards {...args} selectedFareId={selectedId} onSelectFare={id => {
      setSelectedId(id);
      args.onSelectFare?.(id);
    }} />;
  },
  args: {
    fareOptions: MOCK_FARE_OPTIONS,
    defaultFlightLogo: MOCK_FLIGHT_LOGO
  }
}`,...b.parameters?.docs?.source}}},x=[`DefaultEconomySelected`,`BusinessSelected`,`Interactive`]}))();export{y as BusinessSelected,v as DefaultEconomySelected,b as Interactive,x as __namedExportsOrder,_ as default};