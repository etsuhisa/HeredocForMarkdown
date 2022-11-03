# HeredocForMarkdown

Javascriptの関数のコメントによる疑似ヒアドキュメントで記述された
ローカルのMarkdownファイルをブラウザで表示します。

## 使い方

HTMLファイルのscriptタグでhd4md.jsを読み込みます。
HeredocForMarkdownのパラメタにMarkdownのパーサ(例ではmarkedを使用)と表示するdivのidを指定します。
loadで表示するmdファイルを指定します。拡張子は省略可能です。
HeredocForMarkdownのオブジェクトを代入する変数名は任意です。

```
<script src="hd4md.js"></script>
<script>
const MD = new HeredocForMarkdown(marked.parse, "view");
MD.load("sample1");
</script>

<div id="view"></div>
```

## mdファイルの書き方

template.mdを見てください。
先頭行と最終行にマジックラインを入れる必要があります。
これらは疑似的なヒアドキュメントとして扱うために必要な行です。
Markdownビューアでも本文が正しく表示できるように、マジックラインと本文の間に空行を入れることをお勧めします。
先頭行に指定する変数(例ではMD)はHeredocForMarkdownのオブジェクトを代入した変数です。
mdファイルのリンクはリンク元のファイルからの相対パスで指定します。

```
MD.set(()=>{/* // magic line

Write your heredoc here. Write '*\/' to escape the end of a comment.

*/}); // magic line
```

## インタフェース

### HeredocForMarkdown
```
HeredocForMarkdown(parser, targetid, display)
```
HeredocForMarkdownのオブジェクトを作成するためにnew演算子で呼び出します。
- `parser`には、MarkdownのテキストをHTMLに変換する関数を指定します。例ではmarkd.parseを使用しています。
- `targetid`には、変換したHTMLを表示する要素のidを指定します。
- `display`は、変換したHTMLを表示する処理を変更したい場合に指定します。
  省略した場合は`targetid`の要素に変換したHTMLを表示し、mdファイルへのリンク処理を変更します。

### load
```
MD.load(file)
```
指定したmdファイルを読み込みます。
- `file`には、読み込むmdファイルを指定します。拡張子.mdは省略可能です。

### set
```
MD.set(fn)
```
mdファイルのマジックラインで呼び出します。
- `fn`は関数のコメントによる疑似ヒアドキュメントを指定します。

## デモ
sample.htmlを参照してください。
最初にmd/sample1.mdが表示され、sample2のリンクをクリックするとmd/sample2.mdが表示されます。
sample11をクリックするとmd/folder1/sample11.mdが表示されます。
sample1をクリックするとmd/sample1.mdが表示されます。

