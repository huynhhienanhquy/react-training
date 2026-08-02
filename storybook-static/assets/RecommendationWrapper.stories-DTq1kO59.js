import{i as e}from"./preload-helper-CT_b8DTk.js";import{t}from"./jsx-runtime-DqZldVDK.js";import{n,t as r}from"./RecommendationWrapper-sc5HuOFs.js";var i,a,o,s,c,l,u;e((()=>{n(),i=t(),a={title:`Chat/RecommendationWrapper`,component:r,tags:[`autodocs`],parameters:{layout:`padded`},argTypes:{title:{control:`text`},seeAllText:{control:`text`},onSeeAll:{action:`seeAll`}}},o={args:{title:`Top Recommendations`,children:(0,i.jsx)(`div`,{className:`p-4 text-center text-slate-500`,children:`Recommendation Content Here`})}},s={args:{title:`Popular Destinations`,children:(0,i.jsx)(`div`,{className:`p-4 text-center text-slate-500`,children:`Destination Cards Here`})}},c={args:{title:`Nearby Hotels`,children:(0,i.jsx)(`div`,{className:`p-4 text-center text-slate-500`,children:`Hotel Cards Here`}),seeAllText:`View All Hotels`}},l={args:{title:`Trending Flights`,children:(0,i.jsxs)(`div`,{className:`flex flex-col gap-2`,children:[(0,i.jsx)(`div`,{className:`bg-slate-50 p-3 rounded-lg text-sm`,children:`Flight 1 - $200`}),(0,i.jsx)(`div`,{className:`bg-slate-50 p-3 rounded-lg text-sm`,children:`Flight 2 - $300`}),(0,i.jsx)(`div`,{className:`bg-slate-50 p-3 rounded-lg text-sm`,children:`Flight 3 - $400`})]})}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Top Recommendations',
    children: <div className="p-4 text-center text-slate-500">Recommendation Content Here</div>
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Popular Destinations',
    children: <div className="p-4 text-center text-slate-500">Destination Cards Here</div>
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Nearby Hotels',
    children: <div className="p-4 text-center text-slate-500">Hotel Cards Here</div>,
    seeAllText: 'View All Hotels'
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Trending Flights',
    children: <div className="flex flex-col gap-2">\r
        <div className="bg-slate-50 p-3 rounded-lg text-sm">Flight 1 - $200</div>\r
        <div className="bg-slate-50 p-3 rounded-lg text-sm">Flight 2 - $300</div>\r
        <div className="bg-slate-50 p-3 rounded-lg text-sm">Flight 3 - $400</div>\r
      </div>
  }
}`,...l.parameters?.docs?.source}}},u=[`Default`,`WithSeeAll`,`CustomSeeAllText`,`WithMultipleChildren`]}))();export{c as CustomSeeAllText,o as Default,l as WithMultipleChildren,s as WithSeeAll,u as __namedExportsOrder,a as default};