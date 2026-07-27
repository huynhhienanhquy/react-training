import{i as e}from"./preload-helper-CT_b8DTk.js";import{n as t,t as n}from"./FlightRecommendations-bsE4xJ44.js";var r,i,a,o;e((()=>{t(),r={title:`Chat/FlightRecommendations`,component:n,argTypes:{title:{control:`text`}}},i=[{id:`1`,airline:`AirPeace Airways, Nigerian`,outbound:{time:`9:15am - 9:15pm`,route:`QOW - LAG`,duration:`9h 24m`,stops:`1 stop`},returnLeg:{time:`4:25am - 10:20pm`,route:`LAG - QOW`,duration:`9h 24m`,stops:`1 stop`},price:`$1,200`,tag:`Cheap`},{id:`2`,airline:`Green Africa Airways`,outbound:{time:`6:00am - 2:30pm`,route:`QOW - LAG`,duration:`8h 30m`,stops:`Direct`},returnLeg:{time:`3:00pm - 11:30pm`,route:`LAG - QOW`,duration:`8h 30m`,stops:`Direct`},price:`$1,500`,tag:`Fastest`}],a={args:{title:`Recommended Flights For a Round Trip Journey`,flights:i,onBookNow:e=>alert(`Book flight: `+e),onSeeAll:()=>alert(`See all flights`)}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Recommended Flights For a Round Trip Journey',
    flights: MOCK_FLIGHTS,
    onBookNow: id => alert('Book flight: ' + id),
    onSeeAll: () => alert('See all flights')
  }
}`,...a.parameters?.docs?.source}}},o=[`Default`]}))();export{a as Default,o as __namedExportsOrder,r as default};