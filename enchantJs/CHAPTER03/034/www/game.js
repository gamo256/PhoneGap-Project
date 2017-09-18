enchant();

window.onload = function() {

  core = new Core(320, 320);
  core.fps = 24;

  // ゲームで使用する画像ファイルを指定する 
  core.preload('icon1.png', 'bricks.png');
  // 「x」キーに「a」ボタンを割り当てる
  core.keybind(88, 'a');
  // スコアを格納するプロパティを設定する
  core.score = 0;
  // ボール発射フラグ(ボール発射済みなら「true」)
  core.isON = false;

  core.onload = function() {

    // 物理シミュレーションを行うための仮想世界を作成する 
    physicsWorld = new PhysicsWorld(0, 9.8);

    // バックグラウンド画像を表示するスプライトを作成する
    var background = new Sprite(320, 320);
    // バックグラウンドの背景色を水色に設定する
    background.backgroundColor = "#4abafa";
    core.rootScene.addChild(background);

    // 物理シミュレーション用のスプライトを配置するパターンの定義
    var tiles = [
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,24,24,24,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,20,29,20,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,20,28,20,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,24,24,24,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,29,20,21,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,28,20,22,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 2, 2, 2, 2, 2, 2, 2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 3, 3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 3, 3, 3, 3,-1,-1,-1,-1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 2],
      [ 2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 2, 2, 2, 2, 2, 2, 2, 2, 2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1],
      [ 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2,-1,-1, 2, 2,-1,-1,-1,-1,-1,-1,-1, 1],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,-1,-1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];

    // タイルの横幅を取得する
    var tiles_width = tiles[0].length * 16;
    // 「stage」グループを作成する
    var stage = new Group();
    
    // パターン(「tiles」配列)に従って、物理シミュレーション用のスプライトを配置する
    for (var i = 0; i < tiles.length; i++) {
      for (var j = 0; j < tiles[i].length; j++) {
        // パターンの値が「-1」ではないなら
        if (tiles[i][j] != -1) {
          // パターンの値が「20」より小さいなら
          if (tiles[i][j] < 20) {
            // 静止タイル(静止している四角形の物理シミュレーション用スプライト)を作成する
            var tile = new PhyBoxSprite(16, 16, enchant.box2d.STATIC_SPRITE, 1.0, 0.5, 0.2, true);
          } else {
            // それ以外なら、動くタイル(動く四角形の物理シミュレーション用スプライト)を作成する
            var tile = new PhyBoxSprite(16, 16, enchant.box2d.DYNAMIC_SPRITE, 1.0, 0.5, 0.2, true);
            // タイルの「enterframe」イベントリスナ
            tile.addEventListener('enterframe', function(e) {
              // 動くタイルとボールが衝突したら
              if (this.intersect(ball)) {
                // スコアを加算して、表示を更新する
                core.score += 100;
                scoreLabel.text = 'SCORE : ' + core.score;
              }
            });
          }
          // 画像に「bricks.png」を設定する
          tile.image = core.assets['bricks.png'];
          // 表示するフレーム番号を設定する
          tile.frame = tiles[i][j];
          // 表示位置(座標)を設定する
          tile.position = { x: j * 16 + 8 , y: i * 16  };
          // 「stage」グループにタイルを追加する
          stage.addChild(tile);
        }
      }
    }
    // rootSceneに「stage」グループを追加する
    core.rootScene.addChild(stage);

    // ボール(動く円形の物理シミュレーション用スプライト)を作成する
    var ball = new PhyCircleSprite(8, enchant.box2d.DYNAMIC_SPRITE, 1.0, 0.5, 0.5, true);
    // 画像に「icon1.png」を設定する
    ball.image = core.assets['icon1.png'];
    ball.frame = 0;                     // フレーム番号
    ball.position = { x: 32 , y: 252 }; // 表示位置(座標)
    ball.speed = 4;                     // スピード
    ball.direction = 0;                 // 向き
    ball.buttonMode = 'a';              // ボタンモード
    // rootSceneにボールを追加する
    stage.addChild(ball);
    
    // 力の大きさを設定する変数
    var power = 0;

    // ボールに加える力の大きさを表すバーを作成する

    // バーを格納する配列
    var bars = [];
    // (16, 10)の位置から「10」ピクセル幅のバーを25個、x方向に並べる
    for (var i = 0; i < 25; i++) {
      // バーを作成する
      var pb = makeBar(i * 10 + 16, 10);
      // バーを配列に格納する
      bars[i]= pb;
      // rootSceneにバーを追加する
      core.rootScene.addChild(pb);
    }

    // rootSceneの「enterframe」イベントリスナ
    core.rootScene.addEventListener('enterframe', function (e) {
      // 物理シミュレーション内の時間を進める
      physicsWorld.step(core.fps);
      
      // 「a」ボタンの押している時間(力の大きさ)に応じて、バーを長くする
      
      if (core.input.a) {
        // ボール発射済みならリターン
        if (core.isON  == true) return;
        // 「a」ボタンが押されており、「power」変数の値が最大値に以下なら
        if (power < 25) {
          // 「power」変数の値に対応するバーを表示する
          bars[power].visible = true;
          // 「power」変数の値をインクリメントする
          power ++;
        }
      }
      
      // 右ボタンが押されたら、画面( 「stage」グループ)を右方向にスクロールする
      if (core.input.right) {
        stage.x -= 16;
      } else {
        // そうでなければ、 ボールの位置を中心とした画面、または左端の画面を表示する
        var x = Math.min((core.width  - 16) / 2 - ball.x, 0);
        stage.x = x;
      }
      // 左ボタンが押され、ボール発射済みなら
      if (core.input.left && core.isON  == true) {
        // ページをリロードする(リセットする)
        location.reload();
      }
      // ボールが飛んでいる状態になったら、バーの長さを短くしていく
      if (ball.jump == true) {
        power --;
        bars[power].visible = false;
        // 「power」変数が「1」より小さくなったら、ボールの「jump」プロパティを「false」にする
        if (power < 1) ball.jump = false;
      }
    });
    // rootSceneの「abuttonup」イベントリスナ
    core.rootScene.addEventListener('abuttonup', function (e) {
      // ボール発射済みならリターン
      if (core.isON  == true) return;
      // ボールに「power」変数の値に応じた瞬発的な力を加える
      ball.applyImpulse(new b2Vec2(power/10, -(power/10)));
      // ボールの「jump」プロパティを「true」にする(ボールが飛んでいる状態を表す)
      ball.jump = true;
      // 「ボール発射済みにする
      core.isON  = true;
    });

    // スコアを表示するラベルを作成する
    var scoreLabel = new Label();
    scoreLabel.color = '#FFFFFF';     // 文字色
    scoreLabel.x = core.width - 100;  // x座標 
    scoreLabel.y = 0;                 // y座標
    scoreLabel.text = 'SCORE : ' + 0; // 表示するテキスト
    scoreLabel.font ='14px sens-serif'; // フォントサイズとフォントの種類
    core.rootScene.addChild(scoreLabel);

    // バーチャルパッドを作成する
    var pad = new Pad();
    pad.x = 220; // x座標
    pad.y = 220; // y座標
    core.rootScene.addChild(pad);

  };
  core.start();
};

// パワーバーを作成する関数
var makeBar = function(x, y) {
  // バーを表示するスプライトを作成する
  var bar = new Sprite(10, 10);
  // 背景色に赤色を設定する
  bar.backgroundColor = "#FF0000";
  bar.x = x; // x座標
  bar.y = y; // y座標
  bar.visible = false; // 可視状態(非表示)
  return bar; //作成したスプライトオブジェクトを返す
}
