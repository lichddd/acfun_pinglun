import http from 'http'
export default async function getlist(url, page) {
    var list = [];
    page = page || 1;
    return new Promise((resolve, reject) => {
        http.get(url + "&pageNo=" + page, (res) => {
            let body = "";
            res.on("data", (data) => {
                body += data;
            }).on("end", async() => {

                body = JSON.parse(body);
                if (body && body.data && body.data.page && body.data.page.list) {
                    list = list.concat(body.data.page.list);
                    if (body.data.page.list && body.data.page.list.length > 0) {
                        let ll = await getlist(url, page + 1);
                        list = list.concat(ll);
                        resolve(list);
                    } else {
                        resolve(list);
                    }
                } else {
                    resolve(list);
                }

            });
        });
    })
}
