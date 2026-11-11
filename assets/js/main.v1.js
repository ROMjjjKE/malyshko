
(function(){
  'use strict';
  var WA='https://wa.me/375295823357';
  var burger=document.getElementById('burger'), drawer=document.getElementById('drawer'),
      closeBtn=document.getElementById('drawerClose');
  function openD(){ if(!drawer) return; drawer.hidden=false; document.body.classList.add('is-locked');
    burger.setAttribute('aria-expanded','true'); var f=drawer.querySelector('a,button'); if(f) f.focus(); }
  function closeD(){ if(!drawer) return; drawer.hidden=true; document.body.classList.remove('is-locked');
    burger.setAttribute('aria-expanded','false'); burger.focus(); }
  if(burger) burger.addEventListener('click', openD);
  if(closeBtn) closeBtn.addEventListener('click', closeD);
  if(drawer) drawer.addEventListener('click', function(e){ if(e.target===drawer) closeD(); });
  document.addEventListener('keydown', function(e){
    if(!drawer||drawer.hidden) return;
    if(e.key==='Escape'){ closeD(); return; }
    if(e.key==='Tab'){ var f=drawer.querySelectorAll('a,button'); if(!f.length) return;
      var first=f[0], last=f[f.length-1];
      if(e.shiftKey && document.activeElement===first){ e.preventDefault(); last.focus(); }
      else if(!e.shiftKey && document.activeElement===last){ e.preventDefault(); first.focus(); } }
  });
  window.addEventListener('resize', function(){ if(window.innerWidth>1080 && drawer && !drawer.hidden) closeD(); });

  /* слои */
  var LAYERS=[["Стекло","Верхний слой. Трескается первым и держит осколки на себе.","Заменяем отдельно, если матрица целая."],
    ["Клеевой слой OCA","Оптически прозрачный клей. Со временем мутнеет, от жары и воды отслаивается.","Удаляем полностью, иначе новое стекло даст пятна."],
    ["Дигитайзер","Сенсор касаний. От удара может треснуть даже при целом стекле.","Проверяем по всей площади до склейки."],
    ["Матрица дисплея","Самая дорогая часть, изображение. Тонкая и не любит давления.","Если целая, сохраняем: ради неё и делается переклейка."],
    ["Подсветка и шлейф","Слой света и шлейф, который соединяет экран с платой.","Смотрим на изгиб и окислы на контактах."]];
  var lp=document.getElementById('layerPanel');
  function showLayer(i){
    var d=LAYERS[i]; if(!d||!lp) return;
    lp.innerHTML='<span class="tag">Слой '+(i+1)+' из 5</span><h3>'+d[0]+'</h3><p style="margin:0 0 6px;color:#414842">'+d[1]+'</p>'
      +'<ul><li><strong>Что делаем:</strong> '+d[2]+'</li></ul>';
    document.querySelectorAll('.layer[data-layer]').forEach(function(b){
      b.setAttribute('aria-expanded', b.dataset.layer===String(i) ? 'true':'false'); });
  }
  document.querySelectorAll('.layer[data-layer]').forEach(function(b){
    b.addEventListener('click', function(){ showLayer(parseInt(b.dataset.layer,10)); }); });
  if(lp) showLayer(0);

  /* симптомы */
  var SYM=[["Разбито стекло","Переклейка","Снимаем стекло, чистим матрицу, клеим новое на OCA. Дисплей остаётся родной.","Обычно 1 день"],
    ["Трещина, но тач работает","Переклейка","Чем раньше, тем лучше: через трещину в матрицу идёт пыль и влага.","Обычно 1 день"],
    ["Полосы или пятна","Модуль","Полосы почти всегда означают повреждение матрицы. Переклейка не спасёт, но мы проверим и покажем.","После осмотра"],
    ["Не реагирует на касания","Сенсор","Сначала дигитайзер и шлейф. Иногда дело в разъёме или плате, и стекло менять не нужно.","1 день"],
    ["Утопили в воде","Влага","Разборка, чистка платы, замена пробитых элементов. Шанс выше, если не сушили феном.","1–3 дня"],
    ["Не заряжается","Разъём","Чистка и замена разъёма, проверка контроллера питания.","1 день"],
    ["Не слышно собеседника","Динамик","Динамик, микрофон или шлейф. Меняется узлом, без пайки платы.","1 день"],
    ["Вздулась батарея","Питание","Замена аккумулятора и проверка контроллера заряда. Вздутую батарею в аппарате не оставляем.","1 день"]];
  var vd=document.getElementById('verdict');
  function showSym(i){
    var s=SYM[i]; if(!s||!vd) return;
    vd.innerHTML='<span class="tag">'+s[1]+'</span><h3>'+s[0]+'</h3><p>'+s[2]+'</p>'
      +'<ul><li><strong>Срок:</strong> '+s[3]+'</li></ul>'
      +'<p style="margin-top:14px"><a class="btn btn--lime" href="'+WA+'?text='+encodeURIComponent('Здравствуйте! '+s[0]+'. Модель: ')+'">Уточнить в WhatsApp</a></p>';
    document.querySelectorAll('.chip[data-sym]').forEach(function(c){
      c.setAttribute('aria-pressed', c.dataset.sym===String(i)?'true':'false'); });
  }
  document.querySelectorAll('.chip[data-sym]').forEach(function(c){
    c.addEventListener('click', function(){ showSym(parseInt(c.dataset.sym,10)); }); });
  if(vd) showSym(0);

  /* форма */
  var form=document.getElementById('leadForm'), msg=document.getElementById('formMsg');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var f=form.elements, name=(f.name.value||'').trim(), phone=(f.phone.value||'').trim();
      if(!name||!phone){ if(msg){msg.style.color='#A33';msg.textContent='Заполните имя и телефон.';} return; }
      var text='Заявка с сайта\nИмя: '+name+'\nСвязь: '+phone+'\nМодель: '+((f.model&&f.model.value)||'-')
        +'\nЧто случилось: '+f.item.value+'\nКомментарий: '+((f.msg&&f.msg.value)||'-');
      if(msg){ msg.style.color=''; msg.textContent='Открываю WhatsApp с готовым сообщением.'; }
      window.open(WA+'?text='+encodeURIComponent(text),'_blank');
    });
  }
})();
