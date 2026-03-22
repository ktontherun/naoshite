"use client";
import { useState, useRef, createContext, useContext } from "react";

const AuthContext = createContext(null);
function useAuth() { return useContext(AuthContext); }
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");
  const login = (u) => { setUser(u); setShowLogin(false); setLoginMessage(""); };
  const logout = () => setUser(null);
  const requireAuth = (msg) => { if (user) return true; setLoginMessage(msg || ""); setShowLogin(true); return false; };
  return <AuthContext.Provider value={{ user, login, logout, showLogin, setShowLogin, requireAuth, loginMessage }}>{children}</AuthContext.Provider>;
}

const LangContext = createContext(null);
function useLang() { return useContext(LangContext); }
const TR = {
  ja: {
    tabFeed:"コレクション",tabPost:"投稿",tabTranslate:"翻訳",login:"ログイン",logout:"ログアウト",
    loginTitle:"NaoshiTEにログイン",signupTitle:"アカウント作成",googleLogin:"Googleでログイン",lineLogin:"LINEでログイン",
    emailLogin:"メールでログイン",or:"または",email:"メールアドレス",password:"パスワード",displayName:"表示名",
    passwordHint:"パスワード（8文字以上）",noAccount:"アカウントがない方は",hasAccount:"アカウントをお持ちの方は",
    signup:"新規登録",back:"戻る",createAccount:"アカウントを作成",loggingIn:"ログイン中...",creating:"作成中...",
    errFillAll:"すべて入力してください",errEmailPw:"メールとパスワードを入力してください",errPwLen:"8文字以上必要です",
    authLike:"いいねにはログインが必要です",authPost:"投稿にはログインが必要です",
    feedTitle:"珍翻訳コレクション",feedSub:"日本各地で発見された愉快な英訳たち",
    posts:"投稿",likes:"いいね",all:"すべて",by:"投稿者",
    postTitle:"珍翻訳を投稿",postSub:"写真をアップするだけ。AIが自動で解析します。",
    step:"ステップ",step1:"写真をアップ",step2:"内容を確認",step3:"仕上げ",
    photoLabel:"珍翻訳の写真",uploadPhoto:"写真をアップロード",uploadHint:"看板・メニューなど珍翻訳の写真を選択",
    change:"変更",analyzing:"AIが解析中...",analyzeBtn:"AIで解析する",
    aiDone:"解析完了",aiDoneHint:"内容を確認・編集できます",
    originalLabel:"原文（日本語）",badLabel:"珍翻訳",correctLabel:"正しい英訳",whyBad:"なぜ珍翻訳？",
    locationLabel:"発見場所",locationHint:"例：東京・新宿のコンビニ",commentLabel:"コメント",commentHint:"見つけた時のエピソード",
    categoryLabel:"カテゴリ",previewLabel:"プレビュー",locUnset:"場所未設定",catUnset:"未選択",you:"あなた",
    submit:"投稿する",loginRequired:"※投稿にはログインが必要です",thankYou:"投稿ありがとうございます",thankYouSub:"コレクションに追加されました。",
    postAnother:"もう1つ投稿",viewCollection:"コレクションを見る",prev:"戻る",next:"次へ",
    aiError:"解析に失敗しました。もう一度お試しください。",
    transTitle:"正しい英語に翻訳",transSub:"看板・メニュー・案内を自然な英語に",
    sceneLabel:"場面",inputHint:"日本語を入力...",translateBtn:"翻訳",translating:"翻訳中...",
    correctTrans:"正しい翻訳",copy:"コピー",copied:"コピー済",altExpr:"他の表現",badExample:"よくある間違い",
    transError:"翻訳に失敗しました。",badTransLabel:"珍翻訳",goodTransLabel:"正しい訳",
  },
  en: {
    tabFeed:"Collection",tabPost:"Post",tabTranslate:"Translate",login:"Log in",logout:"Log out",
    loginTitle:"Log in to NaoshiTE",signupTitle:"Create account",googleLogin:"Continue with Google",lineLogin:"Continue with LINE",
    emailLogin:"Continue with email",or:"or",email:"Email",password:"Password",displayName:"Display name",
    passwordHint:"Password (8+ chars)",noAccount:"No account?",hasAccount:"Have an account?",
    signup:"Sign up",back:"Back",createAccount:"Create account",loggingIn:"Logging in...",creating:"Creating...",
    errFillAll:"Please fill in all fields",errEmailPw:"Enter email and password",errPwLen:"Password must be 8+ characters",
    authLike:"Log in to like",authPost:"Log in to post",
    feedTitle:"Lost in Translation",feedSub:"Hilarious English translations found across Japan",
    posts:"Posts",likes:"Likes",all:"All",by:"by",
    postTitle:"Post a translation fail",postSub:"Upload a photo. AI does the rest.",
    step:"Step",step1:"Upload photo",step2:"Review",step3:"Finish",
    photoLabel:"Photo of the translation",uploadPhoto:"Upload photo",uploadHint:"Select a photo with a funny translation",
    change:"Change",analyzing:"Analyzing...",analyzeBtn:"Analyze with AI",
    aiDone:"Analysis complete",aiDoneHint:"Review and edit",
    originalLabel:"Original (Japanese)",badLabel:"Translation fail",correctLabel:"Correct English",whyBad:"Why is it funny?",
    locationLabel:"Location",locationHint:"e.g. Convenience store in Shinjuku",commentLabel:"Comment",commentHint:"How did you find this?",
    categoryLabel:"Category",previewLabel:"Preview",locUnset:"No location",catUnset:"None",you:"You",
    submit:"Post it",loginRequired:"Login required to post",thankYou:"Thanks for posting!",thankYouSub:"Added to the collection.",
    postAnother:"Post another",viewCollection:"View collection",prev:"Back",next:"Next",
    aiError:"Analysis failed. Please try again.",
    transTitle:"Translate to correct English",transSub:"Turn signs and menus into natural English",
    sceneLabel:"Context",inputHint:"Enter Japanese text...",translateBtn:"Translate",translating:"Translating...",
    correctTrans:"Correct translation",copy:"Copy",copied:"Copied",altExpr:"Alternatives",badExample:"Common mistake",
    transError:"Translation failed.",badTransLabel:"Translation fail",goodTransLabel:"Correct translation",
  },
};
function LangProvider({children}){
  const[lang,setLang]=useState(()=>typeof navigator!=="undefined"&&navigator.language?.startsWith("ja")?"ja":"en");
  return <LangContext.Provider value={{lang,t:TR[lang],toggle:()=>setLang(l=>l==="ja"?"en":"ja")}}>{children}</LangContext.Provider>;
}

const EX=[
  {id:1,image:"\u{1F6BB}",category:"トイレ",original:"御手洗い",bad:"Honorable Hand Wash",correct:"Restroom",location:"東京・渋谷",likes:2847,explanation:"「御」をhonorableと直訳。",author:"翻訳ハンター"},
  {id:2,image:"\u{1F35C}",category:"メニュー",original:"親子丼",bad:"Parent and Child Bowl",correct:"Chicken & Egg Rice Bowl",location:"大阪・なんば",likes:4210,explanation:"直訳すると不気味。",author:"大阪グルメ"},
  {id:3,image:"\u26A0\uFE0F",category:"看板",original:"足元注意",bad:"Beware of Your Feet",correct:"Watch Your Step",location:"京都・嵐山",likes:3652,explanation:"足を警戒するのではなく足元に注意。",author:"京都散歩"},
  {id:4,image:"\u{1F6AD}",category:"看板",original:"歩きタバコ禁止",bad:"No Walking Tobacco",correct:"No Smoking While Walking",location:"福岡・天神",likes:5123,explanation:"行為を説明する必要がある。",author:"福岡レポーター"},
  {id:5,image:"\u{1F363}",category:"メニュー",original:"回転寿司",bad:"Spinning Sushi",correct:"Conveyor Belt Sushi",location:"名古屋・栄",likes:3891,explanation:"寿司が回転しているイメージに。",author:"寿司マニア"},
  {id:6,image:"\u{1F697}",category:"看板",original:"徐行",bad:"Slow Slow",correct:"Slow Down",location:"北海道・小樽",likes:2156,explanation:"二回繰り返して訳した。",author:"北海道ドライブ"},
  {id:7,image:"\u{1F3E8}",category:"ホテル",original:"精算機",bad:"Spirit Counting Machine",correct:"Payment Machine",location:"札幌・すすきの",likes:6204,explanation:"「精」をspiritと誤訳。",author:"ホテル評論家"},
  {id:8,image:"\u{1F371}",category:"メニュー",original:"天津飯",bad:"Tianjin Rice",correct:"Crab Omelette over Rice",location:"横浜・中華街",likes:1893,explanation:"地名だけでは伝わらない。",author:"横浜食べ歩き"},
  {id:9,image:"\u{1F6BF}",category:"温泉",original:"かけ湯をしてください",bad:"Please Hang Hot Water",correct:"Please Rinse Off Before Entering",location:"箱根",likes:7891,explanation:"「かける」をhangと誤訳。",author:"温泉ソムリエ"},
  {id:10,image:"\u{1F3EA}",category:"コンビニ",original:"肉まん",bad:"Meat Man",correct:"Steamed Pork Bun",location:"東京・新宿",likes:9320,explanation:"「まん」をmanと誤訳。",author:"コンビニ研究家"},
  {id:11,image:"\u{1F38C}",category:"看板",original:"立入禁止",bad:"Do Not Standing Enter",correct:"No Entry",location:"広島・宮島",likes:3456,explanation:"「立入」を分解した。",author:"広島観光"},
  {id:12,image:"\u{1F376}",category:"メニュー",original:"飲み放題",bad:"Free Drinking",correct:"All-You-Can-Drink",location:"東京・新橋",likes:4567,explanation:"「自由に飲酒」の意味に。",author:"居酒屋マスター"},
];
const CDATA=["メニュー","看板","トイレ","ホテル","温泉","コンビニ"];
const PCATS=["メニュー","看板","トイレ","ホテル","温泉","コンビニ","駅・交通","その他"];
const SCENES=[{v:"sign",ja:"看板",en:"Sign"},{v:"menu",ja:"メニュー",en:"Menu"},{v:"hotel",ja:"ホテル",en:"Hotel"},{v:"shop",ja:"ショップ",en:"Shop"},{v:"transport",ja:"交通",en:"Transport"},{v:"onsen",ja:"温泉",en:"Onsen"},{v:"other",ja:"その他",en:"Other"}];

const C={bg:"#FAFAF6",card:"#FFFFFF",surface:"#F3F1EC",text:"#1C1917",mid:"#57534E",light:"#A8A29E",
  accent:"#B45432",accentBg:"#F9EEEA",accentDk:"#8C3820",border:"#E7E5E0",borderLt:"#F0EEE9",
  ok:"#2D6A4F",okBg:"#F0F7F4",bad:"#B45432",badBg:"#FDF4F1",info:"#4A6FA5",infoBg:"#EFF4FA"};
const FF="'Source Serif 4','Noto Serif JP',Georgia,serif";
const FS="'Noto Sans JP','Source Sans 3',system-ui,sans-serif";

function HeartIcon({filled,s=18}){return <svg width={s} height={s} viewBox="0 0 24 24" fill={filled?C.accent:"none"} stroke={filled?C.accent:C.light} strokeWidth="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>;}
function CopyIcon(){return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>;}
function SparkleIcon(){return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z"/></svg>;}
function UserIcon(){return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;}

const pill=(a)=>({fontFamily:FS,fontSize:13,fontWeight:a?600:400,padding:"6px 16px",border:`1px solid ${a?C.accent:C.border}`,borderRadius:20,cursor:"pointer",background:a?C.accentBg:"transparent",color:a?C.accentDk:C.mid,transition:"all 0.2s",whiteSpace:"nowrap"});
const inp={fontFamily:FS,fontSize:15,padding:"11px 14px",border:`1px solid ${C.border}`,borderRadius:8,outline:"none",width:"100%",boxSizing:"border-box",background:C.card,color:C.text,transition:"border-color 0.2s"};
const lbl={fontFamily:FS,fontSize:12,fontWeight:500,color:C.mid,display:"block",marginBottom:6,letterSpacing:"0.03em"};
const bt=(p)=>({fontFamily:FS,fontSize:14,fontWeight:600,padding:"12px 24px",border:p?"none":`1px solid ${C.border}`,borderRadius:8,cursor:"pointer",background:p?C.accent:C.card,color:p?"#fff":C.mid,transition:"all 0.2s",display:"flex",alignItems:"center",justifyContent:"center",gap:6});

function LoginModal(){
  const{login,showLogin,setShowLogin,loginMessage}=useAuth();const{t}=useLang();
  const[mode,setMode]=useState("select");const[em,setEm]=useState("");const[pw,setPw]=useState("");const[nm,setNm]=useState("");
  const[err,setErr]=useState("");const[ld,setLd]=useState(false);
  if(!showLogin)return null;
  const close=()=>{setShowLogin(false);setMode("select");setEm("");setPw("");setNm("");setErr("");};
  const sso=p=>{setLd(true);setTimeout(()=>{login({name:p==="google"?"Google User":"LINE User",email:`u@${p}.com`,provider:p});setLd(false);},800);};
  const eLg=()=>{if(!em||!pw){setErr(t.errEmailPw);return;}setLd(true);setTimeout(()=>{login({name:em.split("@")[0],email:em,provider:"email"});setLd(false);},800);};
  const eSu=()=>{if(!nm||!em||!pw){setErr(t.errFillAll);return;}if(pw.length<8){setErr(t.errPwLen);return;}setLd(true);setTimeout(()=>{login({name:nm,email:em,provider:"email"});setLd(false);},800);};
  return(
    <div onClick={close} style={{position:"fixed",inset:0,zIndex:2000,background:"rgba(28,25,23,0.4)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:20,animation:"fadeIn 0.2s"}}>
      <div onClick={e=>e.stopPropagation()} style={{background:C.card,borderRadius:16,width:"100%",maxWidth:380,padding:"36px 32px",animation:"slideUp 0.3s ease-out"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:28}}>
          <h2 style={{fontFamily:FF,fontSize:22,fontWeight:600,color:C.text,margin:0}}>{mode==="signup"?t.signupTitle:t.loginTitle}</h2>
          <button onClick={close} style={{background:"none",border:"none",fontSize:18,cursor:"pointer",color:C.light,padding:4}}>✕</button>
        </div>
        {loginMessage&& <p style={{fontFamily:FS,fontSize:13,color:C.accent,margin:"0 0 16px",padding:"8px 12px",background:C.accentBg,borderRadius:6}}>{loginMessage}</p>}
        {mode!=="signup"&& <div><div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:20}}>
          <button onClick={()=>sso("google")} disabled={ld} style={{...bt(false),width:"100%",padding:"12px",gap:8}}>
            <svg width="16" height="16" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            {t.googleLogin}</button>
          <button onClick={()=>sso("line")} disabled={ld} style={{...bt(false),width:"100%",padding:"12px",gap:8,background:"#06C755",color:"#fff",border:"none"}}>{t.lineLogin}</button>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:12,margin:"0 0 20px"}}><div style={{flex:1,height:1,background:C.border}}/><span style={{fontFamily:FS,fontSize:12,color:C.light}}>{t.or}</span><div style={{flex:1,height:1,background:C.border}}/></div></div>}
        {mode==="select"&& <div>
          <button onClick={()=>setMode("email")} style={{...bt(false),width:"100%"}}>{t.emailLogin}</button>
          <p style={{fontFamily:FS,fontSize:12,color:C.light,textAlign:"center",margin:"16px 0 0"}}>{t.noAccount} <span onClick={()=>setMode("signup")} style={{color:C.accent,cursor:"pointer",fontWeight:600}}>{t.signup}</span></p>
        </div>}
        {mode==="email"&& <div style={{display:"flex",flexDirection:"column",gap:10}}>
          <input type="email" placeholder={t.email} value={em} onChange={e=>{setEm(e.target.value);setErr("");}} style={inp}/>
          <input type="password" placeholder={t.password} value={pw} onChange={e=>{setPw(e.target.value);setErr("");}} style={inp}/>
          {err&& <p style={{fontFamily:FS,fontSize:12,color:C.bad,margin:0}}>{err}</p>}
          <button onClick={eLg} disabled={ld} style={{...bt(true),width:"100%"}}>{ld?t.loggingIn:t.login}</button>
          <p style={{fontFamily:FS,fontSize:12,color:C.light,textAlign:"center",margin:0}}>
            <span onClick={()=>{setMode("signup");setErr("");}} style={{color:C.accent,cursor:"pointer"}}>{t.signup}</span>{" · "}<span onClick={()=>{setMode("select");setErr("");}} style={{cursor:"pointer"}}>{t.back}</span></p>
        </div>}
        {mode==="signup"&& <div style={{display:"flex",flexDirection:"column",gap:10}}>
          <input type="text" placeholder={t.displayName} value={nm} onChange={e=>{setNm(e.target.value);setErr("");}} style={inp}/>
          <input type="email" placeholder={t.email} value={em} onChange={e=>{setEm(e.target.value);setErr("");}} style={inp}/>
          <input type="password" placeholder={t.passwordHint} value={pw} onChange={e=>{setPw(e.target.value);setErr("");}} style={inp}/>
          {err&& <p style={{fontFamily:FS,fontSize:12,color:C.bad,margin:0}}>{err}</p>}
          <button onClick={eSu} disabled={ld} style={{...bt(true),width:"100%"}}>{ld?t.creating:t.createAccount}</button>
          <p style={{fontFamily:FS,fontSize:12,color:C.light,textAlign:"center",margin:0}}>{t.hasAccount} <span onClick={()=>{setMode("select");setErr("");}} style={{color:C.accent,cursor:"pointer"}}>{t.login}</span></p>
        </div>}
      </div>
    </div>
  );
}

function DetailModal({item,onClose,liked,onToggleLike}){
  const{t}=useLang();const{requireAuth}=useAuth();
  const lk=()=>{if(!requireAuth(t.authLike))return;onToggleLike(item.id);};
  return(
    <div onClick={onClose} style={{position:"fixed",inset:0,zIndex:1000,background:"rgba(28,25,23,0.4)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:16,animation:"fadeIn 0.2s"}}>
      <div onClick={e=>e.stopPropagation()} style={{background:C.card,borderRadius:16,width:"100%",maxWidth:420,maxHeight:"85vh",overflowY:"auto",animation:"slideUp 0.3s ease-out"}}>
        {item.photo? <div style={{position:"relative"}}><img src={item.photo} alt="" style={{width:"100%",maxHeight:240,objectFit:"cover",borderRadius:"16px 16px 0 0",display:"block"}}/><button onClick={onClose} style={{position:"absolute",top:12,right:12,width:30,height:30,borderRadius:"50%",border:"none",background:"rgba(0,0,0,0.4)",color:"#fff",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>✕</button></div>
        : <div style={{padding:"28px 28px 0",display:"flex",justifyContent:"space-between"}}><span style={{fontSize:40}}>{item.image}</span><button onClick={onClose} style={{background:"none",border:"none",fontSize:18,cursor:"pointer",color:C.light}}>✕</button></div>}
        <div style={{padding:"24px 28px 28px"}}>
          <div style={{fontFamily:FS,fontSize:11,color:C.light,marginBottom:4,letterSpacing:"0.05em"}}>{item.category} · {item.location}</div>
          <h3 style={{fontFamily:FF,fontSize:24,fontWeight:600,color:C.text,margin:"0 0 20px",lineHeight:1.3}}>{item.original}</h3>
          <div style={{background:C.badBg,borderRadius:10,padding:"14px 18px",marginBottom:10,borderLeft:`3px solid ${C.bad}`}}>
            <div style={{fontFamily:FS,fontSize:11,fontWeight:600,color:C.bad,marginBottom:4}}>{t.badTransLabel}</div>
            <div style={{fontFamily:FF,fontSize:20,fontWeight:600,color:C.bad,textDecoration:"line-through",textDecorationColor:"rgba(180,84,50,0.3)"}}>{item.bad}</div>
          </div>
          <div style={{background:C.okBg,borderRadius:10,padding:"14px 18px",marginBottom:16,borderLeft:`3px solid ${C.ok}`}}>
            <div style={{fontFamily:FS,fontSize:11,fontWeight:600,color:C.ok,marginBottom:4}}>{t.goodTransLabel}</div>
            <div style={{fontFamily:FF,fontSize:20,fontWeight:600,color:C.ok}}>{item.correct}</div>
          </div>
          {item.explanation&& <p style={{fontFamily:FS,fontSize:13,color:C.mid,margin:"0 0 12px",lineHeight:1.7,padding:"12px 16px",background:C.surface,borderRadius:8}}>{item.explanation}</p>}
          {item.userComment&& <p style={{fontFamily:FS,fontSize:13,color:C.text,margin:"0 0 16px",lineHeight:1.7,padding:"12px 16px",background:C.infoBg,borderRadius:8,fontStyle:"italic"}}>&quot;{item.userComment}&quot;</p>}
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",paddingTop:12,borderTop:`1px solid ${C.borderLt}`}}>
            <button onClick={lk} style={{background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:6,color:liked?C.accent:C.light,padding:0}}>
              <HeartIcon filled={liked}/><span style={{fontFamily:FS,fontSize:13,fontWeight:500}}>{(item.likes+(liked?1:0)).toLocaleString()}</span></button>
            {item.author&& <span style={{fontFamily:FS,fontSize:12,color:C.light}}>{t.by} {item.author}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

function FeedTab({posts}){
  const{t}=useLang();const CATS=[t.all,...CDATA];
  const[cat,setCat]=useState(null);const[liked,setLiked]=useState({});const[sel,setSel]=useState(null);
  const{requireAuth}=useAuth();
  const f=!cat||cat===t.all?posts:posts.filter(p=>p.category===cat);
  const tl=id=>{if(!requireAuth(t.authLike))return;setLiked(p=>({...p,[id]:!p[id]}));};
  return(
    <div style={{maxWidth:560,margin:"0 auto",padding:"0 20px 80px"}}>
      <div style={{padding:"40px 0 24px"}}>
        <h1 style={{fontFamily:FF,fontSize:28,fontWeight:600,color:C.text,margin:"0 0 6px",lineHeight:1.2}}>{t.feedTitle}</h1>
        <p style={{fontFamily:FS,fontSize:14,color:C.light,margin:0}}>{t.feedSub}</p>
        <div style={{display:"flex",gap:12,marginTop:20,fontFamily:FS,fontSize:13,color:C.light}}>
          <span><strong style={{color:C.text,fontWeight:600}}>{f.length}</strong> {t.posts}</span>
          <span style={{color:C.borderLt}}>·</span>
          <span><strong style={{color:C.text,fontWeight:600}}>{(f.reduce((s,i)=>s+i.likes,0)/1000).toFixed(1)}K</strong> {t.likes}</span>
        </div>
      </div>
      <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:20,scrollbarWidth:"none"}}>
        {CATS.map(c=><button key={c} onClick={()=>setCat(c)} style={pill(!cat&&c===t.all||cat===c)}>{c}</button>)}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:3}}>
        {f.map((item,idx)=>(
          <button key={item.id} onClick={()=>setSel(item)} style={{aspectRatio:"1",background:item.photo?"#000":C.surface,border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:item.photo?0:10,position:"relative",overflow:"hidden",borderRadius:2,animation:`fadeUp 0.35s ease-out ${idx*0.03}s both`}}
            onMouseEnter={e=>e.currentTarget.style.opacity="0.85"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
            {item.photo? <div style={{display:"contents"}}><img src={item.photo} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/><div style={{position:"absolute",inset:0,background:"linear-gradient(transparent 50%,rgba(0,0,0,0.55))"}}/><div style={{position:"absolute",bottom:6,left:8,right:8}}><div style={{fontFamily:FS,fontSize:11,fontWeight:600,color:"#fff",lineHeight:1.2}}>{item.bad}</div></div></div>
            : <div style={{display:"contents"}}><span style={{fontSize:26,marginBottom:4}}>{item.image}</span><div style={{fontFamily:FS,fontSize:10,fontWeight:600,color:C.text,textAlign:"center",lineHeight:1.2}}>{item.bad}</div><div style={{fontFamily:FS,fontSize:8,color:C.light,marginTop:2}}>{item.original}</div></div>}
          </button>
        ))}
      </div>
      {sel&& <DetailModal item={sel} onClose={()=>setSel(null)} liked={!!liked[sel.id]} onToggleLike={tl}/>}
    </div>
  );
}

function PostTab({onPostCreated,switchToFeed}){
  const{user,requireAuth}=useAuth();const{t}=useLang();
  const[photo,setPhoto]=useState(null);const[orig,setOrig]=useState("");const[bad,setBad]=useState("");const[correct,setCorrect]=useState("");
  const[loc,setLoc]=useState("");const[cat,setCat]=useState("");const[expl,setExpl]=useState("");const[comment,setComment]=useState("");
  const[step,setStep]=useState(1);const[done,setDone]=useState(false);const[aiLd,setAiLd]=useState(false);const[aiErr,setAiErr]=useState("");
  const fRef=useRef(null);
  const onPh=e=>{const f=e.target.files?.[0];if(!f)return;if(f.size>10*1024*1024){alert("10MB max");return;}const r=new FileReader();r.onload=ev=>{setPhoto(ev.target.result);setAiErr("");};r.readAsDataURL(f);};
  const analyze=async()=>{if(!photo)return;setAiLd(true);setAiErr("");try{const b=photo.split(",")[1];const m=photo.split(";")[0].split(":")[1];const r=await fetch("/api/analyze",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({imageBase64:b,mediaType:m})});const d=await r.json();const p=JSON.parse((d.content?.[0]?.text||"").replace(/```json|```/g,"").trim());if(p.error){setAiErr(p.error);}else{if(p.original)setOrig(p.original);if(p.badTranslation)setBad(p.badTranslation);if(p.correctTranslation)setCorrect(p.correctTranslation);if(p.explanation)setExpl(p.explanation);if(p.suggestedCategory)setCat(p.suggestedCategory);setStep(2);}
  }catch(e){setAiErr(t.aiError);}setAiLd(false);};
  const submit=()=>{if(!requireAuth(t.authPost))return;onPostCreated({id:Date.now(),image:"\u{1F4F8}",photo,category:cat||"その他",original:orig,bad,correct,location:loc||"",likes:0,explanation:expl,userComment:comment,author:user.name});setDone(true);};
  const reset=()=>{setDone(false);setStep(1);setPhoto(null);setOrig("");setBad("");setCorrect("");setLoc("");setCat("");setExpl("");setComment("");setAiErr("");};
  const ok2=orig.trim()&&bad.trim()&&correct.trim();
  if(done)return(<div style={{maxWidth:560,margin:"0 auto",padding:"80px 20px",textAlign:"center"}}>
    <div style={{fontSize:48,marginBottom:16}}>✓</div>
    <h2 style={{fontFamily:FF,fontSize:22,fontWeight:600,color:C.text,margin:"0 0 8px"}}>{t.thankYou}</h2>
    <p style={{fontFamily:FS,fontSize:14,color:C.mid,margin:"0 0 28px"}}>{t.thankYouSub}</p>
    <div style={{display:"flex",gap:10,justifyContent:"center"}}><button onClick={reset} style={bt(false)}>{t.postAnother}</button><button onClick={switchToFeed} style={bt(true)}>{t.viewCollection}</button></div>
  </div>);
  return(
    <div style={{maxWidth:560,margin:"0 auto",padding:"0 20px 80px"}}>
      <div style={{padding:"40px 0 24px"}}><h1 style={{fontFamily:FF,fontSize:28,fontWeight:600,color:C.text,margin:"0 0 6px"}}>{t.postTitle}</h1><p style={{fontFamily:FS,fontSize:14,color:C.light,margin:0}}>{t.postSub}</p></div>
      <div style={{display:"flex",gap:4,marginBottom:8}}>{[1,2,3].map(s=><div key={s} style={{flex:1,height:2,borderRadius:1,background:s<=step?C.accent:C.border,transition:"all 0.3s"}}/>)}</div>
      <p style={{fontFamily:FS,fontSize:12,color:C.light,margin:"0 0 24px"}}>{t.step} {step}/3 — {step===1?t.step1:step===2?t.step2:t.step3}</p>
      {step===1&& <div style={{display:"flex",flexDirection:"column",gap:16,animation:"fadeUp 0.3s"}}>
        <div><label style={lbl}>{t.photoLabel}</label><input type="file" accept="image/*" ref={fRef} onChange={onPh} style={{display:"none"}}/>
          {photo? <div style={{position:"relative",borderRadius:12,overflow:"hidden"}}><img src={photo} alt="" style={{width:"100%",maxHeight:300,objectFit:"cover",display:"block"}}/><div style={{position:"absolute",top:10,right:10,display:"flex",gap:6}}><button onClick={()=>fRef.current?.click()} style={{...bt(false),padding:"6px 12px",fontSize:12,background:"rgba(255,255,255,0.9)"}}>{t.change}</button><button onClick={()=>{setPhoto(null);setAiErr("");}} style={{width:28,height:28,borderRadius:"50%",border:"none",background:"rgba(0,0,0,0.4)",color:"#fff",cursor:"pointer",fontSize:12,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button></div></div>
          : <button onClick={()=>fRef.current?.click()} style={{width:"100%",padding:"44px 20px",border:`1.5px dashed ${C.border}`,borderRadius:12,background:C.surface,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:12}}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.light} strokeWidth="1.5"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
            <span style={{fontFamily:FS,fontSize:14,fontWeight:500,color:C.mid}}>{t.uploadPhoto}</span>
            <span style={{fontFamily:FS,fontSize:12,color:C.light,textAlign:"center",maxWidth:280}}>{t.uploadHint}</span>
          </button>}
        </div>
        {aiErr&& <p style={{fontFamily:FS,fontSize:13,color:C.bad,margin:0,padding:"10px 14px",background:C.badBg,borderRadius:8}}>{aiErr}</p>}
        {aiLd&& <div style={{padding:20,textAlign:"center",background:C.surface,borderRadius:12}}><span style={{width:16,height:16,border:`2px solid ${C.border}`,borderTopColor:C.accent,borderRadius:"50%",display:"inline-block",animation:"spin 0.8s linear infinite",marginRight:8,verticalAlign:"middle"}}/><span style={{fontFamily:FS,fontSize:14,color:C.mid}}>{t.analyzing}</span></div>}
        <button onClick={analyze} disabled={!photo||aiLd} style={{...bt(!photo||aiLd?false:true),opacity:!photo||aiLd?0.4:1,width:"100%"}}><SparkleIcon/> {t.analyzeBtn}</button>
      </div>}
      {step===2&& <div style={{display:"flex",flexDirection:"column",gap:14,animation:"fadeUp 0.3s"}}>
        {photo&& <div style={{display:"flex",gap:12,alignItems:"center",padding:"10px 14px",background:C.okBg,borderRadius:10}}><img src={photo} alt="" style={{width:56,height:56,borderRadius:8,objectFit:"cover"}}/><div><div style={{fontFamily:FS,fontSize:11,fontWeight:600,color:C.ok}}>{t.aiDone}</div><div style={{fontFamily:FS,fontSize:12,color:C.mid}}>{t.aiDoneHint}</div></div></div>}
        <div><label style={lbl}>{t.originalLabel}</label><input type="text" value={orig} onChange={e=>setOrig(e.target.value)} style={inp}/></div>
        <div><label style={lbl}>{t.badLabel}</label><input type="text" value={bad} onChange={e=>setBad(e.target.value)} style={inp}/></div>
        <div><label style={lbl}>{t.correctLabel}</label><input type="text" value={correct} onChange={e=>setCorrect(e.target.value)} style={inp}/></div>
        <div><label style={lbl}>{t.whyBad}</label><textarea value={expl} onChange={e=>setExpl(e.target.value)} rows={2} style={{...inp,resize:"vertical",lineHeight:1.6}}/></div>
        <div><label style={lbl}>{t.locationLabel}</label><input type="text" placeholder={t.locationHint} value={loc} onChange={e=>setLoc(e.target.value)} style={inp}/></div>
        <div><label style={lbl}>{t.commentLabel}</label><textarea placeholder={t.commentHint} value={comment} onChange={e=>setComment(e.target.value)} rows={2} style={{...inp,resize:"vertical",lineHeight:1.6}}/></div>
        <div style={{display:"flex",gap:10}}><button onClick={()=>setStep(1)} style={{...bt(false),flex:1}}>{t.prev}</button><button onClick={()=>setStep(3)} disabled={!ok2} style={{...bt(ok2),flex:2,opacity:ok2?1:0.4}}>{t.next}</button></div>
      </div>}
      {step===3&& <div style={{display:"flex",flexDirection:"column",gap:16,animation:"fadeUp 0.3s"}}>
        <div><label style={lbl}>{t.categoryLabel}</label><div style={{display:"flex",flexWrap:"wrap",gap:6}}>{PCATS.map(c=><button key={c} onClick={()=>setCat(c)} style={pill(cat===c)}>{c}</button>)}</div></div>
        <div><label style={lbl}>{t.previewLabel}</label>
          <div style={{background:C.card,borderRadius:12,overflow:"hidden",border:`1px solid ${C.border}`}}>
            {photo&& <img src={photo} alt="" style={{width:"100%",maxHeight:180,objectFit:"cover",display:"block"}}/>}
            <div style={{padding:"16px 18px"}}>
              <div style={{fontFamily:FS,fontSize:11,color:C.light,marginBottom:6}}>{loc||t.locUnset} · {cat||t.catUnset}</div>
              <div style={{fontFamily:FF,fontSize:16,fontWeight:600,color:C.text,marginBottom:6}}>{orig}</div>
              <div style={{fontFamily:FF,fontSize:15,color:C.bad,textDecoration:"line-through",marginBottom:4}}>{bad}</div>
              <div style={{fontFamily:FF,fontSize:15,color:C.ok}}>{correct}</div>
              {comment&& <p style={{fontFamily:FS,fontSize:12,color:C.mid,margin:"8px 0 0",fontStyle:"italic"}}>&quot;{comment}&quot;</p>}
            </div>
          </div>
        </div>
        <div style={{display:"flex",gap:10}}><button onClick={()=>setStep(2)} style={{...bt(false),flex:1}}>{t.prev}</button><button onClick={submit} style={{...bt(true),flex:2}}>{t.submit}</button></div>
        {!user&& <p style={{fontFamily:FS,fontSize:12,color:C.light,textAlign:"center",margin:0}}>{t.loginRequired}</p>}
      </div>}
    </div>
  );
}

function TranslateTab(){
  const{t,lang}=useLang();const[jp,setJp]=useState("");const[sc,setSc]=useState("sign");
  const[res,setRes]=useState(null);const[ld,setLd]=useState(false);const[err,setErr]=useState(null);const[cp,setCp]=useState(false);
  const go=async()=>{if(!jp.trim())return;setLd(true);setErr(null);setRes(null);const sl=SCENES.find(s=>s.v===sc);
    const sceneLabel=sl?.ja;
    const japanese=jp;
    try{const r=await fetch("/api/translate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({japanese,scene:sceneLabel})});const d=await r.json();setRes(JSON.parse((d.content?.[0]?.text||"").replace(/```json|```/g,"").trim()));
    }catch(e){setErr(t.transError);}finally{setLd(false);}};
  const copy=x=>{navigator.clipboard.writeText(x);setCp(true);setTimeout(()=>setCp(false),2000);};
  return(
    <div style={{maxWidth:560,margin:"0 auto",padding:"0 20px 80px"}}>
      <div style={{padding:"40px 0 24px"}}><h1 style={{fontFamily:FF,fontSize:28,fontWeight:600,color:C.text,margin:"0 0 6px"}}>{t.transTitle}</h1><p style={{fontFamily:FS,fontSize:14,color:C.light,margin:0}}>{t.transSub}</p></div>
      <div style={{marginBottom:16}}><label style={lbl}>{t.sceneLabel}</label><div style={{display:"flex",flexWrap:"wrap",gap:6}}>{SCENES.map(s=><button key={s.v} onClick={()=>setSc(s.v)} style={pill(sc===s.v)}>{lang==="ja"?s.ja:s.en}</button>)}</div></div>
      <div style={{background:C.card,borderRadius:12,border:`1px solid ${C.border}`,marginBottom:16,overflow:"hidden"}}>
        <textarea value={jp} onChange={e=>setJp(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&(e.metaKey||e.ctrlKey))go();}} placeholder={t.inputHint} rows={3} style={{width:"100%",border:"none",outline:"none",resize:"vertical",fontFamily:FS,fontSize:16,padding:"16px 18px 8px",background:"transparent",color:C.text,boxSizing:"border-box",lineHeight:1.6}}/>
        <div style={{display:"flex",justifyContent:"flex-end",padding:"4px 12px 12px"}}>
          <button onClick={go} disabled={!jp.trim()||ld} style={{...bt(!jp.trim()||ld?false:true),padding:"8px 20px",fontSize:13,opacity:!jp.trim()||ld?0.4:1}}>
            {ld? <span style={{display:"inline-flex",alignItems:"center",gap:6}}><span style={{width:14,height:14,border:"2px solid rgba(255,255,255,0.3)",borderTopColor:"#fff",borderRadius:"50%",display:"inline-block",animation:"spin 0.8s linear infinite"}}/>{t.translating}</span>: <span style={{display:"inline-flex",alignItems:"center",gap:6}}><SparkleIcon/> {t.translateBtn}</span>}
          </button>
        </div>
      </div>
      {err&& <p style={{fontFamily:FS,fontSize:13,color:C.bad,padding:"12px 16px",background:C.badBg,borderRadius:8,margin:"0 0 16px"}}>{err}</p>}
      {res&& <div style={{animation:"fadeUp 0.35s"}}>
        <div style={{background:C.okBg,borderRadius:12,padding:"20px 22px",marginBottom:12,borderLeft:`3px solid ${C.ok}`}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
            <span style={{fontFamily:FS,fontSize:11,fontWeight:600,color:C.ok,letterSpacing:"0.05em"}}>{t.correctTrans}</span>
            <button onClick={()=>copy(res.translation)} style={{background:"none",border:"none",cursor:"pointer",color:C.ok,display:"flex",alignItems:"center",gap:4,fontFamily:FS,fontSize:11}}><CopyIcon/> {cp?t.copied:t.copy}</button>
          </div>
          <div style={{fontFamily:FF,fontSize:24,fontWeight:600,color:C.ok,lineHeight:1.3}}>{res.translation}</div>
          {res.notes&& <p style={{fontFamily:FS,fontSize:13,color:C.mid,margin:"10px 0 0",lineHeight:1.6}}>{res.notes}</p>}
        </div>
        {res.alternatives?.length>0&& <div style={{background:C.card,borderRadius:12,padding:"16px 20px",marginBottom:12,border:`1px solid ${C.border}`}}>
          <span style={{fontFamily:FS,fontSize:11,fontWeight:600,color:C.info,letterSpacing:"0.05em"}}>{t.altExpr}</span>
          <div style={{marginTop:8,display:"flex",flexDirection:"column",gap:6}}>{res.alternatives.map((a,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 12px",background:C.surface,borderRadius:6}}><span style={{fontFamily:FF,fontSize:16,fontWeight:500,color:C.text}}>{a}</span><button onClick={()=>copy(a)} style={{background:"none",border:"none",cursor:"pointer",color:C.light,padding:2}}><CopyIcon/></button></div>)}</div>
        </div>}
        {res.badExample&& <div style={{background:C.badBg,borderRadius:12,padding:"16px 20px",borderLeft:`3px solid ${C.bad}`}}>
          <span style={{fontFamily:FS,fontSize:11,fontWeight:600,color:C.bad,letterSpacing:"0.05em"}}>{t.badExample}</span>
          <div style={{fontFamily:FF,fontSize:18,fontWeight:500,color:C.bad,margin:"6px 0 4px",textDecoration:"line-through",textDecorationColor:"rgba(180,84,50,0.3)"}}>{res.badExample}</div>
          {res.badReason&& <p style={{fontFamily:FS,fontSize:13,color:C.mid,margin:0,lineHeight:1.6}}>{res.badReason}</p>}
        </div>}
      </div>}
    </div>
  );
}

function AppInner(){
  const{lang,t,toggle}=useLang();const[tab,setTab]=useState("feed");const[up,setUp]=useState([]);
  const{user,setShowLogin,logout}=useAuth();const all=[...up,...EX];
  const tabs=lang==="ja"?[{id:"feed",l:t.tabFeed},{id:"translate",l:t.tabTranslate},{id:"post",l:t.tabPost}]:[{id:"feed",l:t.tabFeed},{id:"post",l:t.tabPost},{id:"translate",l:t.tabTranslate}];
  return(
    <div style={{minHeight:"100vh",background:C.bg,fontFamily:FS}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;600;700&family=Noto+Serif+JP:wght@400;500;600;700&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,500;0,8..60,600;0,8..60,700;1,8..60,400&family=Source+Sans+3:wght@300;400;500;600;700&display=swap');
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes slideUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        *{box-sizing:border-box}body{margin:0}
        textarea::placeholder,input::placeholder{color:${C.light}}
        ::-webkit-scrollbar{display:none}
        input:focus,textarea:focus{border-color:${C.accent} !important}
        button{outline:none}button:active{transform:scale(0.97)}
      `}</style>
      <nav style={{position:"sticky",top:0,zIndex:100,background:"rgba(250,250,246,0.92)",backdropFilter:"blur(16px)",WebkitBackdropFilter:"blur(16px)",borderBottom:`1px solid ${C.borderLt}`}}>
        <div style={{maxWidth:560,margin:"0 auto",padding:"0 20px"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",height:52}}>
            <div style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer"}} onClick={()=>setTab("feed")}>
              <span style={{fontFamily:FF,fontSize:20,fontWeight:700,color:C.text,letterSpacing:"-0.02em"}}>NaoshiTE</span>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <button onClick={toggle} style={{fontFamily:FS,fontSize:12,fontWeight:500,padding:"4px 10px",border:`1px solid ${C.border}`,borderRadius:6,cursor:"pointer",background:"transparent",color:C.mid}}>{lang==="ja"?"EN":"JP"}</button>
              {user? <button onClick={logout} title={t.logout} style={{width:30,height:30,borderRadius:"50%",background:C.accent,border:"none",cursor:"pointer",color:"#fff",fontFamily:FS,fontSize:12,fontWeight:600,display:"flex",alignItems:"center",justifyContent:"center"}}>{user.name.charAt(0).toUpperCase()}</button>
              : <button onClick={()=>setShowLogin(true)} style={{fontFamily:FS,fontSize:12,fontWeight:500,padding:"6px 14px",border:"none",borderRadius:6,cursor:"pointer",background:C.accent,color:"#fff",display:"flex",alignItems:"center",gap:4}}><UserIcon/> {t.login}</button>}
            </div>
          </div>
          <div style={{display:"flex",gap:0,marginTop:-1}}>
            {tabs.map(tb=><button key={tb.id} onClick={()=>setTab(tb.id)} style={{fontFamily:FS,fontSize:13,fontWeight:tab===tb.id?600:400,padding:"10px 16px",border:"none",borderBottom:`2px solid ${tab===tb.id?C.accent:"transparent"}`,cursor:"pointer",background:"transparent",color:tab===tb.id?C.text:C.light,transition:"all 0.2s"}}>{tb.l}</button>)}
          </div>
        </div>
      </nav>
      {tab==="feed"&& <FeedTab posts={all}/>}
      {tab==="post"&& <PostTab onPostCreated={p=>setUp(prev=>[p,...prev])} switchToFeed={()=>setTab("feed")}/>}
      {tab==="translate"&& <TranslateTab/>}
      <LoginModal/>
    </div>
  );
}

export default function App(){
  return <LangProvider><AuthProvider><AppInner/></AuthProvider></LangProvider>;
}
