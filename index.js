import http from 'http'
import fs from 'fs'

import getlist from './app/getlist'
import getcomment from './app/getcomment'


getl();
async function getl() {
  var list = await getlist("http://search.aixifan.com/search?q=%E5%90%8C%E6%80%A7&pageSize=999999&parentChannelId=63&sortField=releaseDate");

  for (var i = 0; i < list.length; i++) {
    console.log(list[i].contentId);
    let ll = await getcomment(`http://www.acfun.cn/comment_list_json.aspx?contentId=${list[i].contentId.replace("ac", "")}&currentPage=`);

    var ws = fs.createWriteStream(`./dist/${list[i].contentId} ${list[i].title} .txt`, {
      flags: 'w',
      defaultEncoding: 'utf8',
      fd: null,
      mode: 0o666,
      autoClose: true
    });
    for (var key in ll) {
      ws.write(ll[key].content);
      ws.write("\n\n");
    }
    ws.end("");

  }

}
