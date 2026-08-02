import{i as e}from"./preload-helper-CT_b8DTk.js";import{N as t}from"./iframe-BbWVxoOj.js";import{t as n}from"./jsx-runtime-DqZldVDK.js";import{n as r,t as i}from"./Button-OLFHGzgN.js";import{b as a,t as o}from"./lucide-react-Bn36gJJk.js";var s,c=e((()=>{s=`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAOdEVYdFNvZnR3YXJlAEZpZ21hnrGWYwAAAFxJREFUeAHtkcEJwCAMRX+KA3WTrtJRuooT1BHcKCp4kBw0goiHPAiBR/iBBDC2wMxvKawih/25gmb2wmLODyQp6vEfoe/ao/CeiL5WOCgXDfwc9uUuTjnnYWwjAWSvHJWJM3GsAAAAAElFTkSuQmCC`})),l,u,d=e((()=>{t(),o(),r(),c(),l=n(),u=({isBreadcrumbMode:e=!1,chatTitle:t,messages:n=[],onBackToChat:r,onNewChat:o})=>{let c=n.find(e=>e.sender===`user`)?.text,u=t||(c?c.length>30?`${c.slice(0,30)}...`:c:``);return(0,l.jsxs)(`header`,{className:`w-full flex items-center justify-between sticky top-0 z-10 shrink-0 border-b transition-colors bg-white/80 backdrop-blur-md border-slate-200/80 px-4 md:px-6 py-6 shadow-sm`,children:[(0,l.jsx)(`div`,{className:`flex items-center gap-1 md:gap-2 text-sm min-w-0`,children:e?(0,l.jsxs)(l.Fragment,{children:[r&&(0,l.jsx)(`button`,{onClick:r,className:`md:hidden w-8 h-8 rounded-xl flex items-center justify-center hover:bg-slate-100 transition shrink-0`,children:(0,l.jsx)(a,{className:`w-4 h-4 text-slate-600`})}),(0,l.jsx)(`button`,{onClick:r,className:`hidden md:inline text-slate-500 hover:text-blue-600 font-medium transition truncate max-w-120 md:max-w-200`,title:u,children:u}),(0,l.jsx)(`span`,{className:`text-slate-400 hidden md:inline`,children:`>`}),(0,l.jsx)(`span`,{className:`font-bold text-slate-800 truncate text-xs md:text-sm`,children:`Select Fare`})]}):(0,l.jsx)(`h2`,{className:`text-sm md:text-base font-semibold text-slate-800 truncate max-w-120 md:max-w-md`,children:u})}),(0,l.jsx)(`div`,{className:`-translate-x-4 -translate-y-2`,children:(0,l.jsx)(i,{variant:`primary`,size:`md`,leftIcon:(0,l.jsx)(`img`,{src:s,alt:`Add`,className:`w-5 h-5`}),onClick:o,children:(0,l.jsx)(`span`,{className:`hidden sm:inline`,children:`Start New Chat`})})})]})},u.__docgenInfo={description:``,methods:[],displayName:`Topbar`,props:{isBreadcrumbMode:{defaultValue:{value:`false`,computed:!1},required:!1},messages:{defaultValue:{value:`[]`,computed:!1},required:!1}}}})),f,p,m,h,g;e((()=>{d(),f={title:`Chat/Topbar`,component:u,tags:[`autodocs`],parameters:{layout:`padded`},argTypes:{isBreadcrumbMode:{control:`boolean`},chatTitle:{control:`text`},onBackToChat:{action:`backToChat`},onNewChat:{action:`newChat`}}},p={args:{chatTitle:`Cheap flights to Lagos`,messages:[{id:`1`,sender:`user`,text:`Find cheap flights from Owerri to Lagos`,type:`text`}]}},m={args:{isBreadcrumbMode:!0,chatTitle:`Cheap flights to Lagos`}},h={args:{messages:[]}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    chatTitle: 'Cheap flights to Lagos',
    messages: [{
      id: '1',
      sender: 'user',
      text: 'Find cheap flights from Owerri to Lagos',
      type: 'text'
    }]
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    isBreadcrumbMode: true,
    chatTitle: 'Cheap flights to Lagos'
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    messages: []
  }
}`,...h.parameters?.docs?.source}}},g=[`Default`,`BreadcrumbMode`,`Empty`]}))();export{m as BreadcrumbMode,p as Default,h as Empty,g as __namedExportsOrder,f as default};