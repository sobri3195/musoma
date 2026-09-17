import crypto from 'node:crypto';
const base=()=>process.env.MIDTRANS_IS_PRODUCTION==='true'?'https://api.midtrans.com':'https://api.sandbox.midtrans.com';
export const json=(res,status,data)=>{res.statusCode=status;res.setHeader('Content-Type','application/json');res.end(JSON.stringify(data))};
export const safe=(v,max=200)=>String(v||'').trim().slice(0,max);
export const midtrans=async(path,options={})=>fetch(base()+path,{...options,headers:{Authorization:'Basic '+Buffer.from(process.env.MIDTRANS_SERVER_KEY+':').toString('base64'),'Content-Type':'application/json',...options.headers}});
export const supabase=async(path,options={})=>fetch(process.env.VITE_SUPABASE_URL+'/rest/v1/'+path,{...options,headers:{apikey:process.env.SUPABASE_SERVICE_ROLE_KEY,Authorization:'Bearer '+process.env.SUPABASE_SERVICE_ROLE_KEY,'Content-Type':'application/json',Prefer:'return=representation',...options.headers}});
export const signatureValid=p=>{const raw=`${p.order_id}${p.status_code}${p.gross_amount}${process.env.MIDTRANS_SERVER_KEY}`;return crypto.createHash('sha512').update(raw).digest('hex')===p.signature_key};
export const mapStatus=s=>s==='settlement'||s==='capture'?'paid':s==='expire'?'expired':s==='refund'||s==='partial_refund'?'refunded':s==='deny'||s==='cancel'?'failed':'pending';
const hits=new Map(); export const limited=req=>{const key=req.headers['x-forwarded-for']||'local',now=Date.now(),old=hits.get(key)||[];const next=old.filter(t=>now-t<60000);next.push(now);hits.set(key,next);return next.length>20};
