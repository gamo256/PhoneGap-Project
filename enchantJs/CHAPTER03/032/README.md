# CHAPTER03-032

## Description

簡易ノベルゲームエンジン

表示する画像やテキストを簡素なデータ(JSONオブジェクト)で定義

ページデータの構造

```JavaScript
変数名 = {
      bgImage: '背景画像のパス',
      pageNo: ページ番号,
      nextFunc: '次のページを作成する関数名',
      textX: テキスト表示位置のx座標,
      textY: テキスト表示位置のy座標,
      textColor: 'テキストの文字色',
      text: {
        1: '表示するテキストの1行目',
        2: '表示するテキストの1行目',
                 ・
                 ・
        n: '表示するテキストのn行目',
      }
    }
```

定義したページデータを「makeScene」関数に渡すと、ページが作成されます。1ページ目(ルートシーン)を作成する場合のみ、「makeScene」関数の第2引数に「true」を指定する必要があります。

### Desktop

In your browser, open the file:

    /www/index.html

