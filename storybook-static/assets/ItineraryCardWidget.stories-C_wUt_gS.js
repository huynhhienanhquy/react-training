import{i as e}from"./preload-helper-CT_b8DTk.js";import{n as t,t as n}from"./ItineraryCardWidget-DaZSVZ0y.js";var r,i,a,o,s,c;e((()=>{t(),r={title:`Chat/ItineraryCardWidget`,component:n,tags:[`autodocs`],parameters:{layout:`padded`},argTypes:{onViewAll:{action:`viewAllItinerary`}}},i=[{day:1,dateTitle:`Monday, March 15`,activities:[{id:`a1`,title:`Arrival & Hotel Check-in`,time:`2:00 PM`,location:`Marriott Hotel`},{id:`a2`,title:`Welcome Dinner`,time:`7:00 PM`,location:`Skyview Restaurant`}]},{day:2,dateTitle:`Tuesday, March 16`,activities:[{id:`a3`,title:`City Tour`,time:`9:00 AM`,location:`Downtown`},{id:`a4`,title:`Beach Time`,time:`2:00 PM`,location:`Paradise Beach`},{id:`a5`,title:`Sunset Cruise`,time:`5:30 PM`,location:`Marina`}]}],a={args:{itinerary:i}},o={args:{itinerary:[i[0]]}},s={args:{}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    itinerary: MOCK_ITINERARY
  }
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    itinerary: [MOCK_ITINERARY[0]]
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {}
}`,...s.parameters?.docs?.source}}},c=[`Default`,`SingleDay`,`Loading`]}))();export{a as Default,s as Loading,o as SingleDay,c as __namedExportsOrder,r as default};