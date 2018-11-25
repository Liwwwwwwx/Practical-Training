const drawActiveUsers = function() {
  let ActiveUsersChart = this.$echarts.init(
    document.getElementById("activeusers")
  );
  ActiveUsersChart.setOption({
    title: {
      text: "访问量"
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    },
    yAxis: {
      type: "value"
    },
    color: ["#259b24", "#57c8f2"],
    legend: {
      data: ["白天", "夜间"]
    },
    series: [
      {
        name: "白天",
        data: [200, 344, 725, 524, 421, 604, 904],
        type: "line",
        areaStyle: {}
      },
      {
        name: "夜间",
        data: [101, 757, 804, 427, 1044, 721, 504],
        type: "line",
        areaStyle: {}
      }
    ]
  });
};

const drawUserNumber = function() {
  let UserNumbershart = this.$echarts.init(
    document.getElementById("usernumbers")
  );
  UserNumbershart.setOption({
    title: {
      text: "用户量"
    },
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    },
    yAxis: {
      type: "value"
    },
    color: ["#259b24", "#57c8f2"],
    legend: {
      data: ["活跃用户", "总用户"]
    },
    series: [
      {
        name: "活跃用户",
        data: [200, 302, 350, 404, 421, 604, 704],
        type: "bar"
      },
      {
        name: "总用户",
        data: [225, 342, 425, 504, 564, 721, 872],
        type: "bar"
      }
    ]
  });
};

const drawNoteCounts = function() {
  let NoteCounts = this.$echarts.init(document.getElementById("notecounts"));
  NoteCounts.setOption({
    title: {
      text: "帖子数量"
    },
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: "line"
      }
    ]
  });
};

const drawFileCounts = function() {
  let drawFileCounts = this.$echarts.init(
    document.getElementById("filecounts")
  );
  drawFileCounts.setOption({
    title: {
      text: "帖子数量"
    },
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    },
    yAxis: {
      type: "value"
    },
    color: ["#434542"],
    series: [
      {
        name: "帖子数量",
        data: [200, 302, 350, 404, 421, 604, 704],
        type: "bar"
      }
    ]
  });
};

const drawOpinionCounts = function() {
  let drawOpinionCounts = this.$echarts.init(
    document.getElementById("opinioncounts")
  );
  drawOpinionCounts.setOption({
    title: {
      text: "反馈问题数量"
    },
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        data: [100, 134, 177, 243, 124, 101, 34],
        type: "line"
      }
    ]
  });
};

const drawSystemCounts = function() {
  let drawSystemCounts = this.$echarts.init(
    document.getElementById("systemcounts")
  );
  drawSystemCounts.setOption({
    title: {
      text: "管理人员刚问比例"
    },

    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      // orient: 'vertical',
      // top: 'middle',
      bottom: 10,
      left: "center",
      data: ["李文轩", "马硕", "冯世祺", "刘冉", "李薇","葛舒悦"]
    },
    series: [
      {
        type: "pie",
        radius: "65%",
        center: ["50%", "50%"],
        selectedMode: "single",
        data: [
          { value: 1548, name: "李文轩" },
          { value: 535, name: "马硕" },
          { value: 510, name: "冯世祺" },
          { value: 634, name: "刘冉" },
          { value: 735, name: "李薇" },
          { value: 735, name: "葛舒悦" }
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        }
      }
    ]
  });
};
export {
  drawActiveUsers,
  drawUserNumber,
  drawNoteCounts,
  drawFileCounts,
  drawOpinionCounts,
  drawSystemCounts
};
