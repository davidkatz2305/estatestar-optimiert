/* Deliberate enhancements layered on the reverse-engineered original. */
(() => {
  'use strict';
  const en = document.documentElement.lang.startsWith('en');
  const base = '/estatestar-optimiert/';
  const assets = '/estatestar-preview/';
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const home = !!document.getElementById('hero');
  const text = (de, eng) => en ? eng : de;
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  // No server submission: explicitly prepare a draft the visitor can open.
  document.addEventListener('submit', event => {
    if (!event.target.matches('.elementor-form')) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    const form = event.target;
    const fields = [...form.querySelectorAll('input:not([type=hidden]),textarea')]
      .filter(field => field.placeholder && field.value.trim());
    const body = fields.map(field => `${field.placeholder}: ${field.value.trim()}`).join('\n\n');
    const mailto = 'mailto:studio@estatestar.de?subject=' + encodeURIComponent(text('Projektanfrage ESTATESTAR','ESTATESTAR project enquiry')) + '&body=' + encodeURIComponent(body);
    let result = form.querySelector('.es-email-result');
    if (!result) {
      result = document.createElement('p');
      result.className = 'es-email-result';
      result.setAttribute('role','status');
      form.append(result);
    }
    result.replaceChildren(document.createTextNode(text('Deine Anfrage ist vorbereitet. ','Your enquiry is ready. ')));
    const link = document.createElement('a');
    link.href = mailto;
    link.textContent = text('Im E-Mail-Programm öffnen →','Open in your email app →');
    result.append(link);
  }, true);

  document.querySelectorAll('.elementor-form').forEach(form => {
    form.querySelectorAll('input[placeholder],textarea[placeholder]').forEach(field => {
      if (field.placeholder) field.setAttribute('aria-label',field.placeholder);
      if (field.type === 'tel') { field.required = false; field.placeholder = text('Telefon (optional)','Phone (optional)'); }
      if (field.type === 'email') field.autocomplete = 'email';
      if (field.placeholder === 'Name') field.autocomplete = 'name';
    });
    const label = form.querySelector('.elementor-button-text');
    if (label) label.textContent = text('E-MAIL VORBEREITEN','PREPARE EMAIL');
  });
  if (!home) return;
  document.body.classList.add('es-home');

  // A separate, clearly labelled proposal using existing photos, never fake AI results.
  const ki = document.createElement('section');
  ki.id = 'ki'; ki.className = 'es-ki'; ki.setAttribute('aria-labelledby','es-ki-title');
  const projects = [
    {image:'03-Luxus-Townhouse-Berlin-Wohnzimmer-Esszimmer-Architektur-Innen-Immobilie-Foto-Preview.jpg', title:text('KI HOME STAGING','AI HOME STAGING'), copy:text('Leere Räume mit einem passenden Einrichtungskonzept zeigen. Bildserien werden auf Perspektive, Proportionen und Details geprüft.','Show empty rooms with a fitting interior concept. Image series are reviewed for perspective, proportions and detail.')},
    {image:'01-Rocket-Tower-Konferenzraum-GSW-Hochhaus-Architektur-Innen-Immobilie-Foto-Berlin-Preview.jpg', title:text('RENOVIERUNGSVISIONEN','RENOVATION VISIONS'), copy:text('Farben, Materialien und Einrichtung als Gestaltungsidee visualisieren – mit nachvollziehbarem Vergleich zum Bestand.','Visualise colours, materials and furnishings as a design concept, with a transparent comparison to the existing space.')},
    {image:'02-Stilwerk-Duesseldorf-Innenhof-Architektur-Innen-Immobilie-Foto-Preview.jpg', title:text('KI IMMOBILIENCLIPS','AI PROPERTY CLIPS'), copy:text('Aus vorhandenem Bildmaterial kurze Immobilienfilme entwickeln. Ergänzt durch Schnitt, Typografie und klar gekennzeichnete Visualisierungen.','Create short property films from existing imagery, with editing, typography and clearly identified visualisations.')}
  ];
  ki.innerHTML = `<div class="es-ki-intro"><p class="es-ki-eyebrow">DIGITAL LAB · ${text('ANGEBOTSENTWURF','SERVICE CONCEPT')}</p><h2 id="es-ki-title">KI STUDIO</h2><p>${text('Neue Möglichkeiten für die Immobilienvermarktung. Mit unserem Blick für Architektur und Bildgestaltung.','New possibilities for property marketing. With our eye for architecture and visual storytelling.')}</p></div>
    <div class="es-ki-grid">${projects.map((project,index)=>`<article class="es-ki-card"><figure><img data-ki-image="${index}" alt="${text('Originale ESTATESTAR-Innenaufnahme als mögliche Arbeitsgrundlage','Original ESTATESTAR interior photo as potential source material')}" loading="lazy" decoding="async" width="960" height="600"><figcaption>${text('Originalaufnahme · mögliche Arbeitsgrundlage','Original photograph · potential source material')}</figcaption></figure><h3>${project.title}</h3><p>${project.copy}</p></article>`).join('')}</div>
    <div class="es-ki-footer"><p>${text('Neue Leistungen in Vorbereitung. Visualisierungen werden als solche gekennzeichnet; sie ersetzen keine Prüfung der baulichen Machbarkeit.','New services in preparation. Visualisations are identified as such and do not replace a feasibility assessment.')}</p><a class="es-ki-cta" href="#contact">${text('Projekt besprechen','Discuss your project')} ↗</a></div>`;
  document.getElementById('team').before(ki);
  ki.querySelector('.es-ki-cta').addEventListener('click',event=>{
    event.preventDefault();
    const contact = ['mcontact','contact'].map(id=>document.getElementById(id)).find(el=>el.getBoundingClientRect().height>0);
    contact.scrollIntoView({behavior: motion.matches ? 'auto':'smooth'});
  });
  document.querySelectorAll('nav li').forEach(item => {
    const link = item.querySelector('a');
    if (link && ['#team','#mteam'].includes(new URL(link.href).hash)) {
      const added = item.cloneNode(true); added.removeAttribute('id');
      const anchor=added.querySelector('a'); anchor.href='#ki'; anchor.textContent='KI STUDIO';
      item.before(added);
    }
  });
  document.querySelectorAll('p > a[href$="#mteam"]').forEach(link=>{
    const added=link.parentElement.cloneNode(true);
    const anchor=added.querySelector('a');anchor.href='#ki';anchor.textContent='KI STUDIO';
    link.parentElement.before(added);
  });

  // Prefer the larger original photos over the original 300px gallery previews.
  fetch(base+'image-map.json').then(response=>response.json()).then(map=>{
    const improve = image => {
      if (image.dataset.esImproved) return;
      if (!image.closest('.eael-filterable-gallery-item-wrap,.eael-elements-flip-box-container')) return;
      const name = decodeURIComponent((image.getAttribute('src')||'').split('/').pop()).replace(/-\d+x\d+(?=\.[^.]+$)/,'');
      if (!map[name]) return;
      image.src=map[name]; image.removeAttribute('srcset'); image.dataset.esImproved='true';
      if (!image.alt) image.alt=image.closest('.eael-filterable-gallery-item-wrap')?.querySelector('[title]')?.title || text('ESTATESTAR Architekturfotografie','ESTATESTAR architectural photography');
    };
    document.querySelectorAll('img').forEach(improve);
    new MutationObserver(records=>records.forEach(record=>record.addedNodes.forEach(node=>{
      if (node.nodeType!==1) return;
      if (node.matches('img')) improve(node);
      node.querySelectorAll('img').forEach(improve);
    }))).observe(document.body,{childList:true,subtree:true});
    ki.querySelectorAll('[data-ki-image]').forEach((image,index)=>image.src=map[projects[index].image]);
  }).catch(()=>{
    const originals=[...document.querySelectorAll('#photo .eael-cf-interieur img')];
    ki.querySelectorAll('[data-ki-image]').forEach((image,index)=>{if(originals[index])image.src=originals[index].src;});
  });

  // The original list controls also work with a keyboard, retaining their appearance.
  document.querySelectorAll('.eael-filter-gallery-control .control').forEach(control=>{
    control.setAttribute('role','button'); control.tabIndex=0;
    const update=()=>control.setAttribute('aria-pressed',String(control.classList.contains('active')));
    update();new MutationObserver(update).observe(control,{attributes:true,attributeFilter:['class']});
    control.addEventListener('keydown',event=>{if(['Enter',' '].includes(event.key)){event.preventDefault();control.click();}});
  });
  document.querySelectorAll('#team .eael-elements-flip-box-container').forEach(card=>{
    card.tabIndex=0;
    card.setAttribute('aria-label',card.querySelector('h3')?.textContent.trim()||'Team');
  });

  let snapEnabled=true;
  try { snapEnabled=localStorage.getItem('estatestar-snap')!=='off'; } catch {}
  const ids=['hero','mission','photo','film','360','digitallab','ki','team','mteam','mcontact','contact'];
  const sections=()=>ids.map(id=>document.getElementById(id)).filter(section=>section?.getBoundingClientRect().height>0);
  const pager=document.createElement('nav');pager.className='es-pager';pager.setAttribute('aria-label',text('Seitenabschnitte','Page sections'));
  pager.innerHTML=`<button type="button" data-direction="-1" aria-label="${text('Vorheriger Abschnitt','Previous section')}">↑</button><output aria-label="${text('Aktueller Abschnitt','Current section')}">01 / 09</output><button type="button" data-direction="1" aria-label="${text('Nächster Abschnitt','Next section')}">↓</button>`;
  document.body.append(pager);
  const current=()=>{const list=sections();let index=0;list.forEach((section,i)=>{if(section.getBoundingClientRect().top<=innerHeight*.35)index=i;});return {list,index};};
  const updatePager=()=>{const {list,index}=current();pager.hidden=['contact','mcontact'].includes(list[index]?.id);pager.querySelector('output').textContent=`${String(index+1).padStart(2,'0')} / ${String(list.length).padStart(2,'0')}`;pager.querySelector('[data-direction="-1"]').disabled=index===0;pager.querySelector('[data-direction="1"]').disabled=index===list.length-1;};
  pager.addEventListener('click',event=>{const button=event.target.closest('[data-direction]');if(!button)return;const {list,index}=current();list[index+Number(button.dataset.direction)]?.scrollIntoView({behavior:motion.matches?'auto':'smooth'});});
  let frame;addEventListener('scroll',()=>{if(!frame)frame=requestAnimationFrame(()=>{updatePager();frame=0;});},{passive:true});
  addEventListener('resize',updatePager,{passive:true});
  const applySnap=()=>{
    document.documentElement.classList.toggle('es-snap',snapEnabled&&!motion.matches);
    document.querySelectorAll('.es-snap-toggle').forEach(button=>{button.textContent=text('Einrasten: ','Snap: ')+(snapEnabled&&!motion.matches?text('an','on'):text('aus','off'));button.setAttribute('aria-pressed',String(snapEnabled&&!motion.matches));});
  };
  document.querySelectorAll('a[href$="datenschutz/"],a[href$="dataprotection/"]').forEach(link=>{
    const button=document.createElement('button');button.type='button';button.className='es-snap-toggle';
    button.addEventListener('click',()=>{snapEnabled=!snapEnabled;try{localStorage.setItem('estatestar-snap',snapEnabled?'on':'off');}catch{}applySnap();});
    link.parentElement.append(button);
    const reference=document.createElement('a');reference.className='es-version-link';reference.href=assets+(en?'en/':'');reference.target='_blank';reference.rel='noopener';reference.textContent=text('Originalversion ↗','Original version ↗');link.parentElement.append(reference);
  });
  applySnap();updatePager();motion.addEventListener('change',applySnap);

  // Pause controls and visibility-based playback for the original background films.
  ['hero','digitallab'].forEach(id=>{
    const section=document.getElementById(id);const button=document.createElement('button');
    button.type='button';button.className='es-video-toggle';let paused=motion.matches;let visible=false;
    const sync=()=>{
      const label=paused?text('▶ Video abspielen','▶ Play video'):text('Ⅱ Video pausieren','Ⅱ Pause video');
      if(button.textContent!==label)button.textContent=label;
      button.setAttribute('aria-pressed',String(paused));
      section.querySelectorAll('video').forEach(video=>{video.muted=true;if(paused||!visible||document.hidden)video.pause();else video.play().catch(()=>{});});
    };
    button.addEventListener('click',()=>{paused=!paused;sync();});section.append(button);
    new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();},{threshold:.1}).observe(section);
    new MutationObserver(sync).observe(section,{childList:true,subtree:true});
    document.addEventListener('visibilitychange',sync);motion.addEventListener('change',()=>{paused=motion.matches;sync();});sync();
  });
})();
