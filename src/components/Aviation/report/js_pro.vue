<template>
  <div class="js_pro">
    <left>
      <div class="zhen">
        <i class="iconfont icon-zhibeizhen3"></i>
        <div id="ech" ref="ech"></div>
      </div>
    </left>
    <right>
      <!-- <table class="basetable" id="table1">
        <thead>
          <th colspan="8">江苏省机场出港旅客量分布表(单位:万人次)</th>
        </thead>
        <tbody>
          <tr>
            <td>年份</td>
            <td>中南</td>
            <td>西南</td>
            <td>东北</td>
            <td>华东</td>
            <td>华北</td>
            <td>西北</td>
            <td>新疆</td>
          </tr>
          <tr v-for="(item, id) in table" :key="id">
            <td>{{ item.year }}</td>
            <td>{{ item.centersouth }}</td>
            <td>{{ item.westsouth }}</td>
            <td>{{ item.eastnorth }}</td>
            <td>{{ item.huaeast }}</td>
            <td>{{ item.huanorth }}</td>
            <td>{{ item.westnorth }}</td>
            <td>{{ item.xinjiang }}</td>
          </tr>
        </tbody>
      </table> -->
      <js-table
        :tableData="table"
        :thead="thead"
        title="江苏省机场出港旅客量分布表(单位:万人次)"
      />
      <!-- <div
        class="basebtn"
        @click="
          base.download('table1', '江苏省机场出港旅客量分布表(单位:万人次)')
        "
      >
        下载
      </div> -->
      <div id="rightEch"></div>
    </right>
  </div>
</template>
<script>
// import Left from "@/base/Left";
// import Right from "@/base/Right";
export default {
  data() {
    return {
      perimg: require("@/assets/img/person.png"),
      jiantou: require("@/assets/img/jiantou.png"),
      table: [
        {
          year: "2018年",
          centersouth: "643.2",
          westsouth: "643.0",
          eastnorth: "262.2",
          huaeast: "260.5",
          huanorth: "216.8",
          westnorth: "155.0",
          xinjiang: "31.9",
        },
        {
          year: "2015年",
          centersouth: "441.2",
          westsouth: "270.6",
          eastnorth: "139.9",
          huaeast: "163.0",
          huanorth: "141.1",
          westnorth: "80.7",
          xinjiang: "16.3",
        },
        {
          year: "增量",
          centersouth: "202.0",
          westsouth: "192.4",
          eastnorth: "122.3",
          huaeast: "97.4",
          huanorth: "75.6",
          westnorth: "74.3",
          xinjiang: "15.6",
        },
      ],
      thead: [
        { name: "年份", value: "year" },
        { name: "中南", value: "centersouth" },
        { name: "西南", value: "westsouth" },
        { name: "东北", value: "eastnorth" },
        { name: "华东", value: "huaeast" },
        { name: "华北", value: "huanorth" },
        { name: "西北", value: "westnorth" },
        { name: "新疆", value: "xinjiang" },
      ],
    };
  },
  components: {},
  computed: {},
  watch: {},
  created() {
    setTimeout(() => {
      this.$em.$emit("changeTop", "5");
    }, 0);
    this.$store.commit("setLeftActive", "6-1");
  },
  mounted() {
    this.init_ech();
    this.rightEch();
  },
  methods: {
    init_ech() {
      const ech = this.$refs.ech;
      var myChart = this.$echarts.init(ech);
      //数据定义区
      var province = ["内蒙古", "吉林", "四川", "广东", "甘肃", "安徽", "新疆"];

      var geoCoordMap = {
        //数据的坐标
        内蒙古: [111.670801, 40.818311],
        吉林: [125.3245, 43.886841],
        四川: [103.065735, 30.659462],
        广东: [113.280637, 23.125178],
        新疆: [87.617733, 43.792818],
        安徽: [117.283042, 31.86119],
        甘肃: [103.823557, 36.058039],
      };
      var adata = [
        //['第一产业','第二产业','第三产业',‘adata’]
        [129.79, 4944.44, 20594.9, 25669.13],
        [220.22, 7571.35, 10093.82, 17885.39],
        [3492.81, 15256.93, 13320.71, 32070.45],
        [784.78, 5028.99, 7236.64, 13050.41],
        [1637.39, 8553.63, 7937.08, 18128.1],
        [2173.06, 8606.54, 11467.3, 22246.9],
        [1498.52, 7004.95, 6273.33, 14776.8],
      ];
      var typeIndex = 1;
      var option = null;
      var str = "";
      var data = [];
      // 地图特征
      var mapFeatures = this.$echarts.getMap("china").geoJson.features;

      for (var i = 0; i < province.length; i++) {
        data.push({
          name: province[i],
          value: [
            {
              name: "加权正常率",
              value: adata[i][1],
            },
          ],
        });
      }
      /*addPie*/
      function addPie(chart, data) {
        var op = chart.getOption();
        var series = option.series;
        for (var i = 0; i < province.length; i++) {
          var geoCoord = geoCoordMap[data[i].name]; //位置坐标
          if (geoCoord) {
            var vr = [];
            data[i].value.map(function (v, j) {
              vr.push({
                // 对数据进行映射
                name: v.name,
                value: v.value,
                visualMap: false, //饼图的数据不进行映射
              });
            });
            var p = chart.convertToPixel(
              {
                //圆点
                seriesIndex: 0, //指定取哪个系列的数据
              },
              geoCoord
            );
            series.push(
              {
                name: "",
                type: "pie",
                color: "pink",
                hoverAnimation: false,
                radius: [20, 24],
                tooltip: {
                  //鼠标悬浮
                  trigger: "item",
                },
                center: p,
                data: [
                  {
                    name: "加权正常率",
                    value: 754,
                  },
                  {
                    value: 1000,
                    name: "",
                    itemStyle: {
                      color: "rgba(0,0,0,0)",
                      borderWidth: 0,
                    },
                    tooltip: {
                      show: false,
                    },
                    label: {
                      show: false,
                    },
                    hoverAnimation: false,
                  },
                ],
                label: {
                  show: true,
                  formatter: "{d}%",
                  color: "#fff",
                  fontSize: 10,
                  position: "center",
                },
                labelLine: {
                  normal: {
                    show: false,
                  },
                },
                itemStyle: {
                  mormal: {
                    opacity: 1, //透明度
                  },
                },
              },
              {
                name: "",
                type: "pie",
                color: "#60AEF9",
                hoverAnimation: false,
                radius: [28, 32],
                tooltip: {
                  formatter: function (params) {
                    return (
                      params.seriesName +
                      "<br/>" +
                      params.name +
                      " : " +
                      params.value +
                      " 亿元"
                    );
                  },
                },
                center: p,
                data: vr,
                label: {
                  normal: {
                    show: false,
                  },
                },
                labelLine: {
                  normal: {
                    show: false,
                  },
                },
                itemStyle: {
                  mormal: {
                    opacity: 1, //透明度
                  },
                },
              },
              {
                name: "",
                type: "pie",
                color: "#556DFF",
                hoverAnimation: false,
                radius: [40, 36],
                tooltip: {
                  formatter: function (params) {
                    return (
                      params.seriesName +
                      "<br/>" +
                      params.name +
                      " : " +
                      params.value +
                      " 亿元"
                    );
                  },
                },
                center: p,
                data: [
                  {
                    name: "放行正常率",
                    value: 400,
                  },
                  {
                    value: 1000 - data[0].value,
                    name: "",
                    itemStyle: {
                      color: "rgba(0,0,0,0)",
                      borderWidth: 0,
                    },
                    tooltip: {
                      show: false,
                    },
                    label: {
                      show: false,
                    },
                    hoverAnimation: false,
                  },
                ],
                label: {
                  normal: {
                    show: false,
                  },
                },
                labelLine: {
                  normal: {
                    show: false,
                  },
                },
                itemStyle: {
                  mormal: {
                    opacity: 1, //透明度
                  },
                },
              }
            );
          }
        }
        return series;
      }
      const showArea = ["新疆", "青海", "云南", "河北", "吉林", "湖南", "浙江"];
      let list = [
        {
          province: "新疆",
          area: "新疆",
          value: 31.9,
          percentage: "17.6",
          person_num: 1,
        },
        {
          province: "青海",
          area: "西北",
          value: 155,
          percentage: "23.5",
          person_num: 2,
        },
        {
          province: "云南",
          area: "西南",
          value: 463,
          percentage: "14.8",
          person_num: 4,
        },
        {
          province: "河北",
          area: "华北",
          value: 216.8,
          percentage: "14.3",
          person_num: 3,
        },
        {
          province: "吉林",
          area: "东北",
          value: 10.1,
          person_num: 3,
          percentage: 10.1,
        },
        {
          province: "湖南",
          area: "中南",
          value: 643.2,
          percentage: "6.7",
          person_num: 5,
        },
        {
          province: "浙江",
          area: "华东",
          value: 260.5,
          percentage: "23.3",
          person_num: 3,
        },
      ];
      /* 指定图表的配置项和数据:pie*/
      var option = {
        backgroundColor: "#ffffff",
        title: [
          {
            show: true,
            text: "江苏省机场出港旅客量分布（国内）",
            // subtext: "单位：万辆",
            // subtextStyle: {
            //   color: "#000000",
            //   lineHeight: 20,
            // },
            textStyle: {
              color: "#000000",
              fontSize: 18,
            },
            right: "center",
            top: 20,
          },
        ],
        toolbox: {
          show: true,
          feature: {
            restore: {},
            saveAsImage: {},
          },
        },
        tooltip: {
          trigger: "item",
          //triggerOn: 'mousemove',
          backgroundColor: "rgba(0,0,0,.8)",
          borderColor: "#3574c8",
          borderWidth: "2",
          extraCssText: "padding:10px;box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);",
          show: false,
          formatter: function (params) {
            var res;
            if (params.value > 0) {
              res = params.data.value2 + "<br/>";
              res += params.data.value3;
            } else {
              res = "";
            }
            return res;
          },
        },
        visualMap: {
          //通过数值控制区域颜色
          min: 0,
          max: 7,
          show: false,
          inRange: {
            color: [
              "white",
              "#AEC1B6",
              "#BEBEDA",
              "#D9D4C0",
              "#A1D09D",
              "#A0BED8",
              "#D8D9A0",
              "#D89EA0",
            ],
          },
        },
        // geo: {
        //   //引入四川省的地图
        //   map: "china",
        //   label: {
        //     emphasis: {
        //       show: true,
        //     },
        //   },
        //   // roam: true,
        //   zoom: 1,
        //   itemStyle: {
        //     normal: {
        //       borderColor: "#387ba7",
        //       shadowColor: "rgba(0, 0, 0,0)",
        //       shadowBlur: 10,
        //       shadowOffsetX: 10,
        //     },
        //     emphasis: {
        //       areaColor: "#b3f3f3",
        //     },
        //   },
        //   regions: [
        //     //对不同的区块进行着色
        //     {
        //       name: "河南",
        //       itemStyle: {
        //         normal: {
        //           areaColor: "#2b97df",
        //         },
        //       },
        //     },
        //     {
        //       name: "河北",
        //       itemStyle: {
        //         normal: {
        //           areaColor: "#2b97df",
        //         },
        //       },
        //     },
        //   ],
        // },
        series: [
          {
            // name: "chinaMap",
            type: "map",
            mapType: "china",
            // type: "scatter",
            // coordinateSystem: "geo",
            roam: true,
            label: {
              normal: {
                show: true,
                formatter(params) {
                  const province = params.name;
                  if (showArea.includes(province)) {
                    //对应的地区名
                    let obj = list.find((v) => v.province == province);
                    const { area, percentage, value, person_num } = obj;
                    let pics = "";
                    for (let i = 0; i < person_num; i++) {
                      pics += "{pic|}";
                    }
                    return `${pics}\n{area|${area}}\n{percentage|${value}万人次}\n{img|}${percentage}%`;
                  } else {
                    return "";
                  }
                },
                position: "top",
                // backgroundColor: "rgba(233,63,66,.9)",
                padding: [0, 0],
                borderRadius: 3,
                // lineHeight: 20,
                color: "red",
                fontWeight: 600,
                rich: {
                  pic: {
                    backgroundColor: {
                      image: this.perimg,
                    },
                    width: 15,
                    height: 24,
                    align: "center",
                  },
                  area: {
                    width: 20,
                    height: 20,
                    fontSize: 16,
                    fontWeight: 600,
                  },
                  percentage: {
                    fontSize: 10,
                    height: 20,
                    fontWeight: 600,
                  },
                  img: {
                    backgroundColor: {
                      image: this.jiantou,
                    },
                    width: 8,
                    height: 10,
                    align: "center",
                  },
                },
              },
              emphasis: {
                show: false, // 各省份名称不显示
              },
            },
            itemStyle: {
              normal: {
                //areaColor: "#eee" // 鼠标放上显示的颜色
                borderColor: "#fff",
              },
            },
            data: [
              {
                //第一个区域
                name: "新疆",
                value: 1,
                value2: "新疆地区",
                value3: "哈密瓜葡萄干",
              },
              {
                //西北
                name: "青海",
                value: 2,
                value2: "西四云贵重地区",
                value3: "西四云贵重地区",
              },
              {
                name: "甘肃",
                value: 2,
                value2: "西四云贵重地区",
                value3: "西四云贵重地区",
              },
              {
                name: "宁夏",
                value: 2,
                value2: "西四云贵重地区",
                value3: "西四云贵重地区",
              },
              {
                name: "陕西",
                value: 2,
                value2: "西四云贵重地区",
                value3: "",
              },
              //   西南
              {
                name: "西藏",
                value: 3,
                value2: "西四云贵重地区",
                value3: "西四云贵重地区",
              },
              {
                name: "云南",
                value: 3,
                value2: "西四云贵重地区",
                value3: "西四云贵重地区",
              },
              {
                name: "四川",
                value: 3,
                value2: "西四云贵重地区",
                value3: "西四云贵重地区",
              },

              {
                name: "贵州",
                value: 3,
                value2: "西四云贵重地区",
                value3: "",
              },
              {
                name: "重庆",
                value: 3,
                value2: "西四云贵重地区",
                value3: "西四云贵重地区",
              },
              //   华北
              {
                name: "内蒙古",
                value: 4,
                value2: "内山河北京天地区",
                value3: "内山河北京天地区",
              },
              {
                name: "山西",
                value: 4,
                value2: "内山河北京天地区",
                value3: "内山河北京天地区",
              },
              {
                name: "河北",
                value: 4,
                value2: "内山河北京天地区",
                value3: "内山河北京天地区",
              },
              {
                name: "北京",
                value: 4,
                value2: "内山河北京天地区",
                value3: "内山河北京天地区",
              },
              {
                //东北
                name: "天津",
                value: 5,
                value2: "内山河北京天地区",
                value3: "内山河北京天地区",
              },
              {
                name: "黑龙江",
                value: 5,
                value2: "东北地区",
                value3: "东北地区",
              },
              {
                name: "吉林",
                value: 5,
                value2: "东北地区",
                value3: "东北地区",
              },
              {
                name: "辽宁",
                value: 5,
                value2: "东北地区",
                value3: "东北地区",
              },
              //华东
              {
                name: "山东",
                value: 6,
                value2: "华北地区管理局",
                value3: "华北地区管理局",
              },
              {
                name: "安徽",
                value: 6,
                value2: "华北地区管理局",
                value3: "华北地区管理局",
              },
              {
                name: "江苏",
                value: 6,
                value2: "华北地区管理局",
                value3: "华北地区管理局",
              },
              {
                name: "上海",
                value: 6,
                value2: "华北地区管理局",
                value3: "华北地区管理局",
              },
              {
                name: "浙江",
                value: 6,
                value2: "华北地区管理局",
                value3: "华北地区管理局",
              },
              {
                name: "福建",
                value: 6,
                value2: "华北地区管理局",
                value3: "华北地区管理局",
              },

              {
                name: "江西",
                value: 6,
                value2: "河湖江广海地区",
                value3: "河湖江广海地区",
              },
              //中南
              {
                name: "河南",
                value: 7,
                value2: "华北地区管理局",
                value3: "华北地区管理局",
              },
              {
                name: "湖北",
                value: 7,
                value2: "河湖江广海地区",
                value3: "河湖江广海地区",
              },
              {
                name: "湖南",
                value: 7,
                value2: "河湖江广海地区",
                value3: "河湖江广海地区",
              },
              {
                name: "广西",
                value: 7,
                value2: "河湖江广海地区",
                value3: "河湖江广海地区",
              },
              {
                name: "广东",
                value: 7,
                value2: "河湖江广海地区",
                value3: "河湖江广海地区",
              },
              {
                name: "海南",
                value: 7,
                value2: "河湖江广海地区",
                value3: "河湖江广海地区",
              },
              {
                name: "台湾",
                value: 8,
              },
              {
                name: "香港",
                value: 0,
              },
              {
                name: "澳门",
                value: 0,
              },
              {
                name: "南海诸岛",
                value: 0,
              },
            ],
          },
        ],
      };
      //自定义
      const seriesdata = [
        {
          name: "新疆",
          value: "31.9",
          img1: "",
          img2: "",
          data: [
            {
              name: "xinjiang",
              value: [118, 32],
            },
          ],
        },
        {
          name: "西北",
          value: "31.9",
          img1: "",
          img2: "",
          data: [
            {
              name: "xibei",
              value: [120, 28],
            },
          ],
        },
      ];
      const series = seriesdata.map((v) => {
        return {
          name: v.name,
          type: "effectScatter",
          coordinateSystem: "geo",
          label: {
            normal: {
              show: true,
            },
            formatter(params) {
              console.log(params);
              return `{pic|}\n{tline|${params.data.name}}`;
            },
            position: "top",
            backgroundColor: "rgba(17,25,38,.2)",
            padding: [10, 10],
            borderRadius: 3,
            lineHeight: 25,
            color: "#FFDC6C",
            rich: {
              pic: {
                backgroundColor: {
                  image: this.perimg,
                },
                width: 3000000,
                height: 3000000,
                align: "center",
              },
              fline: {
                color: "#FFDC6C",
                align: "center",
              },
              tline: {
                color: "#FFDC6C",
                align: "center",
              },
            },
          },
          data: v.data,
        };
      });
      //   option.series = [...option.series, ...series];
      if (option && typeof option === "object") {
        myChart.setOption(option, true);
      }
      /*移入鼠标事件*/
      myChart.on("mouseover", function (params) {
        var city = params.name;
        if (city == "新疆") {
          myChart.dispatchAction({
            type: "highlight",
            name: "新疆",
          });
        }
        if (
          city == "青海" ||
          city == "甘肃" ||
          city == "宁夏" ||
          city == "陕西"
        ) {
          myChart.dispatchAction({
            type: "highlight",
            name: "青海",
          });
          myChart.dispatchAction({
            type: "highlight",
            name: "甘肃",
          });
          myChart.dispatchAction({
            type: "highlight",
            name: "宁夏",
          });
          myChart.dispatchAction({
            type: "highlight",
            name: "陕西",
          });
        }
        if (
          city == "重庆" ||
          city == "贵州" ||
          city == "云南" ||
          city == "西藏" ||
          city == "四川"
        ) {
          myChart.dispatchAction({
            type: "highlight",
            name: "重庆",
          });
          myChart.dispatchAction({
            type: "highlight",
            name: "贵州",
          });
          myChart.dispatchAction({
            type: "highlight",
            name: "云南",
          });
          myChart.dispatchAction({
            type: "highlight",
            name: "西藏",
          });
          myChart.dispatchAction({
            type: "highlight",
            name: "四川",
          });
        }
        if (city == "黑龙江" || city == "吉林" || city == "辽宁") {
          myChart.dispatchAction({
            type: "highlight",
            name: "黑龙江",
          });
          myChart.dispatchAction({
            type: "highlight",
            name: "吉林",
          });
          myChart.dispatchAction({
            type: "highlight",
            name: "辽宁",
          });
        }
        if (
          city == "北京" ||
          city == "天津" ||
          city == "河北" ||
          city == "内蒙古" ||
          city == "山西"
        ) {
          myChart.dispatchAction({
            type: "highlight",
            name: "北京",
          });
          myChart.dispatchAction({
            type: "highlight",
            name: "天津",
          });
          myChart.dispatchAction({
            type: "highlight",
            name: "河北",
          });
          myChart.dispatchAction({
            type: "highlight",
            name: "内蒙古",
          });
          myChart.dispatchAction({
            type: "highlight",
            name: "山西",
          });
        }
        if (
          city == "山东" ||
          city == "江苏" ||
          city == "浙江" ||
          city == "安徽" ||
          city == "江西" ||
          city == "上海" ||
          city == "福建"
        ) {
          myChart.dispatchAction({
            type: "highlight",
            name: "山东",
          });
          myChart.dispatchAction({
            type: "highlight",
            name: "江苏",
          });
          myChart.dispatchAction({
            type: "highlight",
            name: "浙江",
          });
          myChart.dispatchAction({
            type: "highlight",
            name: "安徽",
          });
          myChart.dispatchAction({
            type: "highlight",
            name: "江西",
          });
          myChart.dispatchAction({
            type: "highlight",
            name: "上海",
          });
          myChart.dispatchAction({
            type: "highlight",
            name: "福建",
          });

          myChart.dispatchAction({
            type: "highlight",
            name: "江西",
          });
        }
        if (
          city == "湖北" ||
          city == "湖南" ||
          city == "广西" ||
          city == "广东" ||
          city == "海南" ||
          city == "河南"
        ) {
          myChart.dispatchAction({
            type: "highlight",
            name: "湖北",
          });
          myChart.dispatchAction({
            type: "highlight",
            name: "广西",
          });
          myChart.dispatchAction({
            type: "highlight",
            name: "广东",
          });
          myChart.dispatchAction({
            type: "highlight",
            name: "湖南",
          });
          myChart.dispatchAction({
            type: "highlight",
            name: "海南",
          });
          myChart.dispatchAction({
            type: "highlight",
            name: "河南",
          });
        }
        if (
          city == "台湾" ||
          city == "香港" ||
          city == "澳门" ||
          city == "南海诸岛"
        ) {
          myChart.dispatchAction({
            type: "highlight",
            name: "台湾",
          });
          myChart.dispatchAction({
            type: "highlight",
            name: "香港",
          });
          myChart.dispatchAction({
            type: "highlight",
            name: "澳门",
          });
          myChart.dispatchAction({
            type: "highlight",
            name: "南海诸岛",
          });
        }
      });
      /*移除鼠标事件*/
      myChart.on("mouseout", function (params) {
        var city = params.name;

        if (city == "新疆") {
          myChart.dispatchAction({
            type: "downplay",
            name: "新疆",
          });
        }
        if (
          city == "青海" ||
          city == "甘肃" ||
          city == "宁夏" ||
          city == "陕西"
        ) {
          myChart.dispatchAction({
            type: "downplay",
            name: "青海",
          });
          myChart.dispatchAction({
            type: "downplay",
            name: "甘肃",
          });
          myChart.dispatchAction({
            type: "downplay",
            name: "宁夏",
          });
          myChart.dispatchAction({
            type: "downplay",
            name: "陕西",
          });
        }
        if (
          city == "重庆" ||
          city == "四川" ||
          city == "贵州" ||
          city == "云南" ||
          city == "西藏"
        ) {
          myChart.dispatchAction({
            type: "downplay",
            name: "重庆",
          });
          myChart.dispatchAction({
            type: "downplay",
            name: "四川",
          });
          myChart.dispatchAction({
            type: "downplay",
            name: "贵州",
          });
          myChart.dispatchAction({
            type: "downplay",
            name: "云南",
          });
          myChart.dispatchAction({
            type: "downplay",
            name: "西藏",
          });
        }
        if (city == "黑龙江" || city == "吉林" || city == "辽宁") {
          myChart.dispatchAction({
            type: "downplay",
            name: "黑龙江",
          });
          myChart.dispatchAction({
            type: "downplay",
            name: "吉林",
          });
          myChart.dispatchAction({
            type: "downplay",
            name: "辽宁",
          });
        }
        if (
          city == "北京" ||
          city == "天津" ||
          city == "河北" ||
          city == "内蒙古" ||
          city == "山西"
        ) {
          myChart.dispatchAction({
            type: "downplay",
            name: "北京",
          });
          myChart.dispatchAction({
            type: "downplay",
            name: "天津",
          });
          myChart.dispatchAction({
            type: "downplay",
            name: "河北",
          });
          myChart.dispatchAction({
            type: "downplay",
            name: "内蒙古",
          });
          myChart.dispatchAction({
            type: "downplay",
            name: "山西",
          });
        }
        if (
          city == "山东" ||
          city == "江苏" ||
          city == "浙江" ||
          city == "安徽" ||
          city == "上海" ||
          city == "福建" ||
          city == "江西"
        ) {
          myChart.dispatchAction({
            type: "downplay",
            name: "山东",
          });
          myChart.dispatchAction({
            type: "downplay",
            name: "江苏",
          });
          myChart.dispatchAction({
            type: "downplay",
            name: "浙江",
          });
          myChart.dispatchAction({
            type: "downplay",
            name: "安徽",
          });
          myChart.dispatchAction({
            type: "downplay",
            name: "上海",
          });
          myChart.dispatchAction({
            type: "downplay",
            name: "福建",
          });
          myChart.dispatchAction({
            type: "downplay",
            name: "江西",
          });
        }

        if (
          city == "湖北" ||
          city == "湖南" ||
          city == "广西" ||
          city == "广东" ||
          city == "海南" ||
          city == "河南"
        ) {
          myChart.dispatchAction({
            type: "downplay",
            name: "湖北",
          });
          myChart.dispatchAction({
            type: "downplay",
            name: "广西",
          });
          myChart.dispatchAction({
            type: "downplay",
            name: "广东",
          });
          myChart.dispatchAction({
            type: "downplay",
            name: "湖南",
          });
          myChart.dispatchAction({
            type: "downplay",
            name: "海南",
          });
          myChart.dispatchAction({
            type: "downplay",
            name: "河南",
          });
        }
        if (
          city == "台湾" ||
          city == "香港" ||
          city == "澳门" ||
          city == "南海诸岛"
        ) {
          myChart.dispatchAction({
            type: "downplay",
            name: "台湾",
          });
          myChart.dispatchAction({
            type: "downplay",
            name: "香港",
          });
          myChart.dispatchAction({
            type: "downplay",
            name: "澳门",
          });
          myChart.dispatchAction({
            type: "downplay",
            name: "南海诸岛",
          });
        }
      });
      /*pie*/
      //addPie(myChart, data);
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    rightEch() {
      var myChart = this.$echarts.init(document.getElementById("rightEch"));
      const dataYear = (year) => {
        let obj = this.table.find((v) => v.year == year + "年");
        let value = [];
        for (let key in obj) {
          key != "year" ? value.push(obj[key]) : "";
        }
        return value;
      };
      const xdata = ["中南", "西南", "东北", "华东", "华北", "西北", "新疆"];
      var series = [
        {
          name: "2015",
          type: "bar",
          label: {
            show: true,
            formatter: "{c}",
            position: "inside",
            textStyle: {
              color: "white",
              fontSize: 14,
            },
          },
          data: dataYear(2015),
        },
        {
          name: "2018",
          type: "bar",
          label: {
            show: true,
            formatter: "{c}",
            position: "inside",
            textStyle: {
              color: "white",
              fontSize: 14,
            },
          },
          data: dataYear(2018),
        },
      ];

      var option = {
        title: {
          text: "江苏省机场出港旅客量分布图(单位:万人次)",
          left: "center",
          textStyle: {
            color: "white",
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: "{a}: {c}万人次<br />{a1}: {c1}万人次",
        },
        legend: {
          data: ["2015", "2018"],
          textStyle: {
            color: "#fff",
          },
          top: "10%",
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {},
            magicType: { type: ["line", "bar"] },
            dataView: {
              //数据可视化
              readOnly: false,
            },
          },
          iconStyle: {
            // color:'white'
            borderColor: "#fff",
          },
        },
        grid: {
          bottom: "10%",
        },
        xAxis: {
          data: xdata,
          name: "地区",
          axisLabel: {
            show: true,
            textStyle: {
              color: "#fff",
            },
          },
          axisLine: {
            lineStyle: {
              color: "white",
            },
          },
        },
        yAxis: {
          name: "万人次",
          axisLabel: {
            show: true,
            textStyle: {
              color: "#fff",
            },
          },
          axisLine: {
            lineStyle: {
              color: "white",
            },
          },
        },
        series,
      };
      myChart.setOption(option);
    },
  },
};
</script>
<style scoped lang='less'>
.js_pro {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: space-around;
}
#ech {
  width: 100%;
  height: 90%;
}
#rightEch {
  width: 100%;
  height: 50%;
  border: 1px solid rgb(0, 255, 255, 0.7);
  position: absolute !important;
  bottom: 10%;
}
</style>