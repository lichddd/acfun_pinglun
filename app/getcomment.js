import http from 'http'

export default async function getcomment(url, page) {
    var list = [];
    page = page || 1;
    return new Promise((resolve, reject) => {
        http.get(url + page, (res) => {
            let body = "";
            res.on("data", (data) => {
                body += data;
            }).on("end", async() => {

                try {
                    body = JSON.parse(body);
                    if (body && body.data && body.data.commentContentArr) {
                        let arr = [];
                        for (var key in body.data.commentContentArr) {
                            arr.push(body.data.commentContentArr[key]);
                        }
                        list = list.concat(arr);
                        if (arr && arr.length > 0) {

                            let ll = await getcomment(url, page + 1);
                            list = list.concat(ll);
                            resolve(list);
                        } else {
                            resolve(list);
                        }
                    } else {
                        resolve(list);
                    }
                } catch (e) {
                    let ll = await getcomment(url, page + 1);
                    list = list.concat(ll);

                } finally {}

            });
        });
    })

}
