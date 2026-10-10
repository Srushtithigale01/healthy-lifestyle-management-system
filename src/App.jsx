import {useEffect,useState} from 'react';
import {Activity,Droplets,Moon,CheckCircle2,Plus,Trash2,HeartPulse,Leaf,RotateCcw} from 'lucide-react';
const today=()=>new Date().toISOString().slice(0,10);
const initial=()=>({date:today(),water:0,exercise:0,sleep:0,tasks:[{id:1,text:'Take a 10-minute walk',done:false},{id:2,text:'Eat a balanced meal',done:false},{id:3,text:'Avoid screens before bedtime',done:false}]});
function load(){try{const x=JSON.parse(localStorage.getItem('healthy-lifestyle-data'));if(x&&x.date===today())return x;}catch{}return initial();}
export default function App(){
 const [data,setData]=useState(load);const [taskText,setTaskText]=useState('');
 useEffect(()=>{localStorage.setItem('healthy-lifestyle-data',JSON.stringify(data));},[data]);
 const update=(key,value)=>setData(d=>({...d,[key]:value}));
 const addTask=e=>{e.preventDefault();const text=taskText.trim();if(!text)return;update('tasks',[...data.tasks,{id:Date.now(),text,done:false}]);setTaskText('');};
 const toggle=id=>update('tasks',data.tasks.map(t=>t.id===id?{...t,done:!t.done}:t));
 const remove=id=>update('tasks',data.tasks.filter(t=>t.id!==id));
 const reset=()=>{if(confirm("Reset today's trackers and tasks?"))setData(initial());};
 const pct=(v,g)=>Math.min(100,Math.round(v/g*100));
 const done=data.tasks.filter(t=>t.done).length;
 return <main className="app"><header className="topbar"><a className="brand" href="#"><span className="brandicon"><Leaf/></span>Healthy<span className="light">Life</span></a><span className="date">{new Date().toLocaleDateString(undefined,{weekday:'short',month:'short',day:'numeric'})}</span></header>
 <section className="hero"><div><span className="eyebrow"><HeartPulse size={15}/> YOUR DAILY WELLNESS COMPANION</span><h1>Small habits.<br/><em>Healthier you.</em></h1><p>Build a healthier routine one day at a time. Track your water, movement, sleep and daily wellness goals in one place.</p><a className="cta" href="#trackers">Explore today's trackers ↓</a></div><div className="art"><div className="sun"></div><div className="artcard"><HeartPulse size={35}/><b>Make today count</b><small>Progress over perfection</small></div><span className="leafshape l1"></span><span className="leafshape l2"></span></div></section>
 <section className="heading" id="trackers"><div><span className="eyebrow">YOUR DAILY CHECK-IN</span><h2>Today's wellness</h2><p>Update your progress as you go.</p></div><button className="reset" onClick={reset}><RotateCcw size={15}/> Reset day</button></section>
 <section className="cards">
 {[
 {key:'water',title:'Water intake',desc:'Stay hydrated throughout the day.',goal:8,unit:'glasses',step:1,icon:<Droplets/>,className:'blue',goalText:'GOAL: 8 GLASSES',label:'Add one glass of water'},
 {key:'exercise',title:'Exercise',desc:'Make time for movement today.',goal:30,unit:'minutes',step:5,icon:<Activity/>,className:'orange',goalText:'GOAL: 30 MIN',label:'Add five minutes of exercise'},
 {key:'sleep',title:'Sleep',desc:'Rest helps your body recharge.',goal:8,unit:'hours',step:1,icon:<Moon/>,className:'purple',goalText:'GOAL: 8 HOURS',label:'Add one hour of sleep'}
 ].map(c=><article className="card" key={c.key}><div className="cardtop"><span className={'icon '+c.className}>{c.icon}</span><small>{c.goalText}</small></div><h3>{c.title}</h3><p>{c.desc}</p><div className="metric"><b>{data[c.key]}</b><span>/ {c.goal} {c.unit}</span></div><div className={'progress '+c.className}><span style={{width:pct(data[c.key],c.goal)+'%'}}></span></div><div className="cardbottom"><span>{pct(data[c.key],c.goal)}% of daily goal</span><button aria-label={c.label} disabled={data[c.key]>=c.goal} className={'add '+c.className} onClick={()=>update(c.key,Math.min(c.goal,data[c.key]+c.step))}><Plus/></button></div></article>)}
 </section>
 <section className="lower"><div className="tasks"><div className="tasktitle"><div><span className="eyebrow">MAKE IT A ROUTINE</span><h2>Healthy habits checklist</h2></div><span className="count">{done}/{data.tasks.length} done</span></div><p className="sub">Choose small actions that make your day better.</p><form onSubmit={addTask} className="taskform"><input value={taskText} onChange={e=>setTaskText(e.target.value)} placeholder="Add a healthy habit..." aria-label="New healthy habit"/><button type="submit"><Plus size={18}/> Add</button></form><div>{data.tasks.map(t=><div className={'task '+(t.done?'completed':'')} key={t.id}><button className="check" onClick={()=>toggle(t.id)} aria-label="Toggle completion"><CheckCircle2/></button><span>{t.text}</span><button className="delete" onClick={()=>remove(t.id)} aria-label="Delete task"><Trash2 size={17}/></button></div>)}{!data.tasks.length&&<p className="empty">No habits yet. Add one above.</p>}</div></div>
 <aside className="quote"><span className="quoteicon"><Leaf/></span><span className="eyebrow">A GENTLE REMINDER</span><h2>Consistency is better than perfection.</h2><p>You don't need to change everything today. One small healthy choice is a great place to begin.</p><div className="line"></div><small>Breathe • Move • Hydrate • Rest</small></aside></section>
 <footer><b><Leaf size={15}/> HealthyLife</b><span>A student project for daily wellness awareness</span></footer></main>;
}