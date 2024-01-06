import { Component } from "react";
import { Redirect } from "react-router";
import { Button, message } from "antd";
import ReactECharts from "echarts-for-react";
import request from "../../request";
import moment from "moment";
import "./style.css";
import { EChartsOption } from "echarts";

interface State {
  loaded: boolean;
  isLogin: boolean;
  data: dataStructure;
}

class Home extends Component {
  state: State = {
    loaded: false,
    isLogin: true,
    data: {},
  };
  // 生命週期函數
  componentDidMount() {
    request.get("/api/isLogin").then((res: any) => {
      const data: responseResult.isLogin = res.data;
      if (!data) {
        this.setState({ isLogin: false });
      }
      this.setState({ loaded: true });
    });
    // 獲取數據
    request.get("/api/showData").then((res: any) => {
      const data: dataStructure = res.data;
      if (data) {
        this.setState({ data: data });
      }
    });
  }
  // 爬蟲
  handleCrawlerClick = () => {
    request.get("/api/getData").then((res: any) => {
      const data: responseResult.getData = res.data;
      if (data) {
        message.success("爬取成功");
      } else {
        message.error("爬取失敗");
      }
    });
  };
  getOption: () => EChartsOption = () => {
    const { data } = this.state;
    const waterName: string[] = [];
    const times: string[] = [];
    const tempData: { [key: string]: number[] } = {};
    for (let i in data) {
      const item = data[i];
      times.push(moment(Number(i)).format("MM-DD HH:mm"));
      item.forEach((innerItem) => {
        const { name, volumeNumber } = innerItem;
        if (waterName.indexOf(name) === -1) {
          waterName.push(name);
        }
        tempData[name]
          ? tempData[name].push(volumeNumber)
          : (tempData[name] = [volumeNumber]);
      });
    }
    const result: echarts.SeriesOption[] = [];
    for (let i in tempData) {
      result.push({
        name: i,
        type: "line",
        data: tempData[i],
      });
    }

    return {
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: waterName,
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: times,
      },
      yAxis: {
        type: "value",
      },
      series: result,
    };
  };

  // 退出
  handleLogoutClick = () => {
    request.get("/api/logout").then((res: any) => {
      const data: responseResult.logout = res.data;
      if (data) {
        this.setState({ isLogin: false });
        message.info("已退出");
      } else {
        message.error("退出失敗");
      }
    });
  };

  render() {
    const { isLogin, loaded } = this.state;
    if (!isLogin) {
      return <Redirect to="/login" />;
    }
    if (!loaded) {
      return null;
    }
    return (
      <div className="home-page">
        <div className="buttons">
          <Button
            type="primary"
            style={{ marginRight: "25px" }}
            onClick={this.handleCrawlerClick}
          >
            爬取
          </Button>
          <Button type="primary" onClick={this.handleLogoutClick}>
            退出
          </Button>
        </div>
        <h1>台灣水庫即時水情</h1>
        <ReactECharts option={this.getOption()} />
      </div>
    );
  }
}

export default Home;
