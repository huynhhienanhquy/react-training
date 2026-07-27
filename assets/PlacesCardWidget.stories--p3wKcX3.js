import{i as e}from"./preload-helper-CT_b8DTk.js";import{n as t,t as n}from"./PlacesCardWidget-BWrqJ5rA.js";var r,i,a,o,s,c;e((()=>{t(),r={title:`Chat/PlacesCardWidget`,component:n},i=[{id:`1`,name:`La Maison Restaurant`,location:`123 Beach Road, Victoria Island`,category:`food`,rating:4.5,imageUrl:`https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80`},{id:`2`,name:`National Museum`,location:`City Center, Lagos`,category:`sightseeing`,rating:4.2,imageUrl:`https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80`},{id:`3`,name:`Mega Plaza Mall`,location:`Marina, Lagos Island`,category:`shopping`,rating:4,imageUrl:`https://images.unsplash.com/photo-1519567770579-c2fc33e2c3ef?auto=format&fit=crop&w=800&q=80`}],a={args:{places:i,onViewAll:()=>alert(`View all places`)}},o={args:{places:[i[0]]}},s={args:{}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    places: MOCK_PLACES,
    onViewAll: () => alert('View all places')
  }
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    places: [MOCK_PLACES[0]]
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {}
}`,...s.parameters?.docs?.source}}},c=[`Default`,`SinglePlace`,`Loading`]}))();export{a as Default,s as Loading,o as SinglePlace,c as __namedExportsOrder,r as default};