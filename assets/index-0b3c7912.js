var te=Object.defineProperty;var se=(e,s,t)=>s in e?te(e,s,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[s]=t;var f=(e,s,t)=>(se(e,typeof s!="symbol"?s+"":s,t),t);import{c as oe,r as h,a as ne,m as S,j as i,C as U,d as $,T as x,b as re,e as g,u as O,f as G,S as R,g as ie,I as _,L as A,h as ae,i as D,n as ce,k as le,W as ue}from"./vendor-5219381b.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function t(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(n){if(n.ep)return;n.ep=!0;const r=t(n);fetch(n.href,r)}})();const Y=oe()((e,s)=>({map:void 0,setMap:t=>e({map:t}),removeMap:()=>{e({map:void 0})},addGroupLayer(t,o){const n=s().map;n&&n.addGroupLayer(t,o)},removeGroupLayer(t,o){const n=s().map;n&&n.removeGroupLayer(t,o)},removeGroupLayers(){const t=s().map;t&&t.removeGroupLayers()},getSource(t){const o=s().map;if(o)return o.getSource(t)},addSource(t,o){const n=s().map;n&&n.addSource(t,o)},removeSource(t){const o=s().map;o&&o.removeSource(t)},getLayer(t){const o=s().map;if(o)return o.getLayer(t)},addLayer(t,o){const n=s().map;n&&n.addLayer(t,o)},removeLayer(t){const o=s().map;o&&o.removeLayer(t)},setBasemapStyle(t,o,n){const r=s().map;r&&r.setBasemapStyle(t,o,n)},clear:t=>{const o=s().map;if(o&&o.getStyle())if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++){const c=t[n];o.removeGroupLayer(c),o.getLayer(c)&&o.removeLayer(c),o.getSource(c)&&o.removeSource(c)}else{if(t.groupLayerIds)for(let n=0,r=t.groupLayerIds.length;n<r;n++)o.removeGroupLayer(t.groupLayerIds[n]);if(t.layerIds)for(let n=0,r=t.layerIds.length;n<r;n++)o.removeLayer(t.layerIds[n]);if(t.sourceIds)for(let n=0,r=t.sourceIds.length;n<r;n++)o.removeSource(t.sourceIds[n])}}}));function de(e,s,t,o){const n=o==null?void 0:o.layerIds,r=c=>{e&&(n?e[c](s,n,t):e[c](s,t))};h.useEffect(()=>()=>{r("off")},[]),h.useEffect(()=>(r("on"),()=>{r("off")}),[e])}const u=Math.PI,b=6378245,j=.006693421622965943;function V(e,s){return!(e>73.66&&e<135.05&&s>3.86&&s<53.55)}function H(e,s){let t=300+e+2*s+.1*e*e+.1*e*s+.1*Math.sqrt(Math.abs(e));return t+=(20*Math.sin(6*e*u)+20*Math.sin(2*e*u))*2/3,t+=(20*Math.sin(e*u)+40*Math.sin(e/3*u))*2/3,t+=(150*Math.sin(e/12*u)+300*Math.sin(e/30*u))*2/3,t}function J(e,s){let t=-100+2*e+3*s+.2*s*s+.1*e*s+.2*Math.sqrt(Math.abs(e));return t+=(20*Math.sin(6*e*u)+20*Math.sin(2*e*u))*2/3,t+=(20*Math.sin(s*u)+40*Math.sin(s/3*u))*2/3,t+=(160*Math.sin(s/12*u)+320*Math.sin(s*u/30))*2/3,t}function pe(e,s){if(V(e,s))return[e,s];{let t=J(e-105,s-35),o=H(e-105,s-35);const n=s/180*u;let r=Math.sin(n);r=1-j*r*r;const c=Math.sqrt(r);t=t*180/(b*(1-j)/(r*c)*u),o=o*180/(b/c*Math.cos(n)*u);const l=s+t;return[e+o,l]}}function he(e,s){if(V(e,s))return[e,s];{let t=J(e-105,s-35),o=H(e-105,s-35);const n=s/180*u;let r=Math.sin(n);r=1-j*r*r;const c=Math.sqrt(r);t=t*180/(b*(1-j)/(r*c)*u),o=o*180/(b/c*Math.cos(n)*u);const l=s+t,v=e+o;return[+(e*2-v).toFixed(6),+(s*2-l).toFixed(6)]}}const C=ne.create({baseURL:"https://restapi.amap.com",timeout:3e3});C.interceptors.request.use(e=>(e.params.key||(e.params.key="ff7c1f3e9db95099f603f145142ae48d"),e),e=>Promise.reject(e));C.interceptors.response.use(({data:e})=>{if(e.status==="1")return e;S.error(`[${e.infocode}] ${e.info}`)},e=>Promise.reject(e));const me=e=>C.get("/v3/place/text",{params:{...e,citylimit:!0,offset:5}}),fe=(e,s,t)=>{const o=pe(e,s).join(",");return C.get("/v3/geocode/regeo",{params:{...t,location:o,extensions:"all"}})},{Title:ye,Text:L}=x,z=({data:e})=>i.jsxs(U,{locale:$,children:[i.jsx(ye,{level:5,children:e.name}),i.jsxs("div",{className:"flex",children:[i.jsxs(L,{strong:!0,className:"mr-2",children:["地址:"," "]}),i.jsx(L,{copyable:!0,className:"flex-1",children:e.address})]}),i.jsxs("div",{className:"flex",children:[i.jsxs(L,{strong:!0,className:"mr-2",children:["坐标:"," "]}),i.jsx(L,{copyable:!0,className:"flex-1",children:`${e.lon},${e.lat}`})]})]});function F(e){return e.map(s=>{const t=s.location.split(","),o=he(+t[0],+t[1]);return{id:s.id,name:s.name,lon:o[0],lat:o[1],location:s.location,address:s.address}})}function ge(e,s=!0){let t={type:"FeatureCollection",features:[]};for(let n=0;n<e.length;n++){const r=e[n],c={type:"Feature",properties:{no:n+1,...r},geometry:{type:"Point",coordinates:[r.lon,r.lat]}};t.features.push(c)}const o={sources:{poi:{type:"geojson",data:t,cluster:!0,clusterMaxZoom:14,clusterRadius:50}},layers:[{id:"clusters",type:"circle",source:"poi",filter:["has","point_count"],paint:{"circle-color":["step",["get","point_count"],"#51bbd6",100,"#f1f075",750,"#f28cb1"],"circle-radius":["step",["get","point_count"],20,100,30,750,40]}},{id:"cluster-count",type:"symbol",source:"poi",filter:["has","point_count"],layout:{"text-field":["get","point_count_abbreviated"],"text-size":12}},{id:"unclustered-point",type:"circle",source:"poi",filter:["!",["has","point_count"]],paint:{"circle-color":"#11b4da","circle-radius":5,"circle-stroke-width":2,"circle-stroke-color":"#fff"},metadata:{cursor:"pointer"}}]};if(s){const n=re(t);o.bounds=n,o.fitBoundsOptions={padding:{top:100,right:100,bottom:100,left:100}}}return o}const xe=[{label:"地点搜索",value:"1"},{label:"坐标定位",value:"2"},{label:"地图选点",value:"3"}],ve=()=>{const{map:e}=Y(),s=h.useRef(new g.Marker),t=h.useRef(new g.Popup({maxWidth:"400px"})),[o,n]=h.useState({count:0,pois:[]}),[r,c]=h.useState("1"),[l,v]=h.useState(""),[w,k]=h.useState(""),{loading:W,run:E}=O(me,{manual:!0,onSuccess(a){s.current.remove();const d=F(a.pois);n({count:+a.count,pois:d}),I(d)}}),{loading:Z,run:N}=O(fe,{manual:!0,onSuccess(a,d){const m=F(a.regeocode.pois);if(n({count:a.regeocode.pois.length,pois:m}),e){I(m,!1);const p=[d[0],d[1]],T=document.createElement("div");G(T).render(i.jsx(z,{data:{id:"1",name:p.join(","),location:p.join(","),lon:p[0],lat:p[1],address:a.regeocode.formatted_address}}));const B=new g.Popup;B.setDOMContent(T),s.current.setLngLat(p).setPopup(B).addTo(e),s.current.togglePopup(),e.flyTo({center:p,zoom:15})}}}),P=a=>{const d=e==null?void 0:e.queryRenderedFeatures(a.point,{layers:["clusters","cluster-count","unclustered-point"]});(!d||d.length===0)&&N(+a.lngLat.lng.toFixed(6),+a.lngLat.lat.toFixed(6))};h.useEffect(()=>(k(""),e&&(r==="3"?(e.on("click",P),e.getCanvas().style.cursor="pointer"):e.getCanvas().style.cursor=""),()=>{e==null||e.off("click",P)}),[e,r]),de(e,"click",a=>{if(e&&a.features&&a.features[0].properties){const d=a.features[0].properties,m=[d.lon,d.lat];for(;Math.abs(a.lngLat.lng-m[0])>180;)m[0]+=a.lngLat.lng>m[0]?360:-360;const p=document.createElement("div");G(p).render(i.jsx(z,{data:d})),t.current.setDOMContent(p).setLngLat(m).addTo(e)}},{layerIds:["unclustered-point"]});const Q=(a,d,m)=>{if(a)if(n({count:0,pois:[]}),r==="1")E({key:l,keywords:a,city:"023",page:1});else{const p=a.split(",");p.length===2?N(+p[0],+p[1]):S.error("请正确输入坐标, 如: 107.74,30.18")}else S.error("请输入关键字或坐标")},X=a=>{r==="1"&&E({key:l,keywords:w,city:"023",page:a})},I=(a,d=!0)=>{if(e){e.removeGroupLayer("poi");const m=ge(a,d);e.addGroupLayer("poi",m)}},ee=a=>{e==null||e.flyTo({center:[a.lon,a.lat],zoom:12})};return i.jsxs("div",{className:"",children:[i.jsxs("div",{className:"flex items-center p-[10px] bg-gradient-to-r from-cyan-500 to-blue-500",children:[i.jsxs("svg",{width:"48",height:"48",viewBox:"0 0 48 48",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[i.jsx("path",{d:"M21 4.04145C22.8564 2.96966 25.1436 2.96966 27 4.04145L39.7846 11.4226C41.641 12.4944 42.7846 14.4752 42.7846 16.6188V31.3812C42.7846 33.5248 41.641 35.5056 39.7846 36.5774L27 43.9585C25.1436 45.0303 22.8564 45.0303 21 43.9585L8.21539 36.5774C6.35898 35.5056 5.21539 33.5248 5.21539 31.3812V16.6188C5.21539 14.4752 6.35898 12.4944 8.21539 11.4226L21 4.04145Z",stroke:"white","stroke-width":"4"}),i.jsx("rect",{x:"14",y:"17",width:"4",height:"15",rx:"2",fill:"white"}),i.jsx("rect",{x:"22",y:"24",width:"4",height:"4",rx:"2",fill:"white"}),i.jsx("rect",{x:"30",y:"17",width:"4",height:"15",rx:"2",fill:"white"})]}),i.jsx("span",{className:"ml-2 text-lg text-white font-bold",children:"坐标拾取器 - NaiveMap"})]}),i.jsx("div",{className:"p-[10px] border-r-[1px]",children:i.jsxs(R,{direction:"vertical",children:[i.jsxs(R,{direction:"vertical",children:[i.jsx(ie,{size:"large",options:xe,defaultValue:r,onChange:a=>c(a)}),i.jsx(_.Password,{value:l,onChange:a=>v(a.target.value),placeholder:"请输入高德地图 Key"}),r!=="3"&&i.jsx(_.Search,{enterButton:!0,value:w,placeholder:r==="1"?"请输入关键字":"请输入坐标, 如: 107.74,30.18",onChange:a=>k(a.target.value),onSearch:Q})]}),i.jsx(A,{bordered:!0,size:"small",loading:W||Z,dataSource:o.pois,pagination:{size:"small",total:o.count>30?30:o.count,pageSize:5,hideOnSinglePage:!0,showSizeChanger:!1,showLessItems:!0,onChange:X},renderItem:a=>i.jsx(A.Item,{children:i.jsxs("div",{className:"w-[225px] hover:cursor-pointer",onClick:()=>ee(a),children:[i.jsx("p",{children:i.jsx(x.Text,{ellipsis:!0,strong:!0,children:a.name})}),i.jsx("p",{children:i.jsx(x.Text,{ellipsis:!0,type:"secondary",children:a.address})}),i.jsx("p",{children:i.jsx(x.Text,{ellipsis:!0,copyable:!0,children:`${a.lon},${a.lat}`})})]})})})]})})]})};const y=class y{constructor(s,t){f(this,"controlContainer");f(this,"events");f(this,"map");f(this,"mapStyleContainer");f(this,"styleButton");f(this,"styles");f(this,"defaultStyle");this.styles=s||y.DEFAULT_STYLES;const o=typeof t=="string"?t:t?t.defaultStyle:void 0;this.defaultStyle=o||y.DEFAULT_STYLE,this.onDocumentClick=this.onDocumentClick.bind(this),this.events=typeof t!="string"&&t?t.eventListeners:void 0}getDefaultPosition(){return"top-right"}onAdd(s){this.map=s,this.controlContainer=document.createElement("div"),this.controlContainer.classList.add("mapboxgl-ctrl"),this.controlContainer.classList.add("mapboxgl-ctrl-group"),this.mapStyleContainer=document.createElement("div"),this.styleButton=document.createElement("button"),this.styleButton.type="button",this.mapStyleContainer.classList.add("mapboxgl-style-list");for(const t of this.styles){const o=document.createElement("button");o.type="button",o.innerText=t.title,o.classList.add(t.title.replace(/[^a-z0-9-]/gi,"_")),o.dataset.uri=JSON.stringify(t.uri),o.addEventListener("click",n=>{const r=n.srcElement;if(this.closeModal(),r.classList.contains("active")||this.events&&this.events.onOpen&&this.events.onOpen(n))return;const c=JSON.parse(r.dataset.uri);this.map.setBasemapStyle(c);const l=this.mapStyleContainer.getElementsByClassName("active");for(;l[0];)l[0].classList.remove("active");r.classList.add("active"),this.events&&this.events.onChange&&this.events.onChange(n,c)}),t.title===this.defaultStyle&&o.classList.add("active"),this.mapStyleContainer.appendChild(o)}return this.styleButton.classList.add("mapboxgl-ctrl-icon"),this.styleButton.classList.add("mapboxgl-style-switcher"),this.styleButton.addEventListener("click",t=>{this.events&&this.events.onSelect&&this.events.onSelect(t)||this.openModal()}),document.addEventListener("click",this.onDocumentClick),this.controlContainer.appendChild(this.styleButton),this.controlContainer.appendChild(this.mapStyleContainer),this.controlContainer}onRemove(){!this.controlContainer||!this.controlContainer.parentNode||!this.map||!this.styleButton||(this.styleButton.removeEventListener("click",this.onDocumentClick),this.controlContainer.parentNode.removeChild(this.controlContainer),document.removeEventListener("click",this.onDocumentClick),this.map=void 0)}closeModal(){this.mapStyleContainer&&this.styleButton&&(this.mapStyleContainer.style.display="none",this.styleButton.style.display="block")}openModal(){this.mapStyleContainer&&this.styleButton&&(this.mapStyleContainer.style.display="block",this.styleButton.style.display="none")}onDocumentClick(s){this.controlContainer&&!this.controlContainer.contains(s.target)&&this.closeModal()}};f(y,"DEFAULT_STYLE","标准"),f(y,"DEFAULT_STYLES",[{title:"标准",uri:"mapbox://styles/huanglii/clm8knsuz012801r41pbwdcku"},{title:"浅色",uri:"mapbox://styles/huanglii/clm93m2qr011a01r671y2hjjm"},{title:"深色",uri:"mapbox://styles/huanglii/clm8quldc013701nza7a35j7j"},{title:"影像",uri:"mapbox://styles/huanglii/cl0j3k0wn000n14nznby52wod"},{title:"天地图",uri:"./map-style/satellite.json"}]);let M=y;const Le=e=>{const{setMap:s,removeMap:t}=Y(),o=h.useRef(null),[n]=h.useState(Math.random().toString(16).substring(2));g.accessToken="pk.eyJ1IjoiaHVhbmdsaWkiLCJhIjoiY2wwM2E4a2drMDVrZjNrcGRucHIxOHo0cyJ9.0ecG5KGQE6R-SmhxvLvhHg";const c=Object.assign({},{style:"mapbox://styles/huanglii/clm8knsuz012801r41pbwdcku",container:n,bounds:[105.289838,28.164713,110.195632,32.204171],fitBoundsOptions:{padding:{top:20,right:20,bottom:20,left:20}},attributionControl:!1,locale:{"NavigationControl.ResetBearing":"指北","NavigationControl.ZoomIn":"放大","NavigationControl.ZoomOut":"缩小","GeolocateControl.FindMyLocation":"定位","GeolocateControl.LocationNotAvailable":"定位不可用"}},e.mapboxOptions);return h.useEffect(()=>{const l=new ae(c);return l.addControl(new D.NavigationControl({visualizePitch:!0})),l.addControl(new D.GeolocateControl({trackUserLocation:!0,showUserHeading:!0})),l.addControl(new g.AttributionControl({customAttribution:`v${g.version}`})),l.addControl(new M),l.on("load",()=>{s(l),e.onMapLoaded&&e.onMapLoaded(l)}),l.on("remove",()=>{t()}),()=>l.remove()},[]),i.jsx("div",{id:n,className:e.className,style:{width:"100%",height:"100%"},ref:o})},{Paragraph:q,Link:be,Text:K}=x,je=()=>{h.useEffect(()=>{e(3)},[]);const e=(s=5)=>{ce.info({message:"温馨提示",description:i.jsxs("div",{className:"text-justify",children:[i.jsxs(q,{children:["该拾取器使用高德 Web 服务 API，如提示 ",i.jsx(K,{type:"danger",children:"[10003] DAILY_QUERY_OVER_LIMIT"}),"，请前往高德开放平台",i.jsx(be,{href:"https://lbs.amap.com/dev/key",target:"_blank",children:"申请Key"})," ","并输入。"]}),i.jsx(q,{italic:!0,children:i.jsx(K,{type:"warning",children:"请放心使用，不会保存你的 Key 信息！！"})})]}),placement:"top",duration:s,style:{width:345}})};return i.jsx("div",{className:"absolute top-[10px] left-[10px] w-[28px] h-[28px] leading-[29px] rounded-[4px] font-bold text-center text-[16px] bg-white cursor-pointer",style:{boxShadow:"0 0 0 2px rgba(0,0,0,.1)"},onClick:()=>e(),children:i.jsx("span",{children:"i"})})};function Ce(){return i.jsx("div",{className:"w-screen h-screen",children:i.jsxs("div",{className:"flex flex-auto h-full",children:[i.jsx(ve,{}),i.jsxs("div",{className:"flex-1 relative",children:[i.jsx(Le,{}),i.jsx(je,{})]})]})})}le.createRoot(document.getElementById("root")).render(i.jsx(U,{locale:$,theme:{components:{Segmented:{itemSelectedBg:"#1677ff",itemSelectedColor:"#fff"}}},children:i.jsx(ue,{content:"naivemap.com",children:i.jsx(Ce,{})})}));