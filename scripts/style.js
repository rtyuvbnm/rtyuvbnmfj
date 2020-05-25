document.addEventListener("DOMContentLoaded", () => {
  

  const O = '0px';
  const P = '800px';
  const pannelbox = document.getElementById('pannelbox');
  const parent = document.getElementById('parent');
  const pannel_array = new Array(7);
  for(i = 1; i <= 6; i++){
    pannel_array[i] = new Array(7);
    for(j = 1; j <= 6; j++){
      pannel_array[i][j] = {elem: document.getElementById(('pannel' + i) + j), stageNum: -1};
    }
  }

  //試作
  for(i = 1; i <= 6; i++){
    //pannel_array[i][1].elem.style.zIndex = toString(5 * i - 1);
    pannel_array[i][1].stageNum = i;
  }

  var stage = 0;
  init_all_pannels();

  function init_all_pannels(){
    for(i = 1; i <= 6; i++){
      for(j = 1; j <= 6; j++){
        pannel_array[i][j].elem.style.opacity = '0';
      }
    }
  }

  //あるclassの透明度を0にする
  function init_layer_class(stageNum){
    for(i = 1; i <= 6; i++){
      for(j = 1; j <= 6; j++){
        tmp = pannel_array[i][j];
        if(tmp.stageNum === stageNum){
          tmp.elem.style.opacity = '0';
        }
      }
    }
  }


  //クラスの透明度を1にする
  function appear_layer_class(stageNum){
    for(i = 1; i <= 6; i++){
      for(j = 1; j <= 6; j++){
        tmp = pannel_array[i][j];
        if(tmp.stageNum === stageNum){
          tmp.elem.style.opacity = '1';
        }
      }
    }
  }

  //今ステージを透明にして、次ステージを出現させる
  function upStage(nxt, cur){
    init_layer_class(cur);
    appear_layer_class(nxt);
  }


  //idnameのスライダーを動かす
  function moveslider(idname, t1, l1, t2, l2){
    const sliderbox = document.getElementById('sliderbox' + idname);

    sliderbox.style.top = t1;
    sliderbox.style.left = l1;

    setTimeout(() => {
      sliderbox.style.transition = '0s';
      sliderbox.style.top = t2;
      sliderbox.style.left = l2;
      setTimeout(() => {
        sliderbox.style.transition = '1s';
      }, 100);
    }, 2000);
  }

  //メッセージ
  function finisher(){
    const messagebox = document.createElement('div');
    messagebox.id = 'messagebox';
    document.body.appendChild(messagebox);
    messagebox.style.height = '200px';
    messagebox.style.width = '200px';
    messagebox.style.position = 'absolute';
    messagebox.style.top = '600px';
    messagebox.style.left = '600px';
    messagebox.style.zIndex = '999';
    messagebox.textContent = "message";

    stalker.style.background = 'green';
    stalker.style.height = '64px';
    stalker.style.width = '64px';
    stalker.style.opacity = 0.9;
  }

  //対応するスライダーを動かす
  function movesliders(e){
    if(e.target.id === 'sliderboxU'){
      //リセットして1を出現
      if(stage < 4){
        init_all_pannels();
        stage = 1;
        appear_layer_class(stage);
      }

      //スライダー動く
      moveslider('U', P, O, O, O);
    }
    if(e.target.id === 'sliderboxD'){
      if(stage === 1){
        upStage(2, 1);
        stage = 2;
      }
      else if(stage < 4){
        init_all_pannels();
        stage = 0;
      }
      moveslider('D', O, O, P, O);
    }
    if(e.target.id === 'sliderboxL'){
      if(stage === 2){
        upStage(3, 2);
        stage = 3;
      }
      else if(stage < 4){
        init_all_pannels();
        stage = 0;
      }
      moveslider('L', O, P, O, O);
    }
    if(e.target.id === 'sliderboxR'){
      if(stage === 3){
        upStage(4, 3);
        stage = 4;
      }
      else {
        init_all_pannels();
        stage = 0;
      }
      moveslider('R', O, O, O, P);
      if(stage === 4){
        setTimeout(() => {
          init_all_pannels();
          finisher();
        }, 1000);
      }
    }
  }

  //クリックされたときの挙動
  function click_events(e){
    movesliders(e);
  }

  //クリックイベントを監視対象に加える
  document.addEventListener('click', click_events);


  //マウスストーカー
  const stalker = document.getElementById("stalker");
  document.addEventListener('mousemove', function (e) {
    if(e.target.id === "sliderboxU"){
      stalker.style.opacity = "1";
    }
    else {
      if(stage < 4)stalker.style.opacity = "0.5";
    }
    stalker.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
  });

  


}, false);