import axios from "axios";

export default async function handler(req, res) {
  try {
    const apiResponse = await axios(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=ja-JP`); //ブラウザで確認できないようにするためサーバー呼び出し
    res.status(200).json(apiResponse.data);
    // console.log("取得結果", apiResponse.data); // frontに返す
  } catch (error) {
    console.log(error);
    res.status(500).json('エラーが発生');
  }
}