const content = window.SITE_CONTENT;
document.querySelectorAll('[data-event]').forEach(el => {el.textContent = content.event[el.dataset.event]; if(el.tagName === 'TIME') el.dateTime = content.event.date;});
document.querySelectorAll('[data-event-link]').forEach(el => {el.href = content.event.url;});
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
menu.addEventListener('click', () => {const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); nav.classList.toggle('open',open);});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {menu.setAttribute('aria-expanded','false');nav.classList.remove('open');}));
document.addEventListener('keydown', e => {if(e.key === 'Escape' && nav.classList.contains('open')) {nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.focus();}});
document.querySelectorAll('[data-inquiry]').forEach(a => a.addEventListener('click', () => {document.querySelector('[name="inquiry"]').value=a.dataset.inquiry;}));
function connectForm(id, endpoint, noteId, readyNote, success) {
 const form=document.getElementById(id), button=form.querySelector('button'), status=form.querySelector('.form-status');
 if(endpoint) {button.disabled=false;document.getElementById(noteId).textContent=readyNote;}
 form.addEventListener('submit',async e=>{e.preventDefault();if(!endpoint){status.textContent='Submissions are not available yet. Nothing has been sent.';return;}
 if(!form.reportValidity())return; button.disabled=true;form.setAttribute('aria-busy','true');status.textContent='Sending…';
 try {const response=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(Object.fromEntries(new FormData(form)))});if(!response.ok)throw new Error('Request failed');status.textContent=success;form.reset();}
 catch{status.textContent='We couldn’t send this right now. Your information is still here; please try again.';}
 finally{button.disabled=false;form.removeAttribute('aria-busy');}
 });
}
connectForm('booking-form',content.integrations.bookingEndpoint,'booking-note','Share a little about your event or opportunity.','Thank you. Your inquiry has been received.');
connectForm('newsletter-form',content.integrations.newsletterEndpoint,'newsletter-note','By signing up, you agree to receive updates from Tonio. You can unsubscribe at any time.','You’re on the list. Thank you for staying connected.');
if(content.integrations.creatorUrl){const a=document.createElement('a');a.href=content.integrations.creatorUrl;a.textContent='ONYX Creatrix';document.querySelector('#creator').replaceChildren(a);}
for(const [key,id] of [['communityHighlights','community-highlights'],['experience','experience']]){if(!content[key].length)continue;const root=document.getElementById(id);root.hidden=false;const h=document.createElement('h3');h.textContent=key==='experience'?'As seen / heard / in the room':'Community in action';root.append(h);content[key].forEach(item=>{const article=document.createElement('article');const heading=document.createElement('h4');heading.textContent=item.title;const p=document.createElement('p');p.textContent=item.description;article.append(heading,p);root.append(article);});}
document.getElementById('year').textContent=new Date().getFullYear();
