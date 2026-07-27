import{i as e}from"./preload-helper-CT_b8DTk.js";import{t}from"./jsx-runtime-DqZldVDK.js";import{n,t as r}from"./RecommendationWrapper-BYkffnPc.js";var i,a,o,s,c,l;e((()=>{n(),i=t(),a={title:`Chat/RecommendationWrapper`,component:r,argTypes:{title:{control:`text`},seeAllText:{control:`text`}}},o={args:{title:`Recommended Flights`,children:(0,i.jsx)(`div`,{className:`p-4 text-slate-600 text-sm`,children:`Flight card content goes here`}),onSeeAll:()=>alert(`See all`)}},s={args:{title:`Recommended Hotels`,children:(0,i.jsx)(`div`,{className:`p-4 text-slate-600 text-sm`,children:`Hotel card content goes here`})}},c={args:{title:`Places to Visit`,children:(0,i.jsx)(`div`,{className:`p-4 text-slate-600 text-sm`,children:`Place recommendations here`}),onSeeAll:()=>{},seeAllText:`View All Places`}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Recommended Flights',
    children: <div className="p-4 text-slate-600 text-sm">Flight card content goes here</div>,
    onSeeAll: () => alert('See all')
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Recommended Hotels',
    children: <div className="p-4 text-slate-600 text-sm">Hotel card content goes here</div>
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Places to Visit',
    children: <div className="p-4 text-slate-600 text-sm">Place recommendations here</div>,
    onSeeAll: () => {},
    seeAllText: 'View All Places'
  }
}`,...c.parameters?.docs?.source}}},l=[`Default`,`WithoutSeeAll`,`CustomText`]}))();export{c as CustomText,o as Default,s as WithoutSeeAll,l as __namedExportsOrder,a as default};