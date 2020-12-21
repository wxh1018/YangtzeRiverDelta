let base = {
    warn(a, b) {
        a.$message({
            type: "error",
            message: b
        });
    },
    suc(a, b) {
        a.$message({
            type: 'success',
            message: b
        })
    },
    SetTitle(v) {
        var title = document.querySelector('title')
        title.text = v
    },
    getThead(data) {
        let thead = Object.keys(data[0]).map((v) => {
            return {
                name: v,
                value: v,
            };
        });
        return thead;
    },
    sort(key, data) {
        return data.sort((a, b) => {
            return b[key] - a[key];
        });
    },
    debounce(fn, wait) {
        var timer = null;
        return function () {
            clearTimeout(timer);
            timer = setTimeout(fn, wait);
        };
    },
    AddStyle(obj) {
        obj = obj.replace(/;/g, '!important;')
        let style = document.querySelector('style')
        let head = document.querySelector('head')
        if (style) {
            style.append(obj)
        } else {
            let style = '<style></style>'
            head.append(style)
            style.innerHtml = obj
        }
    },
    // 按某个属性值 去重数组对象
    replace(arr1, name) {
        let arr = arr1
        for (let i = 0; i < arr.length; i++) {
            for (let j = i + 1; j < arr.length; j++) {
                if (arr[i][name] == arr[j][name]) {
                    arr.splice(j, 1)
                    j--
                }
            }
        }
        return arr
    },
    download(id, name) {
        var dom1 = document.querySelector(`#${id}`);
        tableToExcel(dom1, name);
        //替换table数据和worksheet名字
        function format(s, c) {
            return s.replace(/{(\w+)}/g, function (m, p) {
                return c[p];
            });
        }
        function base64(s) {
            return window.btoa(unescape(encodeURIComponent(s)));
        }

        function tableToExcel(tableid, sheetName) {
            var uri = "data:application/vnd.ms-excel;base64,";
            var template =
                '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"' +
                'xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>' +
                "<x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets>" +
                "</x:ExcelWorkbook></xml><![endif]-->" +
                ' <style type="text/css">' +
                "table {" +
                "border: .5pt solid black;" +
                " }" +
                "table td {" +
                "border: .5pt solid black;" +
                "width: 100px;" +
                "height: 25px;" +
                " text-align: center;" +
                "font-size: 13px;" +
                " }" +
                "</style>" +
                '</head><body ><table class="excelTable">{table}</table></body></html>';
            var ctx = {
                worksheet: sheetName || "Worksheet",
                table: tableid.innerHTML,
            };
            let a = document.createElement("a");
            //表格名字
            a.download = sheetName || "表格.xls";
            a.href = uri + base64(format(template, ctx));
            a.click();
        }
    },
}
export default base